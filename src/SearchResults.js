import React, { Component } from "react";

import Card from "./Card";

import { getPressedKeyStatus } from "./lib/EventManager";

import "./SearchResults.css";

class SearchResults extends Component
{
    openCardOverlay(index)
    {
        var id = "cardOverlay" + index;
        var cardOverlay = document.getElementById(id);
        var closeButton = document.getElementById("closeCardOverlay" + index);
        var searchOverlay = document.getElementById("search-overlay");
        var cardArray = cardOverlay.getElementsByClassName("card-content card-text");

        cardOverlay.style.display = "block";

        if (searchOverlay)
        {
            searchOverlay.className = "invisible";
        }

        if (closeButton)
        {
            closeButton.focus();
            closeButton.addEventListener("keydown", this.handleCloseButtonEvent);
        }

        if ( cardArray && cardArray[0] )
        {
            cardArray[0].addEventListener("keydown", this.handleCardTabbingEvent);
        }
    }

    closeCardOverlay(index)
    {
        var id = "cardOverlay" + index;
        var cardOverlay = document.getElementById(id);
        var closeButton = document.getElementById("closeCardOverlay" + index);
        var searchOverlay = document.getElementById("search-overlay");
        var searchText = document.getElementById("searchText");
        var cardArray = cardOverlay.getElementsByClassName("card-content card-text");

        cardOverlay.style.display = "none";

        if (searchOverlay)
        {
            searchOverlay.className = "";
        }

        if (closeButton)
        {
            closeButton.removeEventListener("keydown", this.handleCloseButtonEvent);
        }

        if ( cardArray && cardArray[0] )
        {
            cardArray[0].removeEventListener("keydown", this.handleCardTabbingEvent);
        }

        if (searchText)
        {
            searchText.focus();
        }
    }

    handleCloseButtonEvent = (eve) =>
    {
        const originatorElement = eve.target;
        const index = originatorElement.getAttribute("data");
        const currentCard = document.getElementById("cardOverlay" + index);
        var cardArray = currentCard.getElementsByClassName("card-content card-text");

        this.handleCloseButton(eve, cardArray, index);
    }

    handleCloseButton(eve, cardArray, index)
    {
        const originatorElement = eve.target;
        const originatorClass = originatorElement.getAttribute("class");
        const keyChecker = getPressedKeyStatus(eve);

        if ( originatorClass.indexOf("close-button") > -1 )
        {
            if ( keyChecker.isEnter || keyChecker.isSpace )
            {
                this.closeCardOverlay(index);
            }

            if ( cardArray && cardArray[0] && keyChecker.isTab && eve.shiftKey )
            {
                eve.preventDefault();
                cardArray[0].focus();
            }
        }
    }

    handleCardTabbingEvent = (eve) =>
    {
        const originatorElement = eve.target;
        const index = originatorElement.getAttribute("data");
        const currentCard = document.getElementById("cardOverlay" + index);
        var closeButtonArr = currentCard.getElementsByClassName("close-button");

        this.handleCardTabbing(eve, closeButtonArr);
    }

    handleCardTabbing(eve, closeButtonArr)
    {
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

    render()
    {
        var cards = "";

        if (this.props.cards && this.props.cards.length > 0)
        {
           cards = this.props.cards.map((card, index) =>
               <li key={index}>
                   <div className="matched-card-name" id={"matchedCardName" + index}
                        data-testid={"matchedCardName" + index}
                        data={index} tabIndex="0"
                        onClick={(eve) => this.openCardOverlay(index)}>{card.name}</div>
                   <div className="card-overlay" id={"cardOverlay" + index}
                                        data-testid={"cardOverlay" + index}>
                        <div className="close-button" tabIndex="0" data={index}
                             id={"closeCardOverlay" + index}
                             data-testid={"closeCardOverlay" + index}
                             onClick={(eve) => this.closeCardOverlay(index)}>
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

        if (this.props.count === 0)
        {
            message = "No card names were found that matched the search text.";
        }
        else if (this.props.count >= 10)
        {
            message = "The search text matched " + this.props.count +
               " card names. No more than 10 matches will be returned. " + message;
        }
        else if (this.props.count === 1)
        {
            message = "The search text matched " + this.props.count + " card name.  Click on the card name to display the card.";
        }
        else
        {
            message = "The search text matched " + this.props.count + " card names. " + message;
        }

        return (
            <div>
                <div id="search-results" tabIndex="0"
                      data-testid="search-results">{message}</div>
                <ul id="matchedCardList" data-testid="matchedCardList">{cards}</ul>
            </div>
        );
    }
}

export default SearchResults;