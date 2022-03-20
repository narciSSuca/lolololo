import React, {useEffect} from "react";
import { getCookie,deleteCookie } from "../helpers/cookie";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate(); 
    
    function logOut() {
        deleteCookie("BARCODE")
        navigate("/");
    }

    useEffect(() => {
        if (getCookie('BARCODE') === undefined) {
            navigate("/");
            }
    })
         
        return (
        <div className="container ">
                <h1 className="display-4"> Говорила мне мама, не трогай фронтенд</h1>
                <p className="lead">
                    Версия приложения <strong>1.0.4</strong>
                </p>
                <a onClick={logOut} > выйти </a>
                <a href="/#/visits" > мои посещения </a>
        </div>
        )
    
}


export default Home;