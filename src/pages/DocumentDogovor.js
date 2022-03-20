import React, { Fragment } from "react";
// import OneVisit from "../components/OneVisit/OneVisit";
// import { getCookie } from "../helpers/cookie";
// import { Navbar } from "../components/Navbar";
// import { useParams } from "react-router-dom";

export const DocumentDogovor = () => {
    let wer = localStorage.DOGOVOR;
    // let qwe = localStorage.getItem('DOGOVOR'); 
    // switch (infoCard[1]) {
    //     case "approved":
    //       for (let key in approved) {
    //           for (let valueKey in key) {
    //               if (approved[key]["$id"] === infoCard[0]) {
    //                 //navigate("https://"+document.domain+":3000")
    //               }
    //           }
    //         }
    //     case "history":

    //     case "waiting":
          
    //     default:
    //   }
    

    return (
        <>
        <div dangerouslySetInnerHTML={{__html: wer}} className="dogovor" id="dogovor"></div>
        {/* {wer} */}
        </>       
    )
  }
