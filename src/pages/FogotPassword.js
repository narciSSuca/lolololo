import React,{useState, useEffect} from "react";
import { api } from "../helpers/api";
import { useParams, useNavigate } from "react-router-dom";
import { blurHandler } from "../helpers/validations";
import '../components/form.scss';


export const FogotPassword = () => {


    const [code, setCode] = useState();
    const [codeError, setCodeError] = useState('Вы забыли ввести код');
    const [codeDirty, setCodeDirty] = useState(false);

    const [codeConfirm, setCodeConfim] = useState();
    const [password, setPassword] =  useState("");
    const [step, setStep] = useState(1);

    let paramsURL = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        GetCodeToken();
    }, []);

    const passwordHandler = (e) => {
        const re = /\b\d{4}\b/;
        setCode(e.target.value);
        if (!re.test(String(e.target.value).toLocaleLowerCase())){
            setCodeError('Код должен состоять из 4 цифр');
        } else {
            setCodeError("");
        }
        // const re = /^[^а-яё]+$/iu;
        // if (String(textInput.current.value).length === 0){
        //     setPasswordError("Поле должно быть заполнено");
        // } else if (!re.test(String(textInput.current.value).toLocaleLowerCase())) {
        //     setPasswordError('В пароле не должно быть русских букв')
        // } else {
        //     setPasswordError("");
        // }
    }

    async function GetCodeToken(){
        var tokenHeaders = new Headers();
        tokenHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("medorgId", 0);
        urlencoded.append("phone", paramsURL.number);

        let temp = await api(
            'https://patient.simplex48.ru/api/Mobile/ForgotPassword',
            'POST',
            urlencoded,
            tokenHeaders
        )
        if (String(temp['code']).length === 4){
            setCode(temp['code']);
            setCodeError("");
            setCodeDirty(true);
        }
            
    }

    async function GetNewPassword(){
        if(codeDirty && codeError === "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("medorgId", "0");
            urlencoded.append("phone", paramsURL.number);
            urlencoded.append("code", code);

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

           let response = await fetch("https://patient.simplex48.ru/api/Mobile/ConfirmForgotPassword", requestOptions);
           const data = await response.json();
           
           if (data['success'] !== true ) {
                setCodeError("Вы ввели неправильный код");
           } else {
                setCode(data);   
                setPassword(data['password']);
                setStep(2);
           }    
            
           // .then(response => response.text())
            // .then(result => console.log(result))

        }    
    }

    return (
        <div className="container">
        <div className="row">

        <div className="col">
        </div>

        <div className="col-6 form-content">
            
                <div className="form">
                    <h1 className="fogot-title"> Восстановление пароля </h1>
                    {step === 1 ? (
                        <div className="form-group">
                    {(codeDirty && codeError) && <div className="alert alert-danger" role="alert"> <p> {codeError} </p> </div>}
                        <input  type="text" value={code} onChange={e =>passwordHandler(e)} onBlur={e => blurHandler(setCodeDirty)} className="form-control"  placeholder="Введите код из смс"/>                                                      
                        <button onClick={ e=> GetNewPassword()}  type="button" className=" btn-primary ">Продолжить</button>     
                        <div className="help-text">
                          <a href="/">Политика конфидециальности</a> 
                        </div>
                    </div>
                    ) : (
                        <div className="form-group">
                            <p className="">Новый пароль будет выслан вам в смс</p>
                            <p className=""> Для тестов: {password}</p>
                            <button onClick={ e=> navigate('/')}  type="button" className=" btn-primary ">Перейти на страницу авторизации</button>     
                             
                            <div className="help-text">
                                <a href="/">Политика конфидециальности</a> 
                            </div>
                        </div>
                    )}
                    

                </div> 

        </div>

        <div className="col">
        </div>

        </div>
   </div>
 )
}


export default FogotPassword;