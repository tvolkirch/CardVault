import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

jest.mock("./VaultContainer");

it("Consistently renders blank App", () =>
{
   const app = renderer
      .create(<App />)
      .toJSON();

   expect(app).toMatchSnapshot();
});