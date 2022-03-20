import React, { Fragment } from "react";
import OneVisit from "../components/OneVisit/OneVisit";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";

export const CardVisit= () => {
    
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
      <Fragment>
          <Navbar />
          <OneVisit />
      </Fragment>
    );
  };



export default CardVisit;