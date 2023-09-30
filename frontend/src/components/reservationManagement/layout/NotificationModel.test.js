import React from "react";
import { render, screen } from "@testing-library/react";
import NotificationModel from "./NotificationModel";

describe("NotificationModel", () => {
  
  /* Test Case1 */
  it("Should renders successfully", () => {
    const expectedMessage = "Model Rendered Successfully";
    function modelClose() {
      return true;
    }

    render(
      <NotificationModel
        message={expectedMessage}
        handleModalClose={modelClose}
      />
    );
  });

  /* Test Case1 */
  it("Should show the correct message in the paragraph block", () => {
    const expectedMessage = "Model Rendered Successfully";
    function modelClose() {
      return true;
    }
    render(
      <NotificationModel
        message={expectedMessage}
        handleModalClose={modelClose}
      />
    );
    const result = screen.getByText(expectedMessage);
    expect(result).toBeInTheDocument();
  });
});
