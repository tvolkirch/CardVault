import React from "react";
import renderer from "react-test-renderer";

import SearchOverlay from "./SearchOverlay";

it("Consistently renders the search overlay", () => {

   const searchOverlay = renderer
      .create(<SearchOverlay />)
      .toJSON();

   expect(searchOverlay).toMatchSnapshot();
});
