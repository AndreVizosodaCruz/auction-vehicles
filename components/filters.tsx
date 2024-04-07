import { StoreContext, VehicleInterface } from '@/utils/store';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import Select from './select';

export default function Filters() {

  const { vehicles, filters, setFilters, setPage } = useContext(StoreContext);
  const [filtersComponent, setFiltersComponent] = useState({
    maker: '',
    model: '',
    minBid: 0,
    maxBid: 0
  });;
  const [filtersComponentKey, setFiltersComponentKey] = useState(0);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    name === 'minBid' ?
      setFiltersComponent({ ...filtersComponent, minBid: parseInt(value) })
      :
      setFiltersComponent({ ...filtersComponent, maxBid: parseInt(value) })
  };

  const makerList = useMemo(() => {
    return getPropertyFromArrayUnique(vehicles, 'make');
  }, [vehicles]);

  const modelList = useMemo(() => {
    if (filtersComponent.maker !== '') {
      return getPropertyFromArrayUnique(vehicles.filter((vehicle) => vehicle.make === filtersComponent.maker), 'model')
    } else {
      return []
    };
  }, [vehicles, filtersComponent.maker]);

  const handleFilters = () => {
    setPage(1);
    setFilters({
      ...filters,
      maker: filtersComponent.maker,
      model: filtersComponent.maker === '' || modelList.length === 0 ? '' : filtersComponent.model,
      startingBidMin: filtersComponent.minBid,
      startingBidMax: filtersComponent.maxBid
    })
  }

  const resetFilters = () => {
    setPage(1);
    setFiltersComponent({
      maker: '',
      model: '',
      minBid: 0,
      maxBid: 0
    })
    setFilters({
      ...filters,
      maker: '',
      model: '',
      startingBidMin: 0,
      startingBidMax: 0
    })
    setFiltersComponentKey(prevKey => prevKey + 1);
  }
  console.log({ filtersComponent, modelList })

  return (
    <Container>
      <Title>Filters</Title>
      <Select
        key={`${filtersComponentKey}-maker`}
        label='Select Maker:'
        id='maker'
        defaultValue={filtersComponent.maker}
        arr={makerList}
        changeEvent={(value) => setFiltersComponent({ ...filtersComponent, maker: value, model: '' })}
      />
      <Select
        key={`${filtersComponentKey}-model`}
        label='Select Model:'
        id='model'
        defaultValue={filtersComponent.model}
        arr={modelList}
        changeEvent={(value) => setFiltersComponent({ ...filtersComponent, model: value })}
      />
      <DivRange>
        <label htmlFor="minBid">Min Bid:</label>
        <input
          type="range"
          id="minBid"
          name="minBid"
          min={0}
          max={Math.max(...vehicles.map(vehicle => vehicle.startingBid))}
          value={filtersComponent.minBid}
          onChange={handleRangeChange}
        />
        <span>{filtersComponent.minBid}</span>

        <label htmlFor="maxBid">Max Bid:</label>
        <input
          type="range"
          id="maxBid"
          name="maxBid"
          min={0}
          max={Math.max(...vehicles.map(vehicle => vehicle.startingBid))}
          value={filtersComponent.maxBid}
          onChange={handleRangeChange}
        />
        <span>{filtersComponent.maxBid}</span>
      </DivRange>
      <DivFavorites>
        <label htmlFor="favorites">Show only Favorites</label>
        <input id='favorites' type='checkbox' checked={filters.favorites} onChange={() => setFilters({ ...filters, favorites: !filters.favorites })} />
      </DivFavorites>

      <button onClick={() => handleFilters()}>
        Apply Filter
      </button>
      <button onClick={() => resetFilters()}>
        Reset Filters
      </button>
    </Container>
  )
}

const getPropertyFromArrayUnique = (arr: VehicleInterface[], propName: 'model' | 'make') => {
  const uniqueValues = new Set();
  return arr.filter(obj => {
    if (!uniqueValues.has(obj[propName])) {
      uniqueValues.add(obj[propName]);
      return true;
    }
    return false;
  }).map(obj => ({
    label: obj[propName],
    value: obj[propName]
  }));
}

const Container = styled.div`
  padding: 24px;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

const DivRange = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivFavorites = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  input{
    margin: 0;
    margin-top: 2px;
  }
`;
