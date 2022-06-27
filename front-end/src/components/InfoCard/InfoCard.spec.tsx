import { render } from "@testing-library/react";
import { FiHome } from "react-icons/fi";
import { InfoCard } from "./index";


describe("NavItem components", () => {
  it("should render correctly", () => {
    const { container } = render(<InfoCard  />);

    expect(container).toMatchSnapshot();
  });

 
});
