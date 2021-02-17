import React from "react";

import CardService from "./CardService";

const cardService = new CardService();
const urlMap = cardService.getUrlMap();
const apiGetFunction = function(url)
{
    if ( url === (urlMap.get("find") + "any") )
    {
        return "card-search";
    }

    if ( url === urlMap.get("card") )
    {
        return "default-card-group";
    }

    if ( url === "next-url" )
    {
        return "paged-card-group";
    }

    return "no url found";
}

it("performs a card search", () =>
{
    const urlKey = "find";
    const pattern = "any";
    const nextUrl = null;
    const response = cardService.cardApiCall(apiGetFunction, urlKey, pattern, nextUrl);

    expect(response).toEqual("card-search");
});

it("performs a default query to get a group of cards", () =>
{
    const urlKey = "card";
    const pattern = "";
    const nextUrl = null;
    const response = cardService.cardApiCall(apiGetFunction, urlKey, pattern, nextUrl);

    expect(response).toEqual("default-card-group");
});

it("performs a paged query to get a group of cards", () =>
{
    const urlKey = "card";
    const pattern = "";
    const nextUrl = "next-url";
    const response = cardService.cardApiCall(apiGetFunction, urlKey, pattern, nextUrl);

    expect(response).toEqual("paged-card-group");
});


it("returns blank response for unknown url key", () =>
{
    const urlKey = "unknown";
    const pattern = "";
    const nextUrl = null;
    const response = cardService.cardApiCall(apiGetFunction, urlKey, pattern, nextUrl);

    expect(response).toEqual({});
});
