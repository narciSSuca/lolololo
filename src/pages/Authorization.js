import React,{useState, useEffect} from "react";
import { Form } from "../components/Form";
import { Form1 } from "../components/Form1";
import { Form2 } from "../components/Form2";
import { Form3 } from "../components/Form3";
import { Form4 } from "../components/Form4";
import { getCookie, setCookie, deleteCookie } from "../helpers/cookie";
import { useNavigate } from "react-router-dom";

export const Authorization = () => {

    const [isLoggedIn, setisLoggedIn] = useState(0);
    const [userObject, setUserObject] = useState(0);

    const navigate = useNavigate();
    const redirectComponents = (clbObject) => {
        setUserObject(clbObject);
        setisLoggedIn(isLoggedIn + 1);
        console.log(clbObject);
        console.log(process.env)
    }

    if (getCookie('BARCODE') !==undefined) {
        navigate('/home');
    } else {
        if (getCookie('GUID') !== undefined) {
            return (
                <Form4 clbFunction={redirectComponents} clbObject={userObject}/>           
            )
        } else {
    
            switch (isLoggedIn) {
                case 0:
                    return (
                        <Form clbFunction={redirectComponents} clbObject={userObject}/>
                    )
                case 1:
                    
                    return (
                        <Form1 clbFunction={redirectComponents} clbObject={userObject}/>
                    )
                case 2:
                    return (
                        <Form2 clbFunction={redirectComponents} clbObject={userObject}/>
                    )
                case 3:
                    return (
                        <Form3 clbFunction={redirectComponents} clbObject={userObject}/>
                    )
                case 4:  
                    return (
                        <Form4 clbFunction={redirectComponents} clbObject={userObject}/>           
                    )
                default: 
                        return (
                            "произошла ошибка"
                    )
            }
    
        }   
    }    
}


export default Authorization;