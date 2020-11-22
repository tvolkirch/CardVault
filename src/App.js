import React, { Component } from "react";
import axios from "axios";

import Loading from "./Loading";
import Card from "./Card";
import VaultContainer from "./VaultContainer";

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
    constructor(props, context)
    {
        super(props, context);

        this.state = {
            loading: false,
            cards: [],
            count: 0,
            hasSearched: false
        };  
    }
        
    openSearchOverlay()
    {
        var overlay = document.getElementById("search-overlay");
        var bodyTags = document.getElementsByTagName("body");
        var bodyTag = bodyTags[0];
        
        overlay.style.display = "block";
        bodyTag.style.overflow = "hidden";  // hide scrollbar to prevent scrolling
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
        this.callNameSearchApi(searchElement.value);
        
        return false;
    }
    
    callNameSearchApi(name)
    {
        name = encodeURI(name);
        const apiUrl = "https://api.elderscrollslegends.io/v1/cards?pageSize=10&name=" + name;
    
        axios.get(apiUrl)
            .then(response => {
                const count = response.data._totalCount;    
                const cards = response.data.cards;
                
                this.setState( {loading: false, cards: cards, count: count, hasSearched: true} );
        })
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
                    <span id="search-icon" aria-label="magnifying glass for search" role="img"
                        onClick={(ev) => this.openSearchOverlay()}>&#128269;</span>
                </header>
                
                <div id="search-overlay">
                    {loader}
                    <div className="close-button" onClick={(ev) => this.closeSearchOverlay()}>
                        <span id="close-icon" aria-label="close button" role="button">&#8855;</span>
                    </div>
                    <div id="search-form">
                        <input type="search" size="25" name="searchText" id="searchText"
                            placeholder="Search by Card Name"/>
                        <input type="submit" value="Search" id="search" onClick={(ev) => this.search()} />
                    </div>
                    {searchResults}
                </div>
                
                <VaultContainer />
        </div>
        );
    }
}

function SearchResults(props)
{    
    var openCardOverlay = function(index)
    {
        var id = "card-overlay" + index;
        var cardOverlay = document.getElementById(id);
        var searchOverlay = document.getElementById("search-overlay");
        var searchForm = document.getElementById("search-form");
        var searchResults = document.getElementById("search-results");

        searchResults.style.visibility = "hidden";
        searchForm.style.visibility = "hidden";
        searchOverlay.className = "invisible";
        cardOverlay.style.display = "block";
    }
    
    var closeCardOverlay = function(index)
    {
        var id = "card-overlay" + index;
        var cardOverlay = document.getElementById(id);
        var searchOverlay = document.getElementById("search-overlay");
        var searchForm = document.getElementById("search-form");
        var searchResults = document.getElementById("search-results");

        searchResults.style.visibility = "visible";
        searchForm.style.visibility = "visible";
        searchOverlay.className = "";
        cardOverlay.style.display = "none";
    }

    const cards = props.cards.map((card, index) =>
       <li key={index}>
           <div className="matched-card-name" onClick={(ev) => openCardOverlay(index)}>{card.name}</div>
           <div className="card-overlay" id={"card-overlay" + index}>
                <div className="close-button" onClick={(ev) => closeCardOverlay(index)}>
                    <span id="close-icon" aria-label="close button" role="button">&#8855;</span>
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
