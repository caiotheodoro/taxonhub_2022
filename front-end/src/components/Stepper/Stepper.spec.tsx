import { render } from "@testing-library/react";
import { Stepper } from "./index";

describe("Pagination components", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Stepper
      height="100px"
      isLastStep={false}

      >
        .
      </Stepper>
    );
    expect(container).toMatchSnapshot();
  })

});
