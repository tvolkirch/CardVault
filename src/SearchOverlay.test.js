import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import SearchOverlay from "./SearchOverlay";

jest.mock("./api/CardService");

it("test SearchOverlay rendering after mock search", () =>
{
   const searchOverlay = renderer.create(<SearchOverlay />);
   const self = searchOverlay.root.instance;
   var searchTextElem = document.createElement("div");

   searchTextElem.value = "mock";
   self.searchApi(searchTextElem);

   expect(searchOverlay.toJSON()).toMatchSnapshot();
});

it("test SearchOverlay rendering after failed search", () =>
{
   const searchOverlay = renderer.create(<SearchOverlay />);
   const root = searchOverlay.root;
   const self = root.instance;
   var searchTextElem = document.createElement("div");

   searchTextElem.value = "";
   self.searchApi(searchTextElem);

   const message = root.findByProps({id: "search-results"}).children;

   expect(message).toEqual(["No card names were found that matched the search text."]);
});

it("test handleCloseButton for pressed Enter key", () =>
{
   const searchOverlay = new SearchOverlay();
   var closeButtonElem = document.createElement("div");

   closeButtonElem.setAttribute("id", "closeSearchOverlay");

   var mockEve =
   {
      code: "Enter",
      target: closeButtonElem
   };

   searchOverlay.closeSearchOverlay = jest.fn( () => { return; } );
   searchOverlay.handleCloseButton(mockEve, null);

   expect(searchOverlay.closeSearchOverlay).toHaveBeenCalled();
});

it("test handleCloseButton for pressed space bar", () =>
{
   const searchOverlay = new SearchOverlay();
   var closeButtonElem = document.createElement("div");

   closeButtonElem.setAttribute("id", "closeSearchOverlay");

   var mockEve =
   {
      code: "Space",
      target: closeButtonElem
   };

   searchOverlay.closeSearchOverlay = jest.fn( () => { return; } );
   searchOverlay.handleCloseButton(mockEve, null);

   expect(searchOverlay.closeSearchOverlay).toHaveBeenCalled();
});

it("test handleCloseButton for unsupported key", () =>
{
   const searchOverlay = new SearchOverlay();
   var closeButtonElem = document.createElement("div");

   closeButtonElem.setAttribute("id", "closeSearchOverlay");

   var mockEve =
   {
      code: "KeyE",
      target: closeButtonElem
   };

   searchOverlay.closeSearchOverlay = jest.fn( () => { return; } );
   searchOverlay.handleCloseButton(mockEve, null);

   expect(searchOverlay.closeSearchOverlay).not.toHaveBeenCalled();
});

it("test handleCloseButton for shift/tab with no matching cards", () =>
{
   const searchOverlay = new SearchOverlay();
   var closeButtonElem = document.createElement("div");
   var tabControlElem = document.createElement("div");

   closeButtonElem.setAttribute("id", "closeSearchOverlay");
   tabControlElem.focus = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Tab",
      shiftKey: true,
      target: closeButtonElem,
      preventDefault: () => { return; }
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = tabControlElem;
   searchOverlay.handleCloseButton(mockEve, null);

   expect(tabControlElem.focus).toHaveBeenCalled();
});


it("test handleCloseButton for tab with no matching cards", () =>
{
   const searchOverlay = new SearchOverlay();
   var closeButtonElem = document.createElement("div");
   var tabControlElem = document.createElement("div");

   closeButtonElem.setAttribute("id", "closeSearchOverlay");
   tabControlElem.focus = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Tab",
      shiftKey: false,
      target: closeButtonElem,
      preventDefault: () => { return; }
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = tabControlElem;
   searchOverlay.handleCloseButton(mockEve, null);

   expect(tabControlElem.focus).not.toHaveBeenCalled();
});

