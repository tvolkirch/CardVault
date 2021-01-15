import { Component } from "react";
import axios from "axios";

/*
 * CardService.js
 *
 * Performs a wildcard search of cards by name.
 * Returns a set maximum number of cards but still gives the total number
 * of cards that match the search text.
 */

class CardService extends Component
{
   urlMap = new Map();

   constructor()
   {
      super();

      this.urlMap.set("find", "https://api.elderscrollslegends.io/v1/cards?pageSize=10&name=");
      this.urlMap.set("card", "https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20");
   }

   cardApi(urlKey, pattern, nextUrl)
   {
      var url = this.urlMap.get(urlKey);
      var response = {};

      if (url)
      {
         if (urlKey === "find")
         {
            pattern = encodeURI(pattern);
            url += pattern;
         }

         if (urlKey === "card")
         {
            if (nextUrl)
            {
               url = nextUrl;
            }
         }

         /* returns a promise that is handled by the calling function */

         return axios.get(url);
      }

      return response;
   }
}

export default CardService;