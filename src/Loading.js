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
<div id="spinner-background" style={spinPosition}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div id="inner-spinner">&nbsp;</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>
   );
}

export default Loading;