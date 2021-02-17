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
          this.closeButton.current.addEventListener("keydown", this.handleCloseButtonEvent);
       }

       if (this.searchText.current)
       {
          this.searchText.current.addEventListener("keydown", this.handleSearchTextEvent);
       }

       if (this.searchButton.current)
       {
          this.searchButton.current.addEventListener("keydown", this.handleSearchButtonEvent);
       }
    }

    componentDidUpdate()
    {
       var cardArray = document.getElementsByClassName("matched-card-name");

       if ( cardArray && cardArray.length > 0 )
       {
          for (let i = 0; i < cardArray.length; i++ )
          {
             cardArray[i].addEventListener("keydown", this.handleCardLinkEvent);
          }
       }
    }

    componentWillUnmount()
    {
       /* some content initially doesn't exist - can
          only add event listener when element exists */

       if (this.closeButton.current)
       {
          this.closeButton.current.removeEventListener("keydown", this.handleCloseButtonEvent);
       }

       if (this.searchText.current)
       {
          this.searchText.current.removeEventListener("keydown", this.handleSearchTextEvent);
       }

       if (this.searchButton.current)
       {
          this.searchButton.current.removeEventListener("keydown", this.handleSearchButtonEvent);
       }

       var cardArray = document.getElementsByClassName("matched-card-name");

       if ( cardArray && cardArray.length > 0 )
       {
          for (let i = 0; i < cardArray.length; i++ )
          {
             cardArray[i].removeEventListener("keydown", this.handleCardLinkEvent);
          }
       }
    }

    handleCloseButtonEvent = (eve) =>
    {
       const matchedCardList = document.getElementById("matchedCardList");

       this.handleCloseButton(eve, matchedCardList);
    }

    handleCloseButton(eve, matchedCardList)
    {
       const originatorElement = eve.target;
       const originatorId = originatorElement.getAttribute("id");
       const keyChecker = getPressedKeyStatus(eve);
       var lastTabbedControl = this.searchButton.current;
       var cardArray = [];

       if (matchedCardList)
       {
          cardArray = matchedCardList.getElementsByClassName("matched-card-name");
       }

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

    handleSearchTextEvent = (eve) =>
    {
       const originatorElement = eve.target;
       const originatorId = originatorElement.getAttribute("id");

       const keyChecker = getPressedKeyStatus(eve);

       if ( originatorId === "searchText" && keyChecker.isEnter )
       {
          this.searchButton.current.click();
       }
    }

    handleSearchButtonEvent = (eve) =>
    {
       const matchedCardList = document.getElementById("matchedCardList");

       this.handleSearchButton(eve, matchedCardList);
    }

    handleSearchButton(eve, matchedCardList)
    {
       const originatorElement = eve.target;
       const originatorId = originatorElement.getAttribute("id");
       const keyChecker = getPressedKeyStatus(eve);
       var cardArray = [];

       if (matchedCardList)
       {
          cardArray = matchedCardList.getElementsByClassName("matched-card-name");
       }

       if ( originatorId === "searchButton"
           && (keyChecker.isEnter || keyChecker.isSpace) )
       {
          this.searchButton.current.click();
       }

       /* keep tabbing on search overlay */

       if ( !cardArray || cardArray.length === 0 )
       {
          if ( keyChecker.isTab && !eve.shiftKey )
          {
             eve.preventDefault();
             this.closeButton.current.focus();
          }
       }
    }

    handleCardLinkEvent = (eve) =>
    {
       const matchedCardList = document.getElementById("matchedCardList");

       this.handleCardLink(eve, matchedCardList);
    }

    handleCardLink(eve, matchedCardList)
    {
       const originatorElement = eve.target;
       const keyChecker = getPressedKeyStatus(eve);
       var cardArray = [];

       if (matchedCardList)
       {
          cardArray = matchedCardList.getElementsByClassName("matched-card-name");
       }

       if ( keyChecker.isEnter || keyChecker.isSpace )
       {
          originatorElement.click();
          return;
       }

       /* keep tabbing on search overlay */

       var lastTabbedControl = null;
       var lastTabbedControlIndex = "";
       const originatorIndex = originatorElement.getAttribute("data");

       if ( cardArray && cardArray.length > 0 )
       {
          lastTabbedControl = cardArray[ cardArray.length - 1 ];
          lastTabbedControlIndex = lastTabbedControl.getAttribute("data");
       }

       if ( keyChecker.isTab && !eve.shiftKey && originatorIndex === lastTabbedControlIndex )
       {
          eve.preventDefault();
          this.closeButton.current.focus();
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
        var searchElement = document.getElementById("searchText");

        this.searchApi(searchElement);
    }

    searchApi(searchElement)
    {
        this.setState( {loading: true} );

        const cardService = new CardService();
        var searchPromise = cardService.cardApi("find", searchElement.value);
        var count = 0;
        var cards = [];

        if (searchPromise && searchPromise.then)
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
<div id="search-overlay" data-testid="search-overlay">
    {loader}
    <div id="closeSearchOverlay" className="close-button" ref={this.closeButton}
         data-testid="closeSearchOverlay"
         tabIndex="0" onClick={(eve) => this.closeSearchOverlay()}>
        <span className="close-icon" aria-label="close button" role="button">&#8855;</span>
    </div>
    <div id="search-form">
        <input type="search" size="25" name="searchText" id="searchText"
            data-testid="searchText"
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