import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({
  pageNo,
  setPageNo,
  itemsPerPage,
  setItemsPerPage,
  totalCount,
  pageCount,
}) {
  
  const maxPageNoLimit = 3;
  let items = [];

  if (pageNo > 1) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => setPageNo(pageNo - 1)} />,
      <Pagination.First key="first" onClick={() => setPageNo(1)} />
    );
  }

  for (let page = 1; page <= pageCount; page++) {
    if (page < maxPageNoLimit + 1) {
      items.push(
        <Pagination.Item
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
      <Pagination.Last key="last" onClick={() => setPageNo(pageCount)} />,
      <Pagination.Next key="next" onClick={() => setPageNo(pageNo + 1)} />
    );
  }

  return (
    <footer className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>No of Total Records: {totalCount}</div>
        <div>
          <Pagination size="lg">{items}</Pagination>
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
