import React from "react";

import "./Loading.css";

function Loading(props)
{
  var ctop = props.top || "";
  var cleft = props.left || "";
  var cbottom = props.bottom || "";
  var cright = props.right || "";

  if ( ctop !== "" )
  {
    ctop = ctop + "px";
  }

  if ( cleft !== "" )
  {
    cleft = cleft + "px";
  }

  if ( cbottom !== "" )
  {
    cbottom = cbottom + "px";
  }

  if ( cright !== "" )
  {
    cright = cright + "px";
  }
  
  const spinPosition = { top: ctop, left: cleft, bottom: cbottom, right: cright };

   return (
<div id="spinner-background" style={spinPosition}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div id="inner-spinner">&nbsp;</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>
   );
}

export default Loading;