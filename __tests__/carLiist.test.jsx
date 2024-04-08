import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CarList from '@/components/CarList';
import { StoreContext } from '@/utils/store';

const mockVehicles = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2020, auctionDateTime: '2024-04-10T10:00:00.000Z', favourite: false },
  { id: 2, make: 'Honda', model: 'Accord', year: 2021, auctionDateTime: '2024-04-11T10:00:00.000Z', favourite: false },
];

const mockContextValues = {
  vehicles: mockVehicles,
  setVehicles: jest.fn(),
  page: 1,
  setPage: jest.fn(),
  itemsPerPage: 10,
  setItemsPerPage: jest.fn(),
  filters: {
    maker: '',
    model: '',
    startingBidMin: 0,
    startingBidMax: 0,
    favorites: false
  },
  setFilters: jest.fn(),
  sortBy: 'make',
  setSortBy: jest.fn()
};

describe('CarList component', () => {
  test('should render with correct vehicles and handle sorting', () => {
    const { getByTestId } = render(
      <StoreContext.Provider value={mockContextValues}>
        <CarList />
      </StoreContext.Provider>
    );

    setTimeout(() => {
      expect(getByTestId('vehicle-card-1')).toBeInTheDocument();
    }, 100);

    fireEvent.change(getByTestId('sorting-dropdown'), { target: { value: 'auctionDate' } });

    expect(mockContextValues.setSortBy).toHaveBeenCalledWith('auctionDate');
  });

  test('should toggle favorite when favorite button is clicked', () => {
    const { getByTestId } = render(
      <StoreContext.Provider value={mockContextValues}>
        <CarList />
      </StoreContext.Provider>
    );

    fireEvent.click(getByTestId('favorite-button-1'));

    setTimeout(() => {
      expect(mockContextValues.setVehicles).toHaveBeenCalledWith([
        { id: 1, make: 'Toyota', model: 'Camry', year: 2020, auctionDateTime: '2024-04-10T10:00:00.000Z', favourite: true },
        { id: 2, make: 'Honda', model: 'Accord', year: 2021, auctionDateTime: '2024-04-11T10:00:00.000Z', favourite: false }
      ]);
    }, 100);

    fireEvent.click(getByTestId('favorite-button-1'));
    
    setTimeout(() => {
      expect(mockContextValues.setVehicles).toHaveBeenCalledWith([
        { id: 1, make: 'Toyota', model: 'Camry', year: 2020, auctionDateTime: '2024-04-10T10:00:00.000Z', favourite: false },
        { id: 2, make: 'Honda', model: 'Accord', year: 2021, auctionDateTime: '2024-04-11T10:00:00.000Z', favourite: false }
      ]);
    }, 100);
  });
});
