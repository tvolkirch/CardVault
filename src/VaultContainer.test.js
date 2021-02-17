import React from "react";
import renderer from "react-test-renderer";

import VaultContainer from "./VaultContainer";

jest.mock("./api/CardService");
jest.useFakeTimers();

it("Consistently renders Vault Container with one mocked card", () =>
{
   const app = renderer
      .create(<VaultContainer />)
      .toJSON();

   expect(app).toMatchSnapshot();
});

it("test VaultContainer rendering for next load of results", () =>
{
   const vaultContainer = renderer.create(<VaultContainer />);
   const root = vaultContainer.root;
   const self = root.instance;
   var vaultContainerElem = document.createElement("div");

   self._data.nextApiCall = "nextURL";
   self.callApi();

   const cardNames = root.findAllByProps({className: "card-name"});

   expect(cardNames.length).toBe(2);

   const cardName1 = cardNames[0].children;
   const cardName2 = cardNames[1].children;

   expect(cardName1).toEqual(["Mocked Card"]);
   expect(cardName2).toEqual(["Mocked Card from Next Load"]);
});

it("test getWindowInfo with no screen", () =>
{
   const vaultContainer = new VaultContainer();
   const info = vaultContainer.getWindowInfo();

   expect(info.screenHeight).toBe(0);
   expect(info.contentHt).toBe(0);
   expect(info.vScroll).toBe(0);
});

it("test scrollHandler to make top control visible and call api to get cards", () =>
{
   const vaultContainer = new VaultContainer();

   vaultContainer.getWindowInfo = () =>
   {
      const info =
      {
         screenHeight: 500,
         pageHt: 500,
         contentHt: 1000,
         vScroll: 1000
      }

      return info;
   };

   vaultContainer.oldPagePosition = 0;
   vaultContainer.topOfPage = {};
   vaultContainer.topOfPage.current = {};
   vaultContainer.topOfPage.current.style = {};
   vaultContainer.topOfPage.current.style.visibility = "hidden";

   vaultContainer.scrollHandler();

   expect(vaultContainer.topOfPage.current.style.visibility).toEqual("visible");
   expect(setTimeout).toHaveBeenCalled();
   expect(vaultContainer.oldPagePosition).toBe(1000);
});

it("test scrollHandler to hide top control when near the top", () =>
{
   const vaultContainer = new VaultContainer();

   vaultContainer.getWindowInfo = () =>
   {
      const info =
      {
         screenHeight: 500,
         pageHt: 500,
         contentHt: 1000,
         vScroll: 400
      }

      return info;
   };

   vaultContainer.oldPagePosition = 1000;
   vaultContainer.topOfPage = {};
   vaultContainer.topOfPage.current = {};
   vaultContainer.topOfPage.current.style = {};
   vaultContainer.topOfPage.current.style.visibility = "visible";

   vaultContainer.scrollHandler();

   expect(vaultContainer.topOfPage.current.style.visibility).toEqual("hidden");
   expect(setTimeout).toHaveBeenCalled();
   expect(vaultContainer.oldPagePosition).toBe(1000);
});

it("test handleTopOfPageEvent for click", () =>
{
   const vaultContainer = new VaultContainer();
   var topOfPageControl = document.createElement("div");

   var mockEve =
   {
      target: topOfPageControl,
      type: "click"
   }

   document.documentElement.scrollTop = 100;
   document.body.scrollTop = 100;

   vaultContainer.handleTopOfPageEvent(mockEve);

   expect(document.documentElement.scrollTop).toBe(0);
   expect(document.body.scrollTop).toBe(0);
});

it("test handleTopOfPageEvent for pressing Enter key", () =>
{
   const vaultContainer = new VaultContainer();
   var topOfPageControl = document.createElement("div");

   topOfPageControl.click = jest.fn( () => { return; } );

   var mockEve =
   {
      target: topOfPageControl,
      type: "keydown",
      code: "Enter"
   }

   vaultContainer.handleTopOfPageEvent(mockEve);

   expect(topOfPageControl.click).toHaveBeenCalled();
});

it("test handleTopOfPageEvent for Space bar", () =>
{
   const vaultContainer = new VaultContainer();
   var topOfPageControl = document.createElement("div");

   topOfPageControl.click = jest.fn( () => { return; } );

   var mockEve =
   {
      target: topOfPageControl,
      type: "keydown",
      code: "Space"
   }

   vaultContainer.handleTopOfPageEvent(mockEve);

   expect(topOfPageControl.click).toHaveBeenCalled();
});
