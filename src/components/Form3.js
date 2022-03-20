import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blurHandler } from "../helpers/validations";
import { api } from "../helpers/api";

import { getCookie, setCookie } from "../helpers/cookie";
import './form.scss';

export const Form3 = ({clbFunction,clbObject}) => {

    const [name, setName] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState('Введите имя');
    let nameInput = React.createRef();

    const [surname, setSurname] = useState('');
    const [surnameDirty, setSurnameDirty] = useState(false);
    const [surnameError, setSurnameError] = useState('Введите фамилию');
    let surnameInput = React.createRef();

    const [patronymic, setPatronymic] = useState('');
    const [patronymicDirty, setPatronymicDirty] = useState(false);
    const [patronymicError, setPatronymicError] = useState('Ведите отчество');
    let patronymicInput = React.createRef();    

    const [gender, setGender] = useState('Муж');
    const [styleFemale, setStyleFemale] = useState('text-gender female');
    const [styleMale, setStyleMale] = useState('text-gender male activ-gender');
    const [checked, setChecked] = useState();

    const [dataBirthday, setdataBirthday] = useState('');
    const [dataBirthdayDirty, setdataBirthdayDirty] = useState(false);
    const [dataBirthdayError, setdataBirthdayError] = useState('Введите дату');
    let dataBirthdayInput = React.createRef();    


    let navigate = useNavigate();


    const paramHandler = (newParam,setParam, setParamError) => {
        setParam(newParam);
        const re = /^[а-яА-ЯёЁ]*$/;
        if (!re.test(String(newParam).toLocaleLowerCase())){
            setParamError('Поле должно содержать только русские буквы');
        } else if (!newParam){
            setParamError('Поле должно быть заполнено');       
        } else {
            setParamError('');
        }
    }

    const dataBirthdayHandler = () => {
        if (dataBirthdayInput.current.value) {
            setdataBirthday(dataBirthdayInput.current.value);
            setdataBirthdayError(false);
        }
    }   

    function genderSetM(event) {
        setStyleFemale('text-gender female');
        setStyleMale('text-gender male  activ-gender');
        setGender('Муж');
    }

    function genderSetF(event) {
        setStyleFemale('text-gender female activ-gender');
        setStyleMale('text-gender male');
        setGender('Жен');
    }

    function chengeCheckbox() {
        setChecked(!checked);
    }
    
    async function getClbObj(event) {
        if (dataBirthdayInput.current.value && !nameError && !surnameError && !patronymicError) {            
        var paymentHeaders = new Headers();
        let token = getCookie('token');
        paymentHeaders.append("Authorization", "Bearer "+token);
        paymentHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("ClinicId", "1");
            urlencoded.append("BranchId", "0");
            urlencoded.append("Barcode", "0");
            urlencoded.append("Patient[Phone]", clbObject['phone']);
            urlencoded.append("Patient[Name]", name);
            urlencoded.append("Patient[Surname]", surname);
            urlencoded.append("Patient[Patronymic]", patronymic);
            urlencoded.append("Patient[Birthdate]", dataBirthday);
            urlencoded.append("Patient[Gender]", gender);

            let userData = {
                name: name,
                surname: surname,
                patronymic: patronymic,
                bornDate: dataBirthday,
                sex: gender
            }

            async function Auth(){
                
                let temp = await api(
                    'https://patient.simplex48.ru/api/registration/authorization',
                    'POST',
                    urlencoded,
                    paymentHeaders
                )
                
                clbObject['GUID'] = temp['ActionGUID'];
                setCookie('GUID',temp['ActionGUID'],{});
                setCookie("USERDATA",JSON.stringify(userData),{});  
                clbFunction(clbObject);
        
            }
            Auth();   
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
                        {(surnameDirty && surnameError) && <div className="alert alert-danger" role="alert"> <p> {surnameError} </p> </div>}
                            <input value={surname} onBlur={e => blurHandler(setSurnameDirty)}  onChange={e =>paramHandler(surnameInput.current.value ,setSurname, setSurnameError)} ref={surnameInput} type="text" required className="form-control" placeholder="Фамилия"/>       
                        {(nameDirty && nameError) && <div className="alert alert-danger" role="alert"> <p> {nameError} </p> </div>}                                               
                            <input value={name} onBlur={e => blurHandler(setNameDirty)}  onChange={e =>paramHandler(nameInput.current.value ,setName, setNameError)} ref={nameInput} type="text" required className="form-control" placeholder="Имя"/>    
                        {(patronymicDirty && patronymicError) && <div className="alert alert-danger" role="alert"> <p> {patronymicError} </p> </div>}
                            <input value={patronymic} onBlur={e => blurHandler(setPatronymicDirty)}  onChange={e =>paramHandler(patronymicInput.current.value ,setPatronymic, setPatronymicError)} ref={patronymicInput} type="text" required className="form-control" placeholder="Отчество"/>       
                            
                            <div className="dop-info">
                            {(dataBirthdayDirty && dataBirthdayError) && <div className="alert alert-danger" role="alert"> <p> {dataBirthdayError} </p> </div>}
                                        
                                <input value={dataBirthday} 
                                    onChange={e =>dataBirthdayHandler()}  
                                    type="date" 
                                    onBlur={e => blurHandler(setdataBirthdayDirty)} 
                                    ref={dataBirthdayInput} 
                                    className="form-control date-box"/>

                                <div className="gender">  
                                    <div onClick={genderSetM}  className={styleMale}> <p> Муж.</p> </div>
                                    <div onClick={genderSetF} className={styleFemale}> <p>Жен.</p> </div>
                                </div>
                                
                            </div>

                            <div className="checkbox-block">
                                <input type="checkbox" required checked={checked} onChange={chengeCheckbox} className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label">Согласен на обработку <a href="/">персональных данных</a></label>
                            </div>
                            
                            {checked === true 
                                ? (<button onClick={e=>getClbObj()} type="button" className=" btn-primary ">Отправить заявку</button>)
                                : ( <a href="/"></a>)
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