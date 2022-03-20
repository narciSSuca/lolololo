import React from "react";
import { api } from "../helpers/api";

export const Notes = () => {


    let body1 = {medorgId : 1,phone: 9205106276}
    body1 = new URLSearchParams(Object.entries(body1)).toString(); 

    async function PhoneConfirmation(){
        let temp = await api(
            'https://patient.simplex48.ru/api/Mobile/PhoneConfirmation',
            'POST',
             body1,
            {'Content-Type': 'application/x-www-form-urlencoded'}
        )
        console.log(temp);
    }


    



    let body2 = {medorgId : 1,phone: 9205106276, code: 1330}
    body2 = new URLSearchParams(Object.entries(body2)).toString(); 

    async function CodeConfirmation(){
        let temp = await api(
            'https://patient.simplex48.ru/api/Mobile/CodeConfirmation',
            'POST',
             body2,
            {'Content-Type': 'application/x-www-form-urlencoded'}
        )
    }


    let body3 = {grant_type : 'password',username: 9205106276, password: '3!4683'}
    body3 = new URLSearchParams(Object.entries(body3)).toString();     

    async function GetToken(){
        let temp = await api(
            'https://patient.simplex48.ru/Token',
            'POST',
             body3,
            {'Content-Type': 'application/x-www-form-urlencoded'}
        )
    }



    var urlencoded = new URLSearchParams();
    urlencoded.append("ClinicId", "1");
    urlencoded.append("BranchId", "0");
    urlencoded.append("Barcode", "0");
    urlencoded.append("Patient[Phone]", "9205106276");
    urlencoded.append("Patient[Name]", "Павел");
    urlencoded.append("Patient[Surname]", "Иванченко");
    urlencoded.append("Patient[Patronymic]", "Александрович");
    urlencoded.append("Patient[Birthdate]", "2003-07-12");
    urlencoded.append("Patient[Gender]", "Муж");

    async function Auth(){
        let temp = await api(
            'https://patient.simplex48.ru/api/registration/authorization',
            'POST',
            urlencoded,
            {"Content-Type": "application/x-www-form-urlencoded"}
        )
    }

    async function CheckAuth(){
        let temp = await api(
            'https://patient.simplex48.ru/api/registration/CheckAuthorization',
            'POST',
            new URLSearchParams(Object.entries({GUID:"8f42d3a3-967d-485a-a665-ffee7e85665d"})).toString(),
            {'Content-Type': 'application/x-www-form-urlencoded'}
        )
    }

    CheckAuth();
    return (
        <ul className="list-group">
           adasd
        </ul>
    )
}