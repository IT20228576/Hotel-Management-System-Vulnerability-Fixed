import { render, screen } from "@testing-library/react";
import React from "react";
import PaginationComponent from "./PaginationComponent";

describe("PaginationComponent", () => {
  
  /* Test Case1 */
  it("Should renders successfully", () => {
    const setPageNo = {};
    const setItemsPerPage = {};

    render(
      <PaginationComponent
        pageNo={1}
        setPageNo={setPageNo}
        itemsPerPage={10}
        setItemsPerPage={setItemsPerPage}
        totalCount={20}
        pageCount={2}
      />
    );
  });

  /* Test Case1 */
  it("Should renders the pagination buttons of the pagination component", () => {
    const setPageNo = {};
    const setItemsPerPage = {};

    render(
      <PaginationComponent
        pageNo={1}
        setPageNo={setPageNo}
        itemsPerPage={10}
        setItemsPerPage={setItemsPerPage}
        totalCount={20}
        pageCount={2}
      />
    );

    const result = screen.getByTestId("paginationId");  
    expect(result.textContent).toBeDefined();

  });
});
