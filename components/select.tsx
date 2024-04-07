import React from 'react'
import styled from 'styled-components';

interface SelectProps {
  arr: {
    value: string,
    label: string
  }[],
  id: string,
  defaultValue: string,
  changeEvent: (e: string) => void,
  label: string
}

export default function Select({arr, id, defaultValue, changeEvent, label}: SelectProps) {
  return (
    <DivSelect>
      <label htmlFor={id}>{label}</label>
      <select id={id} defaultValue={defaultValue ?? ''} onChange={(e) => changeEvent(e.target.value)}>
        <option value={''}></option>
        {arr.map((item, index) =>
          <option key={index} value={item.value}>{item.label}</option>
        )}
      </select>
    </DivSelect>
  )
}

const DivSelect = styled.div`
  display: inline-flex;
  gap: 8px;
`;