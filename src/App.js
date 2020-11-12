import React, { Component } from "react";
import axios from "axios";

import Loading from "./Loading";
import Card from "./Card";
import VaultContainer from "./VaultContainer";

import "./App.css";

// TODO LIST

// RECOMMENDATION: don't have a loading indicator because the api is too fast 
// and the loading indicator briefly flashes - it seems odd
// It might make sense to try to put spinners over late loading card images.

// add key listener to submit search when Return key or space bar are pressed

// add error handling

// if it slows down as more cards are added, try PureComponent 
// for Card component to prevent re-rendering of previous cards

// add floating control to allow a user to jump to the top of the page

// refactor callNameSearchApi() with search attribute and value

// add tooltip hover/tap icon with instructions for partial names and 
// for adding comma for AND and the pipe character for OR of 
// multiple name values

// see about including all search results with a scrollable list of card names

// learn jest so I can add unit tests for the code

// manually test real smart phones - simulation isn't good enough

// add more accessibility as needed and test with screen readers

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
                    <input type="search" size="25" name="searchText" id="searchText"
                        placeholder="Search by Card Name"/>
                    <input type="submit" value="Search" id="search" onClick={(ev) => this.search()} />
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
        var overlay = document.getElementById(id);
        
        overlay.style.display = "block";
    }
    
    var closeCardOverlay = function(index)
    {
        var id = "card-overlay" + index;
        var overlay = document.getElementById(id);
        
        overlay.style.display = "none";
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
