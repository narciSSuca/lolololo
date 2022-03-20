import React, { useState } from "react";
import { api } from "../helpers/api";
import { blurHandler } from "../helpers/validations";
import { setCookie } from "../helpers/cookie";
import { useNavigate } from "react-router-dom";
import './form.scss';

export const Form2 = ({clbFunction,clbObject}) => {

    if (!clbObject['password_test']) {
        clbObject['password_test'] = '';
    }

    let dirty = false;
    let error = 'Пароль не может быть пустым';

 



    ///////////////////////////////////////////////////////////////////
    /////                                                         /////
    /////       Функции для тестового сервера                     /////
    /////                                                         /////
            if (clbObject['password_test'].length > 0) {
                dirty = true;
                error = '';
            } 
    /////                                                         /////
    /////                                                         /////
    /////                                                         /////    
    /////                                                         /////
    ///////////////////////////////////////////////////////////////////


    
    const [password, setPassword] = useState(clbObject['password_test']);
    const [passwordDirty, setPasswordDirty] = useState(dirty);
    const [passwordError, setPasswordError] = useState(error);
    let textInput = React.createRef();
    const navigate = useNavigate();

    const passwordHandler = () => {
        setPassword(textInput.current.value);
        const re = /^[^а-яё]+$/iu;
        if (String(textInput.current.value).length === 0){
            setPasswordError("Поле должно быть заполнено");
        } else if (!re.test(String(textInput.current.value).toLocaleLowerCase())) {
            setPasswordError('В пароле не должно быть русских букв')
        } else {
            setPasswordError("");
        }
    }

    function getPassword(event) {
        if(passwordDirty && passwordError ==="") {
            setPassword(textInput.current.value);
            setCookie('PASSWORDUSER',password,{});
            let body = {grant_type : 'password',username: clbObject['phone'], password: password}
            body = new URLSearchParams(Object.entries(body)).toString();     
        
            async function GetToken(){
                let temp = await api(
                    'https://patient.simplex48.ru/Token',
                    'POST',
                     body,
                    {'Content-Type': 'application/x-www-form-urlencoded'}
                )
                if (temp['error_description']) {
                    setPasswordError(temp['error_description']);
                } else {
                    setCookie('token', temp['access_token'],{});
                    clbFunction(clbObject);
                }


            }
            GetToken();
            //password);
        }
    }

    return (
        <div className="container">
            <div className="row">

            <div className="col">
            </div>

            <div className="col-6 form-content">
                
                    <div className="form">

                    <div className="logo">
                            <img src="logoClinik.png"/>
                    </div>

                        <div className="form-group">
                        {(passwordDirty && passwordError) && <div className="alert alert-danger" role="alert"> <p> {passwordError} </p> </div>}
                             <p>Для тестов: {password}</p>
                            <input  value={password} onChange={e =>passwordHandler(e)} onBlur={e => blurHandler(setPasswordDirty)} ref={textInput} required type="password" className="form-control" name="password" autocomplete="new-password" placeholder="Пароль от вашей учётной записи"/>                                                      
                          
                            <button onClick={getPassword} type="button" className=" btn-primary ">Продолжить</button>     
                            
                            <div className="help-text">
                                <a href="/">Политика конфидециальности</a> 
                            </div>

                            <div className="help-text">
                                <a  href={`/#/fogot/password/${clbObject['phone']}`} >Смена пароля</a> 
                            </div> 

                        </div>

                    </div> 

            </div>

            <div className="col">
            </div>

            </div>
       </div>
    )
}