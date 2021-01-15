export function getPressedKeyStatus(eve)
{
   var keyStatus = {};
   var isEnter = false;
   var isSpace = false;
   var isTab = false;
   var pressedKey = "";

   if ( eve.keyCode && !eve.code )
   {
      pressedKey = eve.keyCode;

      if (pressedKey === 13)
      {
         isEnter = true;
      }

      if (pressedKey === 32)
      {
         isSpace = true;
      }

      if (pressedKey === 9)
      {
         isTab = true;
      }
   }

   if ( eve.code )
   {
      pressedKey = eve.code;

      if ( pressedKey.toUpperCase )
      {
         pressedKey = pressedKey.toUpperCase();
      }

      if (pressedKey === "ENTER")
      {
         isEnter = true;
      }

      if (pressedKey === "SPACE")
      {
         isSpace = true;
      }

      if (pressedKey === "TAB")
      {
         isTab = true;
      }
   }

   keyStatus.isEnter = isEnter;
   keyStatus.isSpace = isSpace;
   keyStatus.isTab = isTab;

   return keyStatus;
}