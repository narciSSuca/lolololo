import React, { useState, useEffect } from "react";
import { api } from "../helpers/api";
import { blurHandler } from "../helpers/validations";
import './form.scss';

export const Form1 = ({clbFunction,clbObject}) => {

    if (!clbObject['code']) {
        clbObject['code'] = '';
    }

    let dirty = false;
    let error = 'Код должен состоять из 4 цифр';

 
    ///////////////////////////////////////////////////////////////////
    /////                                                         /////
    /////       Функции для тестового сервера                     /////
    /////                                                         /////
            if (clbObject['code'].toString().length === 4) {
                dirty = true;
                error = '';
            } 
    /////                                                         /////
    /////                                                         /////
    /////                                                         /////    
    /////                                                         /////
    ///////////////////////////////////////////////////////////////////


    const [seconds, setSeconds ] = useState(10);
    const [timerActive, setTimerActive ] = useState(true);
    const [code, setCode] = useState(clbObject['code']);
    const [codeDirty, setCodeDirty] = useState(dirty);
    const [codeError, setCodeError] = useState(error);
    let textInput = React.createRef();

    const codeHandler = () => {
        const re = /\b\d{4}\b/;
        setCode(textInput.current.value);
        if (!re.test(String(textInput.current.value).toLocaleLowerCase())){
            setCodeError('Код должен состоять из 4 цифр');
        } else {
            setCodeError("");
        }

    }

    function getCode(event) {
        if(codeDirty && codeError ==="") {
            setCode(textInput.current.value);
            let body = {medorgId : 1,phone: clbObject['phone'], code: code}
            body = new URLSearchParams(Object.entries(body)).toString(); 
        
            async function CodeConfirmation(){
                let temp = await api(
                    'https://patient.simplex48.ru/api/Mobile/CodeConfirmation',
                    'POST',
                     body,
                    {'Content-Type': 'application/x-www-form-urlencoded'}
                )

                if (temp['status'] !== undefined || temp['password_test'] !== undefined) {
                    let newClbObject = {
                        phone: clbObject['phone'],
                        code: clbObject['code'],
                        password_test: temp['password_test'] 
                        }
                    clbFunction(newClbObject);
                } else {
                    setCodeError('Неверный код из смс')
                }
            }
            CodeConfirmation();
        }
    }

    function resetCode(e) {
        setSeconds(10);
        setTimerActive(true);
    }

    useEffect(() => {
      if (seconds > 0 && timerActive) {
        setTimeout(setSeconds, 1000, seconds-1);
      } else {
        setTimerActive(false);
      }
    }, [ seconds, timerActive ]);



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
                        {(codeDirty && codeError) && <div className="alert alert-danger" role="alert"> <p> {codeError} </p> </div>}
                            <input value={code} onChange={e =>codeHandler(e)} onBlur={e => blurHandler(setCodeDirty)} ref={textInput} type="number" className="form-control" id="email" placeholder="Введите код из смс"/>                                                      
                           
                            <button onClick={getCode} type="button" className=" btn-primary ">Продолжить</button>     
                            {seconds === 0 
                            ? <div  className="button-sms" onClick={resetCode} >Отправить смс повторно</div>
                            : <div  className="button-sms button-off"> Отправить смс повторно через {seconds}</div>
                            }
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