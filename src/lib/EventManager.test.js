import React from "react";

import { getPressedKeyStatus } from "./EventManager";

it("testing tab key press event", () =>
{
    var eveInit = {"code":"Tab"};
    var eve = new KeyboardEvent("keydown", eveInit);

    var keyStatus = getPressedKeyStatus(eve);

    expect(keyStatus.isTab).toEqual(true);
    expect(keyStatus.isEnter).toEqual(false);
    expect(keyStatus.isSpace).toEqual(false);
});

it("testing enter/return key press event", () =>
{
    var eveInit = {"code":"Enter"};
    var eve = new KeyboardEvent("keydown", eveInit);

    var keyStatus = getPressedKeyStatus(eve);

    expect(keyStatus.isTab).toEqual(false);
    expect(keyStatus.isEnter).toEqual(true);
    expect(keyStatus.isSpace).toEqual(false);
});

it("testing space bar press event", () =>
{
    var eveInit = {"code":"Space"};
    var eve = new KeyboardEvent("keydown", eveInit);

    var keyStatus = getPressedKeyStatus(eve);

    expect(keyStatus.isTab).toEqual(false);
    expect(keyStatus.isEnter).toEqual(false);
    expect(keyStatus.isSpace).toEqual(true);
});

it("testing tab key press event - deprecated property", () =>
{
    var eveInit = {"keyCode":9};
    var eve = new KeyboardEvent("keydown", eveInit);

    var keyStatus = getPressedKeyStatus(eve);

    expect(keyStatus.isTab).toEqual(true);
    expect(keyStatus.isEnter).toEqual(false);
    expect(keyStatus.isSpace).toEqual(false);
});

it("testing enter/return key press event - deprecated property", () =>
{
    var eveInit = {"keyCode":13};
    var eve = new KeyboardEvent("keydown", eveInit);

    var keyStatus = getPressedKeyStatus(eve);

    expect(keyStatus.isTab).toEqual(false);
    expect(keyStatus.isEnter).toEqual(true);
    expect(keyStatus.isSpace).toEqual(false);
});

it("testing space bar press event - deprecated property", () =>
{
    var eveInit = {"keyCode":32};
    var eve = new KeyboardEvent("keydown", eveInit);

    var keyStatus = getPressedKeyStatus(eve);

    expect(keyStatus.isTab).toEqual(false);
    expect(keyStatus.isEnter).toEqual(false);
    expect(keyStatus.isSpace).toEqual(true);
});
