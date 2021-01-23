import React from "react";

import Card from "./Card";

import { getPressedKeyStatus } from "./lib/EventManager";

import "./SearchResults.css";

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

export default SearchResults;