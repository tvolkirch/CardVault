import React, { Component } from "react";
import axios from "axios";

import Loading from "./Loading";
import Card from "./Card";

import "./VaultContainer.css";

class VaultContainer extends Component
{
    _isMounted = false;

    constructor(props, context)
    {
        super(props, context);

        this.state = {
            loading: false,
            cards: [],
            nextApiCall: "https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20"
        };
        
        // implement infinte scroll with scroll listener and scrollHandler() function to 
        // check for bottom of the scroll window, where it will call the api to load more 
        // cards - the api graciously returns the URL for the next page of cards
        
        var self = this;  // because closure
        var oldPagePosition = 0;
   
        var scrollHandler = function()
        {
            var pageHt = window.innerHeight,
                contentHt = document.body.scrollHeight,
                vScroll = document.body.scrollTop,
                deltaY;
    
            if (vScroll === 0)
            {
                vScroll = document.documentElement.scrollTop;
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
    
        this.callApi();
    }
    
    componentWillUnmount()
    {
        this._isMounted = false;
    }
    
    callApi()
    {
        const apiUrl = this.state.nextApiCall;
    
        axios.get(apiUrl)
            .then(response => {
                if (this._isMounted)
                {
                    const cards = this.state.cards.concat(response.data.cards);
                    const nextApiCall = response.data._links.next;
                    this.setState({ loading: false, cards: cards, nextApiCall: nextApiCall });
                }
            })
    }
    
    render()
    {
        var loader = "";
        
        if (this.state.loading)
        {
            loader = <Loading bottom={200} right={150} />;
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
           <div id="vault-container">{cards}{loader}</div>
        );
    }
}

export default VaultContainer;