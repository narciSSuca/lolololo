import React, { useState } from "react";
import { api } from "../helpers/api";
import { blurHandler } from "../helpers/validations";
import { setCookie } from "../helpers/cookie";
import './form.scss';

export const Form = ({clbFunction}) => {

    const [phone, setPhone] = useState('');
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [phoneError, setPhoneError] = useState('Номер не может быть пустым');


    const phoneHandler = () => {
        setPhone(textInput.current.value);
        const re = /^\d{10}$/;
       if (String(textInput.current.value).length === 0){
           setPhoneError('Номер не может быть пустым');
        } else if (!re.test(String(textInput.current.value).toLocaleLowerCase())) {
           setPhoneError("Номер введён не коректно");
       } else {
           setPhoneError("");
        }
    }

    let textInput = React.createRef();
    function getSMSCode(event) {
        if(phoneDirty && phoneError ==="") {

           setPhone(textInput.current.value);            
           setCookie('PHONEUSER',textInput.current.value,{});
           let body = {medorgId : 1,phone: textInput.current.value}
            body = new URLSearchParams(Object.entries(body)).toString(); 

            async function PhoneConfirmation(){
                let temp = await api(
                    'https://patient.simplex48.ru/api/Mobile/PhoneConfirmation',
                    'POST',
                    body,
                    {'Content-Type': 'application/x-www-form-urlencoded'}
                )
                let clbObject = {
                    phone: phone,
                    code: temp['code'],
                    password_test: '' 
                    }


                clbFunction(clbObject);
            }
            PhoneConfirmation();        
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

                        {(phoneDirty && phoneError) && <div className="alert alert-danger" role="alert"> <p> {phoneError} </p> </div>}
                        <div className="input-mask">
                            <p>+7</p> 
                            <input value={phone} onChange={e =>phoneHandler(e)} onBlur={e => blurHandler(setPhoneDirty)} type="number" ref={textInput} className="form-control" id="email" placeholder="Введите ваш номер"/>            
                        </div>                                              
                            <button  onClick={getSMSCode} type="button" className=" btn-primary ">Отправить смс на номер</button>     
                            
                            <div className="help-text">
                                <a href="/">Политика конфидециальности</a> 
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