import { StoreContext, VehicleInterface } from '@/utils/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import styled from 'styled-components';

export default function DetailPage() {

  const { vehicles } = useContext(StoreContext)!;

  const router = useRouter();
  const { id } = router.query;

  const vehicle = vehicles.filter((item: VehicleInterface) => item.id === Number(id))[0];

  if (!vehicle) {
    return null;
  }

  return (
    <Container>
      <Link href='/'>Go back</Link>
      <div className="vehicle">
        <h2>Vehicle Information</h2>
        <p>Make: <span className="make">{vehicle.make}</span></p>
        <p>Model: <span className="model">{vehicle.model}</span></p>
        <p>Engine Size: <span className="engine-size">{vehicle.engineSize}</span></p>
        <p>Fuel: <span className="fuel">{vehicle.fuel}</span></p>
        <p>Year: <span className="year">{vehicle.year}</span></p>
        <p>Mileage: <span className="mileage">{vehicle.mileage} miles</span></p>
        <p>Auction Date & Time: <span className="auction-date-time">{vehicle.auctionDateTime}</span></p>
        <p>Starting Bid: <span className="starting-bid">${vehicle.startingBid}</span></p>
        <p>Is Favorite: <span className="is-favorite">{vehicle.favourite ? 'Yes' : 'No'}</span></p>

        <h3>Details</h3>
        <p>Vehicle Type: <span className="vehicle-type">{vehicle.details.specification.vehicleType}</span></p>
        <p>Colour: <span className="colour">{vehicle.details.specification.colour}</span></p>
        <p>Transmission: <span className="transmission">{vehicle.details.specification.transmission}</span></p>
        <p>Number of Doors: <span className="number-of-doors">{vehicle.details.specification.numberOfDoors}</span></p>
        <p>CO2 Emissions: <span className="co2-emissions">{vehicle.details.specification.co2Emissions}</span></p>
        <p>NOx Emissions: <span className="nox-emissions">{vehicle.details.specification.noxEmissions} g/km</span></p>
        <p>Number of Keys: <span className="number-of-keys">{vehicle.details.specification.numberOfKeys}</span></p>

        <h3>Ownership</h3>
        <p>Log Book: <span className="log-book">{vehicle.details.ownership.logBook}</span></p>
        <p>Number of Owners: <span className="number-of-owners">{vehicle.details.ownership.numberOfOwners}</span></p>
        <p>Date of Registration: <span className="date-of-registration">{vehicle.details.ownership.dateOfRegistration}</span></p>

        <h3>Equipment</h3>
        <ul className="equipment">
          {vehicle.details.equipment.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  max-height: 100vh;
  height: 100vh;
  max-width: 100vw;
  gap: 12px;
  padding: 8px;
`;