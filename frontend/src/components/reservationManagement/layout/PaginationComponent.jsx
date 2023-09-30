import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({
  pageNo,
  setPageNo,
  itemsPerPage,
  setItemsPerPage,
  totalCount,
  pageCount,
}) {
  let items = [];
  const pageNoLimit = 5;
  const [maxPageNoLimit, setMaxPageNoLimit] = useState(5);
  const [minPageNoLimit, setMinPageNoLimit] = useState(0);

  if (pageNo > 1) {
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => {
          setPageNo(pageNo - 1);
          if ((pageNo - 1) % pageNoLimit === 0) {
            setMaxPageNoLimit(maxPageNoLimit - pageNoLimit);
            setMinPageNoLimit(minPageNoLimit - pageNoLimit);
          }
        }}
      />,
      <Pagination.First
        key="first"
        onClick={() => {
          setPageNo(1);
          setMaxPageNoLimit(5);
          setMinPageNoLimit(0);
        }}
      />
    );
  }

  for (let page = 1; page <= pageCount; page++) {
    if (page < maxPageNoLimit + 1 && page > minPageNoLimit) {
      items.push(
        <Pagination.Item
          key={page}
          id={page}
          active={page === pageNo ? true : false}
          onClick={() => {
            setPageNo(page);
          }}
        >
          {page}
        </Pagination.Item>
      );
    }
  }

  if (pageNo < pageCount) {
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => {
          setPageNo(pageCount);
          setMaxPageNoLimit(pageCount);
          setMinPageNoLimit(pageCount - pageNoLimit);
        }}
      />,
      <Pagination.Next
        key="next"
        onClick={() => {
          setPageNo(pageNo + 1);
          if (pageNo + 1 > maxPageNoLimit) {
            setMaxPageNoLimit(maxPageNoLimit + pageNoLimit);
            setMinPageNoLimit(minPageNoLimit + pageNoLimit);
          }
        }}
      />
    );
  }

  return (
    <footer className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div>No of Total Records: {totalCount}</div>
        <div>
          <Pagination size="lg" data-testid="paginationId">
            {items}
          </Pagination>
        </div>
        <div>
          Records Per Page:
          <select
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(event.target.value);
            }}
            className="btn btn-light p-2"
          >
            <option>3</option>;<option>10</option>;<option>25</option>;
            <option>20</option>;
          </select>
        </div>
      </div>
    </footer>
  );
}

export default PaginationComponent;
