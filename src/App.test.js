import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import App from "./App";

import { getPressedKeyStatus } from "./lib/EventManager";

jest.mock("./VaultContainer");

it("Consistently renders blank App", () =>
{
    const app = renderer
        .create(<App />)
        .toJSON();

    expect(app).toMatchSnapshot();
});

it("test handleSearchOverlay for pressed Enter key", () =>
{
    const app = new App();
    const searchIconElem = document.createElement("div");
    var mockEvent = {};

    searchIconElem.setAttribute("id", "search-icon");
    searchIconElem.click = jest.fn( () => { return; } );

    mockEvent.target = searchIconElem;
    mockEvent.code = "Enter";

    app.handleSearchOverlay(mockEvent);

    expect(searchIconElem.click).toHaveBeenCalled();
});

it("test handleSearchOverlay for pressed Space bar", () =>
{
    const app = new App();
    const searchIconElem = document.createElement("div");
    var mockEvent = {};

    searchIconElem.setAttribute("id", "search-icon");
    searchIconElem.click = jest.fn( () => { return; } );

    mockEvent.target = searchIconElem;
    mockEvent.code = "Space";

    app.handleSearchOverlay(mockEvent);

    expect(searchIconElem.click).toHaveBeenCalled();
});

it("test handleSearchOverlay for unsupported key", () =>
{
    const app = new App();
    const searchIconElem = document.createElement("div");
    var mockEvent = {};

    searchIconElem.setAttribute("id", "search-icon");
    searchIconElem.click = jest.fn( () => { return; } );

    mockEvent.target = searchIconElem;
    mockEvent.code = "KeyE";

    app.handleSearchOverlay(mockEvent);

    expect(searchIconElem.click).toHaveBeenCalledTimes(0);
});

it("test to open search overlay", () =>
{
    const { getByTestId } = render(<App />);

    const searchIconElem = getByTestId("search-icon");
    const searchOverlayElem = getByTestId("search-overlay");
    const searchOverlayId = searchOverlayElem.getAttribute("id");
    const searchTextElem = getByTestId("searchText");

    expect(searchOverlayId).toBe("search-overlay");

    searchTextElem.focus = jest.fn( () => { return; } );
    fireEvent.click(searchIconElem);

    expect(searchTextElem.focus).toHaveBeenCalled();
});
