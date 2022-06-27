import { render } from "@testing-library/react";
import { FiHome } from "react-icons/fi";
import { CustomButton } from "./index";


describe("NavItem components", () => {
  it("should render correctly", () => {
    const { container } = render(<CustomButton >teste</CustomButton>);

    expect(container).toMatchSnapshot();
  });

  it("should render a icon", () => {
    const { container } = render(<CustomButton icon={FiHome}>teste</CustomButton>);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
