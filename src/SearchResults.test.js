import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import SearchResults from "./SearchResults";

it("Consistently renders search results", () =>
{
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

it("test handleCloseButton for pressed Enter key", () =>
{
   const searchResults = new SearchResults();
   var closeIconElem = document.createElement("div");
   var cardElem = document.createElement("div");
   var cardArray = [];

   closeIconElem.setAttribute("data", "0");
   closeIconElem.setAttribute("class", "close-button");
   cardArray[0] = cardElem;

   var mockEve =
   {
      code: "Enter",
      target: closeIconElem,
      preventDefault: () => { return; }
   };

   searchResults.closeCardOverlay = jest.fn( () => { return; } );
   searchResults.handleCloseButton(mockEve, cardArray, "0");

   expect(searchResults.closeCardOverlay).toHaveBeenCalled();
});

it("test handleCloseButton for pressed Space tab", () =>
{
   const searchResults = new SearchResults();
   var closeIconElem = document.createElement("div");
   var cardElem = document.createElement("div");
   var cardArray = [];

   closeIconElem.setAttribute("data", "0");
   closeIconElem.setAttribute("class", "close-button");
   cardArray[0] = cardElem;

   var mockEve =
   {
      code: "Space",
      target: closeIconElem,
      preventDefault: () => { return; }
   };

   searchResults.closeCardOverlay = jest.fn( () => { return; } );
   searchResults.handleCloseButton(mockEve, cardArray, "0");

   expect(searchResults.closeCardOverlay).toHaveBeenCalled();
});

it("test handleCloseButton for unsupported key", () =>
{
   const searchResults = new SearchResults();
   var closeIconElem = document.createElement("div");
   var cardElem = document.createElement("div");
   var cardArray = [];

   closeIconElem.setAttribute("data", "0");
   closeIconElem.setAttribute("class", "close-button");
   cardArray[0] = cardElem;

   var mockEve =
   {
      code: "KeyE",
      target: closeIconElem,
      preventDefault: () => { return; }
   };

   searchResults.closeCardOverlay = jest.fn( () => { return; } );
   searchResults.handleCloseButton(mockEve, cardArray, "0");

   expect(searchResults.closeCardOverlay).toHaveBeenCalledTimes(0);
});

it("test handleCloseButton for Shift/Tab", () =>
{
   const searchResults = new SearchResults();
   var closeIconElem = document.createElement("div");
   var cardElem = document.createElement("div");
   var cardArray = [];

   closeIconElem.setAttribute("data", "0");
   closeIconElem.setAttribute("class", "close-button");
   cardElem.focus = jest.fn( () => { return; } );
   cardArray[0] = cardElem;


   var mockEve =
   {
      code: "Tab",
      shiftKey: true,
      target: closeIconElem,
      preventDefault: () => { return; }
   };

   searchResults.handleCloseButton(mockEve, cardArray, "0");

   expect(cardElem.focus).toHaveBeenCalled();
});

it("test handleCardTabbing for Tab key", () =>
{
   const searchResults = new SearchResults();
   var closeIconElem = document.createElement("div");
   var closeButtonElem = document.createElement("div");
   var closeButtonArray = [];

   closeIconElem.setAttribute("data", "0");
   closeIconElem.setAttribute("class", "close-button");
   closeButtonElem.focus = jest.fn( () => { return; } );
   closeButtonArray[0] = closeButtonElem;

   var mockEve =
   {
      code: "Tab",
      shiftKey: false,
      target: closeIconElem,
      preventDefault: () => { return; }
   };

   searchResults.handleCardTabbing(mockEve, closeButtonArray);

   expect(closeButtonElem.focus).toHaveBeenCalled();
});

it("test handleCardTabbing for Shift/Tab", () =>
{
   const searchResults = new SearchResults();
   var closeIconElem = document.createElement("div");
   var closeButtonElem = document.createElement("div");
   var closeButtonArray = [];

   closeIconElem.setAttribute("data", "0");
   closeIconElem.setAttribute("class", "close-button");
   closeButtonElem.focus = jest.fn( () => { return; } );
   closeButtonArray[0] = closeButtonElem;

   var mockEve =
   {
      code: "Tab",
      shiftKey: true,
      target: closeIconElem,
      preventDefault: () => { return; }
   };

   searchResults.handleCardTabbing(mockEve, closeButtonArray);

   expect(closeButtonElem.focus).toHaveBeenCalledTimes(0);
});

it("test to open card overlay", () =>
{
   const count = 1;
   var cards = [];
   var card = {};

   card.imageUrl = "#";
   card.name = "Card Name";
   card.type = "Card Type";
   card.set = {};
   card.set.name = "Set Name";
   card.text = "Card Text";

   cards[0] = card;

   const { getByTestId } = render(<SearchResults
      count={count}
      cards={cards} />);

   const cardLinkElem = getByTestId("matchedCardName0");
   const cardOverlay = getByTestId("cardOverlay0");
   const closeButtonElem = getByTestId("closeCardOverlay0");
   var cardArray = cardOverlay.getElementsByClassName("card-content card-text");

   closeButtonElem.focus = jest.fn( () => { return; } );
   closeButtonElem.addEventListener = jest.fn( (a, b) => { return; } );
   cardArray[0].addEventListener = jest.fn( (a, b) => { return; } );

   fireEvent.click(cardLinkElem);

   expect(closeButtonElem.focus).toHaveBeenCalled();
   expect(closeButtonElem.addEventListener).toHaveBeenCalled();
   expect(cardArray[0].addEventListener).toHaveBeenCalled();
});

it("test to close card overlay", () =>
{
   const count = 1;
   var cards = [];
   var card = {};

   card.imageUrl = "#";
   card.name = "Card Name";
   card.type = "Card Type";
   card.set = {};
   card.set.name = "Set Name";
   card.text = "Card Text";

   cards[0] = card;

   const { getByTestId } = render(<SearchResults
      count={count}
      cards={cards} />);

   const cardOverlay = getByTestId("cardOverlay0");
   const closeButtonElem = getByTestId("closeCardOverlay0");
   var cardArray = cardOverlay.getElementsByClassName("card-content card-text");

   closeButtonElem.removeEventListener = jest.fn( (a, b) => { return; } );
   cardArray[0].removeEventListener = jest.fn( (a, b) => { return; } );

   fireEvent.click(closeButtonElem);

   expect(closeButtonElem.removeEventListener).toHaveBeenCalled();
   expect(cardArray[0].removeEventListener).toHaveBeenCalled();
});

it("test message with zero cards", () =>
{
   const count = 0;
   var cards = [];
   var card = {};

   const { getByTestId } = render(<SearchResults
      count={count}
      cards={cards} />);

   const messageElem = getByTestId("search-results");
   const messageText = messageElem.innerHTML;
   const messIndex = messageText.indexOf("No card names");

   expect(messIndex).not.toBe(-1);
});

it("test message with 10 cards", () =>
{
   const count = 10;
   var cards = [];
   var card = {};

   card.imageUrl = "#";
   card.name = "Card Name";
   card.type = "Card Type";
   card.set = {};
   card.set.name = "Set Name";
   card.text = "Card Text";

   for (let i = 0; i < 10; i++)
   {
      cards[i] = card;
   }

   const { getByTestId } = render(<SearchResults
      count={count}
      cards={cards} />);

   const messageElem = getByTestId("search-results");
   const messageText = messageElem.innerHTML;
   const messIndex = messageText.indexOf("No more than 10");

   expect(messIndex).not.toBe(-1);
});
