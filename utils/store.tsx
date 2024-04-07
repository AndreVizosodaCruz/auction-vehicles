import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import Vehicles from '../api/data.json';

export interface VehicleInterface {
  id: number;
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
  details: {
    specification: {
      vehicleType: string;
      colour: string;
      fuel: string;
      transmission: string;
      numberOfDoors: number;
      co2Emissions: string;
      noxEmissions: number;
      numberOfKeys: number;
    };
    ownership: {
      logBook: string;
      numberOfOwners: number;
      dateOfRegistration: string;
    };
    equipment: string[];
  };
}

export interface FiltersInterface {
  maker: string,
  model: string,
  startingBidMin: number,
  startingBidMax: number,
  favorites: boolean
}

interface StoreContext {
  vehicles: VehicleInterface[];
  setVehicles: Dispatch<SetStateAction<VehicleInterface[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  filters: FiltersInterface;
  setFilters: Dispatch<SetStateAction<FiltersInterface>>;
  sortBy: 'make' | 'startingBid' | 'mileage' | 'auctionDate' | '',
  setSortBy: Dispatch<SetStateAction<'make' | 'startingBid' | 'mileage' | 'auctionDate' | ''>>
}

export const StoreContext = createContext<StoreContext>({
  vehicles: [],
  setVehicles: () => { },
  page: 1,
  setPage: () => { },
  itemsPerPage: 12,
  setItemsPerPage: () => { },
  filters: {
    maker: '',
    model: '',
    startingBidMin: 0,
    startingBidMax: 0,
    favorites: false
  },
  setFilters: () => { },
  sortBy: '',
  setSortBy: () => { }
});

interface StateProviderProps {
  children: ReactNode;
}

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const resultObject = addUniqueId(Vehicles);
  const [vehicles, setVehicles] = useState<VehicleInterface[]>(resultObject);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [filters, setFilters] = useState<FiltersInterface>({
    maker: '',
    model: '',
    startingBidMin: 0,
    startingBidMax: 0,
    favorites: false
  });
  const [sortBy, setSortBy] = useState<'make' | 'startingBid' | 'mileage' | 'auctionDate' | ''>('')

  const contextValue: StoreContext = {
    vehicles,
    setVehicles,
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    filters,
    setFilters,
    sortBy,
    setSortBy
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export { StateProvider };

function addUniqueId(jsonData: any) {
  let index = 1;
  for (let key in jsonData) {
    jsonData[key].id = index++;
  }
  return jsonData;
}
