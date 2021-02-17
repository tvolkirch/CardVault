import React from "react";
import renderer from "react-test-renderer";

import Loading from "./Loading";

it("Consistently renders the spinner", () => {

   const spinner = renderer
      .create(<Loading top={25} left={100} bottom={100} right={25} />)
      .toJSON();

   expect(spinner).toMatchSnapshot();
});