it("test handleCloseButton for shift/tab with a matching card", () =>
{
   const searchOverlay = new SearchOverlay();
   var closeButtonElem = document.createElement("div");
   var tabControlElem = document.createElement("div");
   var card = document.createElement("div");
   var matchedCardListElem = document.createElement("div");

   closeButtonElem.setAttribute("id", "closeSearchOverlay");
   tabControlElem.focus = jest.fn( () => { return; } );
   card.setAttribute("class", "matched-card-name");
   card.focus = jest.fn( () => { return; } );
   matchedCardListElem.appendChild(card);

   var mockEve =
   {
      code: "Tab",
      shiftKey: true,
      target: closeButtonElem,
      preventDefault: () => { return; }
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = tabControlElem;
   searchOverlay.handleCloseButton(mockEve, matchedCardListElem);

   expect(searchOverlay.searchButton.current.focus).not.toHaveBeenCalled();
   expect(card.focus).toHaveBeenCalled();
});

it("test handleCloseButton for tab with a matching card", () =>
{
   const searchOverlay = new SearchOverlay();
   var closeButtonElem = document.createElement("div");
   var tabControlElem = document.createElement("div");
   var card = document.createElement("div");
   var matchedCardListElem = document.createElement("div");

   closeButtonElem.setAttribute("id", "closeSearchOverlay");
   card.setAttribute("class", "matched-card-name");
   card.focus = jest.fn( () => { return; } );
   matchedCardListElem.appendChild(card);

   var mockEve =
   {
      code: "Tab",
      shiftKey: false,
      target: closeButtonElem,
      preventDefault: () => { return; }
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = document.createElement("div");
   searchOverlay.handleCloseButton(mockEve, matchedCardListElem);

   expect(card.focus).not.toHaveBeenCalled();
});

it("test handleSearchText for pressed Enter key", () =>
{
   const searchOverlay = new SearchOverlay();
   var searchTextElem = document.createElement("div");
   var searchButtonElem = document.createElement("div");

   searchTextElem.setAttribute("id", "searchText");
   searchButtonElem.click = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Enter",
      target: searchTextElem
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = searchButtonElem;
   searchOverlay.handleSearchTextEvent(mockEve);

   expect(searchOverlay.searchButton.current.click).toHaveBeenCalled();
});

it("test handleSearchText for unsupported key", () =>
{
   const searchOverlay = new SearchOverlay();
   var searchTextElem = document.createElement("div");
   var searchButtonElem = document.createElement("div");

   searchTextElem.setAttribute("id", "searchText");
   searchButtonElem.click = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Space",
      target: searchTextElem
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = searchButtonElem;
   searchOverlay.handleSearchTextEvent(mockEve);

   expect(searchOverlay.searchButton.current.click).not.toHaveBeenCalled();
});

it("test handleSearchButton for pressed Enter key", () =>
{
   const searchOverlay = new SearchOverlay();
   var searchButtonElem = document.createElement("div");

   searchButtonElem.setAttribute("id", "searchButton");
   searchButtonElem.click = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Enter",
      target: searchButtonElem
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = searchButtonElem;
   searchOverlay.handleSearchButton(mockEve, null);

   expect(searchOverlay.searchButton.current.click).toHaveBeenCalled();
});

it("test handleSearchButton for pressed Space key", () =>
{
   const searchOverlay = new SearchOverlay();
   var searchButtonElem = document.createElement("div");

   searchButtonElem.setAttribute("id", "searchButton");
   searchButtonElem.click = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Space",
      target: searchButtonElem
   };

   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = searchButtonElem;
   searchOverlay.handleSearchButton(mockEve, null);

   expect(searchOverlay.searchButton.current.click).toHaveBeenCalled();
});

it("test handleSearchButton for tab", () =>
{
   const searchOverlay = new SearchOverlay();
   var searchButtonElem = document.createElement("div");
   var closeSearchOverlayElem = document.createElement("div");

   searchButtonElem.setAttribute("id", "searchButton");
   searchButtonElem.click = jest.fn( () => { return; } );
   closeSearchOverlayElem.focus = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Tab",
      shiftKey: false,
      target: searchButtonElem,
      preventDefault: () => { return; }
   };

   searchOverlay.closeButton = {};
   searchOverlay.closeButton.current = closeSearchOverlayElem;
   searchOverlay.searchButton = {};
   searchOverlay.searchButton.current = searchButtonElem;
   searchOverlay.handleSearchButton(mockEve, null);

   expect(searchOverlay.searchButton.current.click).not.toHaveBeenCalled();
   expect(searchOverlay.closeButton.current.focus).toHaveBeenCalled();
});

