import React, { Component } from "react";

import CardService from "./api/CardService";
import Loading from "./Loading";
import Card from "./Card";
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

        this.state = {
            loading: false,
            cards: [],
            count: -1,
            hasSearched: false
        };

        this.searchIcon = React.createRef();
        this.closeButton = React.createRef();
        this.searchButton = React.createRef();
        this.searchText = React.createRef();
    }

    componentDidMount()
    {
       if (this.searchIcon.current)
       {
          this.searchIcon.current.addEventListener("keydown", this.handleSearchOverlay);
       }

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
       if (this.searchIcon.current)
       {
          this.searchIcon.current.removeEventListener("keydown", this.handleSearchOverlay);
       }

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

    openSearchOverlay()
    {
        var overlay = document.getElementById("search-overlay");
        var bodyTags = document.getElementsByTagName("body");
        var bodyTag = bodyTags[0];

        overlay.style.display = "block";
        bodyTag.style.overflow = "hidden";  /* hide scrollbar to prevent scrolling */

       if (this.searchText.current)
       {
          this.searchText.current.focus();
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
            <div>
                <header id="head">
                    <h4>
                       <div className="title">Elder Scrolls Card Vault</div>
                    </h4>
                    <span id="search-icon" ref={this.searchIcon} tabIndex="0"
                          aria-label="magnifying glass for search" role="img"
                          onClick={(eve) => this.openSearchOverlay()}>&#128269;</span>
                </header>
                
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
                
                <VaultContainer />
            </div>
        );
    }
}

/* TODO Need to refactor this as a separate, stateful component.
        It actually has a state with different search results
        and the componentDidUpdate hook is needed to add key
        listeners to the card name links.
 */
function SearchResults(props)
{
    var openCardOverlay = function(index)
    {
        var id = "cardOverlay" + index;
        var cardOverlay = document.getElementById(id);
        var searchOverlay = document.getElementById("search-overlay");
        var searchForm = document.getElementById("search-form");
        var searchResults = document.getElementById("search-results");

        searchResults.style.visibility = "hidden";
        searchForm.style.visibility = "hidden";
        searchOverlay.className = "invisible";
        cardOverlay.style.display = "block";

        var buttonArray = cardOverlay.getElementsByClassName("close-button");

        if (buttonArray && buttonArray[0])
        {
            buttonArray[0].focus();
            buttonArray[0].addEventListener("keydown", handleCloseButton);
            buttonArray[0].addEventListener("blur", buttonArray[0].focus);
        }
    }
    
    var closeCardOverlay = function(index)
    {
        var id = "cardOverlay" + index;
        var cardOverlay = document.getElementById(id);
        var searchOverlay = document.getElementById("search-overlay");
        var searchForm = document.getElementById("search-form");
        var searchResults = document.getElementById("search-results");

        searchResults.style.visibility = "visible";
        searchForm.style.visibility = "visible";
        searchOverlay.className = "";
        cardOverlay.style.display = "none";

        var buttonArray = cardOverlay.getElementsByClassName("close-button");
        var searchText = document.getElementById("searchText");

        if (buttonArray && buttonArray[0])
        {
            buttonArray[0].removeEventListener("keydown", handleCloseButton);
            buttonArray[0].removeEventListener("blur", buttonArray[0].focus);
        }

        searchText.focus();
    }

    function handleCloseButton(eve)
    {
       const originatorElement = eve.target;
       const originatorClass = originatorElement.getAttribute("class");

       const keyChecker = getPressedKeyStatus(eve);

       if ( (originatorClass.indexOf("close-button") > -1)
           && (keyChecker.isEnter || keyChecker.isSpace) )
       {
          let index = originatorElement.getAttribute("data");
          closeCardOverlay(index);
       }
    }

    var cards = "";

    if (props.cards && props.cards.length > 0)
    {
       cards = props.cards.map((card, index) =>
           <li key={index}>
               <div className="matched-card-name" id={"matchedCardName" + index} data={index} tabIndex="0"
                    onClick={(eve) => openCardOverlay(index)}>{card.name}</div>
               <div className="card-overlay" id={"cardOverlay" + index}>
                    <div className="close-button" tabIndex="0" data={index}
                         onClick={(eve) => closeCardOverlay(index)}>
                        <span className="close-icon" aria-label="close button" role="button">&#8855;</span>
                    </div>
                    <Card
                     url={card.imageUrl}
                     name={card.name}
                     type={card.type}
                     set={card.set.name}
                     rules={card.text}/>
               </div>
           </li>
       );
    }
        
    var message = "Click on any card name to display the card.";
    
    if (props.count === 0)
    {
        message = "No card names were found that matched the search text.";
    }
    else if (props.count >= 10)
    {
        message = "The search text matched " + props.count + 
           " card names. No more than 10 matches will be returned. " + message;
    }
    else if (props.count === 1)
    {
        message = "The search text matched " + props.count + " card name.  Click on the card name to display the card.";
    }
    else
    {
        message = "The search text matched " + props.count + " card names. " + message;
    }

    return (
        <div>
            <div id="search-results">{message}</div>
            <ul id="matchedCardList">{cards}</ul>
        </div>
    );
}

export default App;
