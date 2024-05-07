import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
   const router = useNavigate()
   const [timer, setTimer] = useState(5)

   useEffect(() => {
      setTimeout(() => {
         router("/")
      }, 5000);
      // eslint-disable-next-line
   }, [])

   setInterval(() => {
      if (timer > 0) {
         setTimer(timer - 1)
      }
   }, 1000);


   return (
      <div>
         <h2>Page Not Found, redirecting you to home page in {timer} sec..</h2>
      </div>
   )
}

export default PageNotFound 