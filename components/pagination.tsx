import { StoreContext } from '@/utils/store';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const { page, setPage, itemsPerPage, setItemsPerPage } = useContext(StoreContext);

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  const handleItemsPerPage = (itemsNum: number) => {
    page > 1 && setPage(1);
    setItemsPerPage(itemsNum)
  }

  return (
    <PaginationMain>
      <PaginationWrapper>
        {page !== 1 && (
          <ArrowButton
            onClick={() => handlePageClick(page - 1)}
          >
            {'<'}
          </ArrowButton>
        )}

        <PageItemButton
          onClick={() => handlePageClick(1)}
          className={page === 1 ? 'active' : ''}
        >
          {1}
        </PageItemButton>

        {page > 3 && <div>...</div>}

        {page === totalPages && totalPages > 3 && (
          <PageItemButton
            onClick={() => handlePageClick(page - 2)}
            className={page === page - 2 ? 'active' : ''}
          >
            {page - 2}
          </PageItemButton>
        )}

        {page > 2 && (
          <PageItemButton
            onClick={() => handlePageClick(page - 1)}
            className={page === page - 1 ? 'active' : ''}
          >
            {page - 1}
          </PageItemButton>
        )}

        {page !== 1 && page !== totalPages && (
          <PageItemButton
            onClick={() => handlePageClick(page)}
            className={page === page ? 'active' : ''}
          >
            {page}
          </PageItemButton>
        )}

        {page < totalPages - 1 && (
          <PageItemButton
            onClick={() => handlePageClick(page + 1)}
            className={page === page + 1 ? 'active' : ''}
          >
            {page + 1}
          </PageItemButton>
        )}

        {page === 1 && totalPages > 3 && (
          <PageItemButton
            onClick={() => handlePageClick(page + 2)}
            className={page === page + 2 ? 'active' : ''}
          >
            {page + 2}
          </PageItemButton>
        )}

        {page < totalPages - 2 && <div >...</div>}

        {totalPages > 1 &&
          <PageItemButton
            onClick={() => handlePageClick(totalPages)}
            className={page === totalPages ? 'active' : ''}
          >
            {totalPages}
          </PageItemButton>
        }

        {page !== totalPages && (
          <ArrowButton
            onClick={() => handlePageClick(page + 1)}
          >
            {'>'}
          </ArrowButton>
        )}
      </PaginationWrapper>
      <div>
        <label htmlFor="itemPerPage">Items per page:</label>
        <select id="itemPerPage" defaultValue={itemsPerPage} onChange={(e) => handleItemsPerPage(Number(e.target.value))}>
          <option value={12}>{12}</option>
          <option value={24}>{24}</option>
          <option value={48}>{48}</option>
          <option value={96}>{96}</option>
        </select>
      </div>
    </PaginationMain>
  )
};

const PaginationMain = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const PaginationWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const ArrowButton = styled.button`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  font-weight: 600;
  color: #000;
  transition: all 0.4s ease-in-out;
  box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px;
  &:hover{
    cursor: pointer;
    background: #0070f3;
    color: #fff;
  }
`;

const PageItemButton = styled.button`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  font-weight: 600;
  color: #000;
  transition: all 0.4s ease-in-out;
  box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px;
  &.active{
    color: #0070f3;
    border-color: #0070f3;
  }
  &:hover{
    cursor: pointer;
    background: #0070f3;
    color: #fff;
  }
`;



export default Pagination;