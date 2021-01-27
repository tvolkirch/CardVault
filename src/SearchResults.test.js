import React from "react";
import renderer from "react-test-renderer";

import SearchResults from "./SearchResults";

it("Consistently renders search results", () => {

   const count = "1";
   var cards = [];
   var card = {};

   card.imageUrl = "#";
   card.name = "Card Name";
   card.type = "Card Type";
   card.set = {};
   card.set.name = "Set Name";
   card.text = "Card Text";

   cards[0] = card;

   const searchResults = renderer
      .create(<SearchResults
          count={count}
          cards={cards} />)
      .toJSON();

   expect(searchResults).toMatchSnapshot();
});
