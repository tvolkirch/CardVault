import React from "react";
import renderer from "react-test-renderer";

import VaultContainer from "./VaultContainer";

jest.mock("./api/CardService");

it("Consistently renders Vault Container with one mocked card", () =>
{
   const app = renderer
      .create(<VaultContainer />)
      .toJSON();

   expect(app).toMatchSnapshot();
});