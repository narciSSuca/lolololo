import React, {useState} from "react";
import "./modalP.scss";
import { getCookie, setCookie } from "../../helpers/cookie";
import { api } from "../../helpers/api";
import { useNavigate, Link } from "react-router-dom";


export const ModalPayment = ({active,setActive}) => {

    let encodeArray = JSON.parse(getCookie("CARDARRAY"));
    let token = getCookie('token');
    let tempPayment = "";

    const [documentPage, setDocumentPage] = useState('');

    const navigate = useNavigate();

    async function getURL() {
        let userData = JSON.parse(getCookie("USERDATA"));
    
        let paymentHeaders = new Headers();
        paymentHeaders.append("Authorization", "Bearer "+token);
        paymentHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let stringUrl = 'https://narcissuca.github.io/#/home';

        let paymentBody = {medorgId: 1,
                          barcode: getCookie('BARCODE'),
                          phone: getCookie('PHONEUSER'),
                          surname: userData.surname,
                          name: userData.name,
                          patronimic: userData.patronymic,
                          bornDate: userData.bornDate,
                          sex: userData.sex,
                          sourceType: 2,
                          recordGUID: encodeArray.internetEntryGUID,
                          returnLink: stringUrl}
                          
       paymentBody = new URLSearchParams(Object.entries(paymentBody)).toString();     
          
        tempPayment = await api(
            'https://patient.simplex48.ru/api/reception/CreateOrder',
            'POST',
            paymentBody,
            paymentHeaders
        )
        //setDocumentPage(tempPayment.document.content.split('</html>')[0]);
        // setDocumentPage(tempPayment.document.content);
        setCookie('paymentUrl', tempPayment.order.paymentURL, {});
        localStorage.setItem('DOGOVOR', tempPayment.document.content.split('</html>')[0]);
      }

    getURL();  

    function getPaymentURL() {
        // localStorage.setItem('DOGOVOR', tempPayment.document.content.split('</html>')[0]);
        window.location.href = tempPayment.order.paymentUrl;
        // console.log(documentPage);
    }     

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content new-size" onClick={e => e.stopPropagation()}>
                <p>Оригинал договора нужно будет подписать и получить в регистратуре медицинского центра</p>
                <p><Link to="chart" target="_blank" to="/document" >ознакоититься с договором по данной ссылкой</Link></p>
                <p>
                    Для получения подробной информации о правилах оплаты пройдетите по ссылке: 
                    <a href="https://mhk-lipetsk.ru/page/uslovija_oplati_i_vozvrata_sredstv">https://mhk-lipetsk.ru/page/uslovija_oplati_i_vozvrata_sredstv</a>
                </p>
                {/* <iframe src="javascript:parent.documentPage" height="100px" width="100px"> */}
                    {/* <div dangerouslySetInnerHTML={{__html: documentPage}} className="dogovor" id="dogovor"></div> */}
                {/* </iframe> */}
                <p></p>
                <button onClick={e=> getPaymentURL()}>Продолжить оплату</button>
                <button className="cancel-button" onClick={e => setActive(false)} >Вернуться</button>
               
            </div>
        </div>
    )
    
}


export default ModalPayment;