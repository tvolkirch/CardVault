import React, { Component } from "react";

import SearchOverlay from "./SearchOverlay";
import VaultContainer from "./VaultContainer";

import { getPressedKeyStatus } from "./lib/EventManager";

import "./App.css";

/*
 *  Card Vault
 *
 *  This application uses the free api.elderscrollslegends.io API to
 *  retrieve and display cards from the game, The Elder Scrolls: Legends.
 *
 *  It retrieves a fixed number of cards at one time, and uses infinite
 *  scroll to retrieve new groups of cards.
 *
 *  It has a search function to find cards by name or partial name, and
 *  allows up to a fixed number of cards to be displayed from the search
 *  results.
 *
 *  Disclaimer: The Elder Scrolls, The Elder Scrolls: Legends, ZeniMax,
 *  Bethesda, Bethesda Softworks and related logos are registered trademarks
 *  or trademarks of ZeniMax Media Inc. This website is not produced,
 *  endorsed, supported, or affiliated with ZeniMax Media Inc.
 *
 */

class App extends Component
{
    searchButton;

    constructor()
    {
        super();

        this.searchIcon = React.createRef();
    }

    componentDidMount()
    {
       if (this.searchIcon.current)
       {
          this.searchIcon.current.addEventListener("keydown", this.handleSearchOverlay);
       }
    }

    componentWillUnmount()
    {
       if (this.searchIcon.current)
       {
          this.searchIcon.current.removeEventListener("keydown", this.handleSearchOverlay);
       }
    }

    handleSearchOverlay = (eve) =>
    {
       const originatorElement = eve.target;
       const originatorId = originatorElement.getAttribute("id");

       const keyChecker = getPressedKeyStatus(eve);

       if ( originatorId === "search-icon"
           && (keyChecker.isEnter || keyChecker.isSpace) )
       {
          originatorElement.click();
       }
    }

    openSearchOverlay()
    {
        var overlay = document.getElementById("search-overlay");
        var bodyTag = document.body;
        var searchText = document.getElementById("searchText");

        overlay.style.display = "block";
        bodyTag.style.overflow = "hidden";  /* hide scrollbar to prevent scrolling */

       if (searchText)
       {
          searchText.focus();
       }
    }

    render()
    {
        return (
            <div>
                <header id="head">
                    <h4>
                       <div className="title">Elder Scrolls Card Vault</div>
                    </h4>
                    <span id="search-icon" ref={this.searchIcon} tabIndex="0"
                          aria-label="magnifying glass for search" role="img"
                          onClick={(eve) => this.openSearchOverlay()}>&#128269;</span>
                </header>
                <SearchOverlay />
                <VaultContainer />
            </div>
        );
    }
}

export default App;
