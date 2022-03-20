import React, {useState} from "react";
import { api } from "../helpers/api";
import { getCookie, setCookie, deleteCookie } from "../helpers/cookie";
import { useNavigate } from "react-router-dom";
import './form.scss';

export const Form4 = ({clbFunction,clbObject}) => {

     const [message, setMessage] = useState('Пожалуйтса, подождите. Идёт обработка вашей заявки.'); 
     
     let navigate = useNavigate();
    const [count, setCount] = useState(0);
        async function CheckAuth(){
            let temp = await api(
                'https://patient.simplex48.ru/api/registration/CheckAuthorization',
                'POST',
                new URLSearchParams(Object.entries({GUID:getCookie('GUID')})).toString(),
                {'Content-Type': 'application/x-www-form-urlencoded'}
            )    

            if (typeof temp['Success'] == "undefined") { 
               
            } else {

                // if (temp['Success'] == "true") {
                //     temp['Success'] = new Boolean(true);
                // } else {
                //     temp['Success'] = new Boolean(false);
                // }


                // if (temp['Processed'] == "true") {
                //     temp['Processed']  = new Boolean(true);
                // } else {
                //     temp['Processed']  = new Boolean(false);
                // }

                // setMessage(temp['Message']);

                // console.log(temp['Processed']);
                // console.log(temp['Success']);
                // if ( String(temp.Success) == "true" && String(temp.Processed) == "true") {
                //     setMessage('Ваша заявка отправлена на ручное рассмотрение');

                // } else if ( !!!temp['Success'] && !!!temp['Processed']) {


            //    if (!temp['Success'] && typeof temp['Success'] === "boolean") { 
            //        setMessage('Ваша заявка отправлена на ручное рассмотрение');

            //     } else if (temp['Success'] && typeof temp['Success'] === "boolean") {
            //         setMessage('Ваша заявка одобрена');
            //         deleteCookie('GUID');
            //         setCookie('BARCODE',temp['Clinic']['Barcode'],{});

            //         let body = {medorgId: 1,barcode: getCookie('BARCODE'), phone: getCookie('PHONEUSER')}
            //         body = new URLSearchParams(Object.entries(body)).toString();

            //         let token = getCookie('token');
            //         var myHeaders = new Headers();
            //         myHeaders.append("Authorization", "Bearer "+token);
            //         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            //         let cardPers = await api(
            //             'https://patient.simplex48.ru/api/Mobile/ClientCardInfo',
            //             'POST',
            //             body,
            //             myHeaders
            //         )
            //         setCookie("CARDPERS",JSON.stringify(cardPers),{});
            //         clearTimeout(chechAuthInterval);
            //        // window.location.href = 'https://narcissuca.github.io/#/home';
            //       // window.location.href = 'http://localhost:3000/#/home';
            //     }

              if (temp['Success'] && typeof temp['Success'] == "boolean") {
                 setMessage('Ваша заявка одобрена');
                 deleteCookie('GUID');
                 setCookie('BARCODE',temp['Clinic']['Barcode'],{});

                 let body = {medorgId: 1,barcode: getCookie('BARCODE'), phone: getCookie('PHONEUSER')}
                 body = new URLSearchParams(Object.entries(body)).toString();

                 let token = getCookie('token');
                 var myHeaders = new Headers();
                 myHeaders.append("Authorization", "Bearer "+token);
                 myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                 let cardPers = await api(
                     'https://patient.simplex48.ru/api/Mobile/ClientCardInfo',
                     'POST',
                     body,
                     myHeaders
                 )
                 setCookie("CARDPERS",JSON.stringify(cardPers),{});
                 clearTimeout(chechAuthInterval);
                window.location.href = 'https://narcissuca.github.io/#/home';
              //  window.location.href = 'http://localhost:3000/#/home';
             }

             if (!!!temp['Success'] && !!!temp['Processed']) {
                setCount(1);
                setMessage('Ваша заявка отправлена на ручное рассмотрение');
              }
            }    
        }
        let chechAuthInterval = setInterval(CheckAuth,10000);


    return (
        <div className="container">
            <div className="row">

            <div className="col">
            </div>

            <div className="col-6 form-content">
                
                    <div className="form">
                        <div className="load-form">

                            <div id="floatingCirclesG">
                                <div class="f_circleG" id="frotateG_01"></div>
                                <div class="f_circleG" id="frotateG_02"></div>
                                <div class="f_circleG" id="frotateG_03"></div>
                                <div class="f_circleG" id="frotateG_04"></div>
                                <div class="f_circleG" id="frotateG_05"></div>
                                <div class="f_circleG" id="frotateG_06"></div>
                                <div class="f_circleG" id="frotateG_07"></div>
                                <div class="f_circleG" id="frotateG_08"></div>
                            </div>

                            <div className="load-message">
                                {message}
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