import React, { Component } from "react";

import CardService from "./api/CardService";
import Loading from "./Loading";
import Card from "./Card";

import { getPressedKeyStatus } from "./lib/EventManager";

import "./VaultContainer.css";

class VaultContainer extends Component
{
    _isMounted = false;

    constructor(props, context)
    {
        super(props, context);

        this.state = {
            loading: true,
            cards: [],
            nextApiCall: null
        };

        this.topOfPage = React.createRef();

        /* implement infinite scroll with scroll listener and scrollHandler() function to
           check for bottom of the scroll window, where it will call the api to load more
           cards - the public api graciously returns the URL for the next page of cards
         */
        
        var self = this;  // because closure
        var oldPagePosition = 0;

        var scrollHandler = function()
        {
            var screenHeight = window.screen.height,
                pageHt = window.innerHeight,
                contentHt = document.body.scrollHeight,
                vScroll = document.body.scrollTop,
                deltaY;
    
            if (vScroll === 0)
            {
                vScroll = document.documentElement.scrollTop;
            }

            if (self.topOfPage && self.topOfPage.current)
            {
                if (vScroll > screenHeight)
                {
                    self.topOfPage.current.style.visibility = "visible";
                }
                else
                {
                    self.topOfPage.current.style.visibility = "hidden";
                }
            }

            // set distance from the bottom of the page to trigger data loading
            
            deltaY = contentHt - pageHt - 20;
          
            // scrolled within range of the bottom to trigger another content load
            
            if ( vScroll > deltaY )  
            {
                // help minimize multiple content loadings
                
                if ( vScroll !== oldPagePosition )  
                {
                    self.setState( {loading: true} );
                        
                    setTimeout( function()  
                    {
                        self.callApi();
                    }, 500);
                    
                    oldPagePosition = vScroll;
                }
            }
        };
       
        var scrollTimer;
             
        document.addEventListener("scroll", 
            function() 
            {
                // limit scroll listener to a half second so it doesn't fire too often
                
                if (scrollTimer) 
                {
                    window.clearTimeout(scrollTimer);
                }
             
                scrollTimer = window.setTimeout(scrollHandler, 500);
            }
        );
    }

    componentDidMount()
    {
        this._isMounted = true;

        if (this.topOfPage && this.topOfPage.current)
        {
            this.topOfPage.current.addEventListener("click", this.handleTopOfPageEvent);
            this.topOfPage.current.addEventListener("keydown", this.handleTopOfPageEvent);
        }

        this.callApi();
    }
    
    componentWillUnmount()
    {
        this._isMounted = false;

        if (this.topOfPage && this.topOfPage.current)
        {
            this.topOfPage.current.removeEventListener("click", this.handleTopOfPageEvent);
            this.topOfPage.current.removeEventListener("keydown", this.handleTopOfPageEvent);
        }
    }
    
    handleTopOfPageEvent = (eve) =>
    {
        const documentElement = document.documentElement;
        const bodyTag = document.body;

        if (eve.type === "click")
        {
            documentElement.scrollTop = 0;
            bodyTag.scrollTop = 0;
        }
        else if (eve.type === "keydown")
        {
            let keyChecker = getPressedKeyStatus(eve);

            if ( keyChecker.isEnter || keyChecker.isSpace )
            {
               eve.target.click();
            }
        }
    }

    callApi()
    {
        const cardService = new CardService();
        var nextApiCall = this.state.nextApiCall;
        var cards = [];
        var cardsPromise;

        if (nextApiCall)
        {
           cardsPromise = cardService.cardApi("card", "", nextApiCall);
        }
        else
        {
           cardsPromise = cardService.cardApi("card");
        }

        if (cardsPromise !== {})
        {
           cardsPromise.then(response =>
           {
              cards = this.state.cards.concat(response.data.cards);
              nextApiCall = response.data._links.next;

              this.setState({ loading: false, cards: cards, nextApiCall: nextApiCall });
           });
        }
        else
        {
           this.setState({ loading: false, cards: cards, nextApiCall: null });
        }
    }
    
    render()
    {
        var loader = "";

        if (this.state.loading)
        {
            loader = <Loading bottom={100} right={25} />;
        }

        const cards = this.state.cards.map((card, index) =>
              <Card key={index} 
                 url={card.imageUrl}
                 name={card.name}
                 type={card.type}
                 set={card.set.name}
                 rules={card.text}/>
        );
        
        return (
           <div id="vault-container">{cards}{loader}
               <div id="top-of-page" tabindex="0" ref={this.topOfPage}>&#8679;</div>
           </div>
        );
    }
}

export default VaultContainer;