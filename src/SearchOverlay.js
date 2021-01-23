import React, { Component } from "react";

import CardService from "./api/CardService";
import Loading from "./Loading";
import SearchResults from "./SearchResults";

import { getPressedKeyStatus } from "./lib/EventManager";

import "./SearchOverlay.css";

class SearchOverlay extends Component
{
    constructor()
    {
        super();

        this.state = {
            loading: false,
            cards: [],
            count: -1,
            hasSearched: false
        };

        this.closeButton = React.createRef();
        this.searchText = React.createRef();
        this.searchButton = React.createRef();
    }

    componentDidMount()
    {
       /* some content initially doesn't exist - can
          only add event listener when element exists */

       if (this.closeButton.current)
       {
          this.closeButton.current.addEventListener("keydown", this.handleCloseButton);
       }

       if (this.searchText.current)
       {
          this.searchText.current.addEventListener("keydown", this.handleSearchText);
       }

       if (this.searchButton.current)
       {
          this.searchButton.current.addEventListener("keydown", this.handleSearchButton);
       }
    }

    componentDidUpdate()
    {
       var cardArray = document.getElementsByClassName("matched-card-name");

       if ( cardArray && cardArray.length > 0 )
       {
          for (let i = 0; i < cardArray.length; i++ )
          {
             cardArray[i].addEventListener("keydown", this.handleCardLink);
          }
       }
    }

    componentWillUnmount()
    {
       /* some content initially doesn't exist - can
          only add event listener when element exists */

       if (this.closeButton.current)
       {
          this.closeButton.current.removeEventListener("keydown", this.handleCloseButton);
       }

       if (this.searchText.current)
       {
          this.searchText.current.removeEventListener("keydown", this.handleSearchText);
       }

       if (this.searchButton.current)
       {
          this.searchButton.current.removeEventListener("keydown", this.handleSearchButton);
       }

       var cardArray = document.getElementsByClassName("matched-card-name");

       if ( cardArray && cardArray.length > 0 )
       {
          for (let i = 0; i < cardArray.length; i++ )
          {
             cardArray[i].removeEventListener("keydown", this.handleCardLink);
          }
       }
    }

    handleCloseButton = (eve) =>
    {
       const originatorElement = eve.target;
       const originatorId = originatorElement.getAttribute("id");
       const keyChecker = getPressedKeyStatus(eve);
       var lastTabbedControl = document.getElementById("searchButton");
       var cardArray = document.getElementsByClassName("matched-card-name");

       if ( cardArray && cardArray.length > 0 )
       {
          lastTabbedControl = cardArray[ cardArray.length - 1 ];
       }

       if ( originatorId === "closeSearchOverlay" )
       {
          if ( keyChecker.isEnter || keyChecker.isSpace )
          {
             this.closeSearchOverlay();
          }

          /* keep tabbing on search overlay */

          if ( keyChecker.isTab && eve.shiftKey )
          {
             eve.preventDefault();
             lastTabbedControl.focus();
          }
       }
    }

    handleSearchText = (eve) =>
    {
       const originatorElement = eve.target;
       const originatorId = originatorElement.getAttribute("id");
       const searchButton = document.getElementById("searchButton");

       const keyChecker = getPressedKeyStatus(eve);

       if ( originatorId === "searchText" && keyChecker.isEnter )
       {
          searchButton.click();
       }
    }

    handleSearchButton = (eve) =>
    {
       const originatorElement = eve.target;
       const originatorId = originatorElement.getAttribute("id");
       const searchButton = document.getElementById("searchButton");

       const keyChecker = getPressedKeyStatus(eve);

       if ( originatorId === "searchButton"
           && (keyChecker.isEnter || keyChecker.isSpace) )
       {
          searchButton.click();
       }

       /* keep tabbing on search overlay */

       var cardArray = document.getElementsByClassName("matched-card-name");

       if ( !cardArray || cardArray.length === 0 )
       {
          let closeSearchOverlay = document.getElementById("closeSearchOverlay");

          if ( keyChecker.isTab && !eve.shiftKey )
          {
             eve.preventDefault();
             closeSearchOverlay.focus();
          }
       }
    }

    handleCardLink = (eve) =>
    {
       const originatorElement = eve.target;
       const keyChecker = getPressedKeyStatus(eve);

       if ( keyChecker.isEnter || keyChecker.isSpace )
       {
          originatorElement.click();
       }

       /* keep tabbing on search overlay */

       var lastTabbedControl = null;
       var lastTabbedControlIndex = "";
       const originatorIndex = originatorElement.getAttribute("data");
       const cardArray = document.getElementsByClassName("matched-card-name");
       const closeSearchOverlay = document.getElementById("closeSearchOverlay");

       if ( cardArray && cardArray.length > 0 )
       {
          lastTabbedControl = cardArray[ cardArray.length - 1 ];
          lastTabbedControlIndex = lastTabbedControl.getAttribute("data");
       }

       if ( keyChecker.isTab && !eve.shiftKey && originatorIndex === lastTabbedControlIndex )
       {
          eve.preventDefault();
          closeSearchOverlay.focus();
       }
    }

    closeSearchOverlay()
    {
        var overlay = document.getElementById("search-overlay");
        var bodyTags = document.getElementsByTagName("body");
        var bodyTag = bodyTags[0];

        overlay.style.display = "none";
        bodyTag.style.overflow = "visible";  // show scrollbar again
    }

    search()
    {
        this.setState( {loading: true} );

        const searchElement = document.getElementById("searchText");
        const cardService = new CardService();
        var searchPromise = cardService.cardApi("find", searchElement.value);
        var count = 0;
        var cards = [];

        if (searchPromise !== {})
        {
           searchPromise.then(response =>
           {
              count = response.data._totalCount;
              cards = response.data.cards;

              this.setState( {loading: false, cards: cards, count: count, hasSearched: true} );
           });
        }
        else
        {
           this.setState( {loading: false, cards: cards, count: count, hasSearched: true} );
        }

        return false;
    }

    render()
    {
        var searchResults = "";
        var loader = "";

        if (this.state.loading)
        {
            loader = <Loading top={50} left={200} />;
        }

        if (this.state.hasSearched)
        {
           searchResults = <SearchResults
              count={this.state.count}
              cards={this.state.cards} />
        }

        return (
<div id="search-overlay">
    {loader}
    <div id="closeSearchOverlay" className="close-button" ref={this.closeButton}
         tabIndex="0" onClick={(eve) => this.closeSearchOverlay()}>
        <span className="close-icon" aria-label="close button" role="button">&#8855;</span>
    </div>
    <div id="search-form">
        <input type="search" size="25" name="searchText" id="searchText"
            ref={this.searchText} placeholder="Search by Card Name"/>
        <input type="button" value="Search" id="searchButton"
            ref={this.searchButton} onClick={(eve) => this.search()} />
    </div>
    {searchResults}
</div>
        );
    }
}

export default SearchOverlay;