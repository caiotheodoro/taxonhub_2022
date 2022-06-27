import { render } from "@testing-library/react";
import { NavItem } from "./index";
import { FiHome } from "react-icons/fi";


describe("NavItem components", () => {
  it("should render correctly", () => {
    const { container } = render(<NavItem icon={FiHome}>.</NavItem>);

    expect(container).toMatchSnapshot();
  });

  it("should render a link", () => {
    const { container } = render(<NavItem icon={FiHome}>.</NavItem>);

    expect(container.querySelector("a")).toBeInTheDocument();
  });
});
