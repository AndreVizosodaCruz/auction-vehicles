import { FiltersInterface, StoreContext, VehicleInterface } from '@/utils/store';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import Pagination from './pagination';
import Image from 'next/image';
import Car from '@/assets/car.svg';
import Select from './select';

type SortBy = "" | "make" | "startingBid" | "mileage" | "auctionDate";

export default function CarList() {

  const { vehicles, setVehicles, page, itemsPerPage, filters, setSortBy, sortBy } = useContext(StoreContext);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filtredData = filterCars(sortCars(vehicles, sortBy), filters) ?? [];
  const slicedData = filtredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filtredData.length / itemsPerPage);

  const timeUntilAuction = (auctionDateTime: string) => {
    const currentTime = new Date().getTime();
    const auctionTime = new Date(auctionDateTime).getTime();
    const timeDifference = auctionTime - currentTime;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return (
      <p>{days > 0 ?? `${days} days`} {hours} hours</p>
    );
  }

  const sortByOptions = [
    {
      label: 'Maker',
      value: 'make'
    },
    {
      label: 'Starting Bid',
      value: 'startingBid'
    },
    {
      label: 'Mileage',
      value: 'mileage'
    },
    {
      label: 'Auction Date',
      value: 'auctionDate'
    }
  ];

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault();
    setVehicles(prevVehicles => {
      return prevVehicles.map(vehicle => {
        if (vehicle.id === id) {
          return { ...vehicle, favourite: !vehicle.favourite };
        }
        return vehicle;
      });
    });
  }

  return (
    <Wrapper>
      <Container>
        <ContainerSortItems>
          <Select
            label='Sort By:'
            id='sortBy'
            defaultValue={sortBy}
            arr={sortByOptions}
            changeEvent={(value) => setSortBy(value as SortBy)}
            dataTestId="sorting-dropdown"
          />
        </ContainerSortItems>
        <Main>
          {slicedData.length > 0 ?
            slicedData.map((vehicle) => (
              <LinkCard href={`/detail/${vehicle.id}`} key={vehicle.id} data-testid={`vehicle-${vehicle.id}`}>
                <Card>
                  <Image
                    src={Car}
                    width={160}
                    height={80}
                    alt={`${vehicle.make}-${vehicle.model}-${vehicle.year}`}
                    priority
                  />
                  <FavoriteButtonStyled onClick={(e) => toggleFavorite(e, vehicle.id)} data-testid={`favorite-button-${vehicle.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill={vehicle.favourite ? "red" : "gray"} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </FavoriteButtonStyled>
                  <p>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                  <div>
                    <p>Time until Auction:</p>
                    {timeUntilAuction(vehicle.auctionDateTime)}
                  </div>
                </Card>
              </LinkCard>
            ))
            :
            <>No results</>}
        </Main>
        <Pagination totalPages={totalPages} />
      </Container>
    </Wrapper>
  );
}

function filterCars(cars: VehicleInterface[], filters: FiltersInterface) {
  return cars.filter(car => {
    if (filters.maker && car.make.toLowerCase() !== filters.maker.toLowerCase()) {
      return false;
    }
    if (filters.model && car.model.toLowerCase() !== filters.model.toLowerCase()) {
      return false;
    }
    if (filters.startingBidMin && filters.startingBidMin > car.startingBid) {
      return false;
    }
    if (filters.startingBidMax && filters.startingBidMax < car.startingBid) {
      return false;
    }
    if (filters.favorites !== false && filters.favorites !== car.favourite) {
      return false;
    }
    return true;
  });
};

function sortCars(cars: VehicleInterface[], sortBy: 'make' | 'startingBid' | 'mileage' | 'auctionDate' | '') {
  return cars.sort((a, b) => {
    if (sortBy === 'make') {
      return a.make.localeCompare(b.make);
    } else if (sortBy === 'startingBid') {
      return a.startingBid - b.startingBid;
    } else if (sortBy === 'mileage') {
      return a.mileage - b.mileage;
    } else if (sortBy === 'auctionDate') {
      return new Date(a.auctionDateTime).getTime() - new Date(b.auctionDateTime).getTime();
    } else {
      return 0;
    }
  });
};

const Wrapper = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

const ContainerSortItems = styled.div`
  display: inline-flex;
  justify-content: flex-end;
`;

const Main = styled.div`
  flex: 1;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  max-height: 100%;
  overflow-y: scroll;
`;

const LinkCard = styled(Link)`
  flex: 0 0 calc(25% - 12px); 
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  max-width: 400px;
  padding: 24px;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  transition: all 0.4s ease-in-out;

  &:hover,
  :focus,
  :active {
    cursor: pointer;
    color: #0070f3;
    border-color: #0070f3;
  }
`;

const FavoriteButtonStyled = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  z-index: 1;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    cursor: pointer;
  }
`;