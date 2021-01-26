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
        var buttonArray = cardOverlay.getElementsByClassName("close-button");
        const currentCard = document.getElementById("cardOverlay" + index);
        var cardArray = currentCard.getElementsByClassName("card-content card-text");

        searchOverlay.className = "invisible";
        cardOverlay.style.display = "block";

        if (buttonArray && buttonArray[0])
        {
            buttonArray[0].focus();
            buttonArray[0].addEventListener("keydown", handleCloseButton);
        }

        if ( cardArray && cardArray[0] )
        {
            cardArray[0].addEventListener("keydown", handleCardTabbing);
        }
    }

    var closeCardOverlay = function(index)
    {
        var id = "cardOverlay" + index;
        var cardOverlay = document.getElementById(id);
        var searchOverlay = document.getElementById("search-overlay");
        var buttonArray = cardOverlay.getElementsByClassName("close-button");
        var searchText = document.getElementById("searchText");
        const currentCard = document.getElementById("cardOverlay" + index);
        var cardArray = currentCard.getElementsByClassName("card-content card-text");

        searchOverlay.className = "";
        cardOverlay.style.display = "none";

        if (buttonArray && buttonArray[0])
        {
            buttonArray[0].removeEventListener("keydown", handleCloseButton);
        }

        if ( cardArray && cardArray[0] )
        {
            cardArray[0].removeEventListener("keydown", handleCardTabbing);
        }

        searchText.focus();
    }

    function handleCloseButton(eve)
    {
        const originatorElement = eve.target;
        const index = originatorElement.getAttribute("data");
        const originatorClass = originatorElement.getAttribute("class");
        const currentCard = document.getElementById("cardOverlay" + index);
        var cardArray = currentCard.getElementsByClassName("card-content card-text");
        const keyChecker = getPressedKeyStatus(eve);

        if ( originatorClass.indexOf("close-button") > -1 )
        {
            if ( keyChecker.isEnter || keyChecker.isSpace )
            {
                closeCardOverlay(index);
            }

            if ( cardArray && cardArray[0] && keyChecker.isTab && eve.shiftKey )
            {
                eve.preventDefault();
                cardArray[0].focus();
            }
        }
    }

    function handleCardTabbing(eve)
    {
        const originatorElement = eve.target;
        const index = originatorElement.getAttribute("data");
        const currentCard = document.getElementById("cardOverlay" + index);
        var closeButtonArr = currentCard.getElementsByClassName("close-button");
        const keyChecker = getPressedKeyStatus(eve);

        if (closeButtonArr && closeButtonArr[0] )
        {
            if (keyChecker.isTab && !eve.shiftKey)
            {
                eve.preventDefault();
                closeButtonArr[0].focus();
            }
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
                     index={index}
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
            <div id="search-results" tabIndex="0">{message}</div>
            <ul id="matchedCardList">{cards}</ul>
        </div>
    );
}

export default SearchResults;