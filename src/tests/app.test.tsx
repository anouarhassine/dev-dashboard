import { render } from "@testing-library/react";
//import "@testing-library/jest-dom";
import StatusApp from "../components/statusApp";

describe("App", () => {
  it("renders without crashing", () => {
    render(<StatusApp />);
  });
});