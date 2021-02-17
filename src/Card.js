import React from "react";

import "./Card.css";

function Card(props)
{    
   return (
      <div className="flex-card-wrapper">
         <div className="card-content" tabIndex="0">
            <img className="card-image" src={props.url}
               alt={"Elder Scrolls Card: " + props.name}/>
         </div>
         <div className="card-content card-text" data={props.index} tabIndex="0">
               <div className="card-name">{props.name}</div>
               <div>
                  <div className="flex-card-row">
                     <span className="left-column">Type:</span>
                     <span className="right-column">{props.type}</span>
                  </div>
                  <div className="flex-card-row">
                     <span className="left-column">Set:</span>
                     <span className="right-column">{props.set}</span>
                  </div>
               </div>
               <div className="card-rules">{props.rules}</div>
         </div>
      </div>
   );
}

export default Card;