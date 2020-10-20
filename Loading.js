import React from "react";

import "./Loading.css";

function Loading(props)
{
  const top = props.top + "px" || "";
  const left = props.left + "px" || "";
  const bottom = props.bottom + "px" || "";
  const right = props.right + "px" || "";
  
  const spinPosition = { top: top, left: left, bottom: bottom, right: right };

   return (
       <div id="spinner-background" style={spinPosition}>
            <img id="spinner" src="./adoring_fan.png" height="100" 
                    alt="Elder Scrolls Card: Adoring Fan" />
       </div>
   );
}

export default Loading;