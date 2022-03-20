import React, { Fragment, useEffect } from "react";
import {MyVisitsList} from "../components/MyVizits/MyVisitsList";
import { getCookie,deleteCookie } from "../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const MyVisit= () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('BARCODE') === undefined) {
        navigate("/");
        }
})

    return (
      <Fragment>
        <Navbar />
          <MyVisitsList />
      </Fragment>   
    );
  };



export default MyVisit;