it("test handleCardLink for pressed Enter key", () =>
{
   const searchOverlay = new SearchOverlay();
   var cardNameLinkElem = document.createElement("div");

   cardNameLinkElem.click = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Enter",
      target: cardNameLinkElem
   };

   searchOverlay.handleCardLink(mockEve, null);

   expect(cardNameLinkElem.click).toHaveBeenCalled();
});

it("test handleCardLink for pressed space bar", () =>
{
   const searchOverlay = new SearchOverlay();
   var cardNameLinkElem = document.createElement("div");

   cardNameLinkElem.click = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Space",
      target: cardNameLinkElem
   };

   searchOverlay.handleCardLink(mockEve, null);

   expect(cardNameLinkElem.click).toHaveBeenCalled();
});

it("test handleCardLink for tab from last card link", () =>
{
   const searchOverlay = new SearchOverlay();
   var cardNameLinkElem = document.createElement("div");
   var closeSearchOverlayElem = document.createElement("div");
   var matchedCardListElem = document.createElement("div");

   cardNameLinkElem.setAttribute("class", "matched-card-name");
   cardNameLinkElem.setAttribute("data", "0");
   cardNameLinkElem.click = jest.fn( () => { return; } );
   matchedCardListElem.appendChild(cardNameLinkElem);
   closeSearchOverlayElem.focus = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Tab",
      shiftKey: false,
      target: cardNameLinkElem,
      preventDefault: () => { return; }
   };

   searchOverlay.closeButton = {};
   searchOverlay.closeButton.current = closeSearchOverlayElem;
   searchOverlay.handleCardLink(mockEve, matchedCardListElem);

   expect(cardNameLinkElem.click).not.toHaveBeenCalled();
   expect(searchOverlay.closeButton.current.focus).toHaveBeenCalled();
});

it("test handleCardLink for tab from card link that isn't last", () =>
{
   const searchOverlay = new SearchOverlay();
   var cardNameLinkElem1 = document.createElement("div");
   var cardNameLinkElem2 = document.createElement("div");
   var closeSearchOverlayElem = document.createElement("div");
   var matchedCardListElem = document.createElement("div");

   cardNameLinkElem1.setAttribute("data", "0");
   cardNameLinkElem2.setAttribute("data", "1");
   cardNameLinkElem1.click = jest.fn( () => { return; } );
   matchedCardListElem.appendChild(cardNameLinkElem1);
   matchedCardListElem.appendChild(cardNameLinkElem2);
   closeSearchOverlayElem.focus = jest.fn( () => { return; } );

   var mockEve =
   {
      code: "Tab",
      shiftKey: false,
      target: cardNameLinkElem1,
      preventDefault: () => { return; }
   };

   searchOverlay.closeButton = {};
   searchOverlay.closeButton.current = closeSearchOverlayElem;
   searchOverlay.handleCardLink(mockEve, matchedCardListElem);

   expect(cardNameLinkElem1.click).not.toHaveBeenCalled();
   expect(closeSearchOverlayElem.focus).not.toHaveBeenCalled();
});

it("test to close card overlay", () =>
{
   const { getByTestId } = render(<SearchOverlay />);
   var closeButtonElem = getByTestId("closeSearchOverlay");

   fireEvent.click(closeButtonElem);

   var searchOverlayElem = getByTestId("search-overlay");

   expect(searchOverlayElem.style.display).toBe("none");
});
