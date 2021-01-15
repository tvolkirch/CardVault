import React from "react";
import renderer from "react-test-renderer";

import Card from "./Card";

it("Consistently renders a card", () => {

   const card = renderer
      .create(<Card url="#"
                   name="Card Name"
                   type="Card Type"
                    set="Card Set Name"
                  rules="Card Text"/>)
      .toJSON();

   expect(card).toMatchSnapshot();
});

