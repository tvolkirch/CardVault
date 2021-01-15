import { Component } from "react";

/* This is a mocked version of CardService.js */

class CardService extends Component
{
   constructor()
   {
      super();
   }

   cardApi(urlKey, pattern, nextUrl)
   {
      if (urlKey === "card")
      {
         /* mock the promise as an object with a then() function that returns a response */

         var promise = {};

         promise.then = function(resolve)
         {
            var response = {};
            var data = {};
            var cards = [];

            cards[0] = {};
            cards[0].name = "Mocked Card";
            cards[0].type = "Mocked";
            cards[0].text = "This is mocked data for unit testing.";
            cards[0].set = {};
            cards[0].set.name = "Mocked Set";
            cards[0].imageUrl = "#";

            data.cards = cards;
            data._links = {};
            data._links.next = null;
            data._totalCount = 1;
            data._pageSize = 1;

            response.data = data;

            resolve(response);

            return;
         }

         return promise;
      }

      return null;  /* TODO: create promise for "find" api call? */
   }
}

export default CardService;
