import React, { useState , useEffect } from "react";
import { getCookie } from "../../helpers/cookie";
import { api } from "../../helpers/api";
import './OneVisit.scss';
import { useParams, useNavigate } from "react-router-dom";
import ModalPayment from "../ModalPayment/ModalPayment";

export const OneVisit = () => {
 const [modalActive, setModalActive] = useState(false);
 const [selectStar, setSelectStar] = useState(0);
 const [starDirty, setStarDirty] = useState(false);
 const [starError, setStarError] = useState();

  let encodeArray = JSON.parse(getCookie("CARDARRAY"));
  let encodeOrder = JSON.parse(getCookie("ORDERARRAY"));
  console.log(encodeOrder);
  let encodeReview = JSON.parse(getCookie("CARDREVIEW"));
  let token = getCookie('token');
  let paramsURL = useParams();
  let textInput = React.createRef();

  console.log(encodeReview);

  const navigate = useNavigate();

  let star = [];

  for (let i = 0; i < 5; ++i) {
    star.push(i+1);
  }

  useEffect(() => {
        let addedTime = document.querySelectorAll('.star-rating');
        addedTime.forEach( div => {
            if (div.id <= selectStar) {
              div.style.color = "green";
            
            }

            if (div.id > selectStar) {
              div.style.color = "#bfbfbf";
            }
            // div.addEventListener('click', ()=>{
            //     let addedDiv = document.querySelectorAll('.time-block');    
            //     addedDiv.forEach(block => {
            //         block.style.backgroundColor =  "#aae6aa";;    
            //     })                
            //     div.style.backgroundColor =  "#9db7e7";
            // })
        })
  }, [selectStar]);

  async function CancelRecord(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let body = {medorgId: 1,barcode: getCookie('BARCODE'), phone: getCookie('PHONEUSER'),recordGUID: encodeArray.internetEntryGUID}
    body = new URLSearchParams(Object.entries(body)).toString();     

    let temp = await api(
        'https://patient.simplex48.ru/api/reception/CancelRecord',
        'POST',
        body,
        myHeaders
      )
      navigate('/visits');  
    
  }
  
  async function SetReview(){
    if (selectStar > 0) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+token);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let body = {medorgId: 1,
                  barcode: getCookie('BARCODE'),
                  phone: getCookie('PHONEUSER'),
                  recordGUID: encodeArray.internetEntryGUID,
                  rating: selectStar,
                  review: textInput.current.value};

      body = new URLSearchParams(Object.entries(body)).toString();     

      let temp = await api(
          'https://patient.simplex48.ru/api/reception/SetReview',
          'POST',
          body,
          myHeaders
        );
      
      navigate('/visits');
    } else {
      setStarError("Поставьте оценку");
    }   
  }
    return ( <>
    <div className="content">
        <div className="title-info">
          <p className="date-visit">{encodeArray.date.split('T')[0]}</p>
          <p className="time-visit">{encodeArray.timeString}</p>
          <p>{encodeArray.branchName}</p>
        </div>

        <div className="worker-info">
          <p><b>{encodeArray.doctorName}</b></p>
          <p>{encodeArray.workerName}</p>
        </div>

        <div className="payment-status">

         <div className="">
            <p>Итого: {encodeArray.sumDiscount}.0 р.</p>

{/* 
            {encodeArray.paymentStatus == true
              ? (<p className="text-try">оплачено - <a href="#">Счёт №{encodeArray.order.orderNumber}</a></p>)
              : (<p className="text-fallse">не оплачено</p>)}
         */}
            {encodeArray.paymentStatus === true /*&& encodeArray.order !== null*/
                          ? ( encodeOrder === null ? 
                              (
                                <div className="payment-block">
                                  <p className="text-try">оплачено</p>
                                </div>
                              ) : (
                                <div className="payment-block">
                                  <p className="text-try">оплачено - <a href="#">Счёт №{encodeOrder.orderNumber}</a> </p>
                                </div>
                              )

                            )
                          
                          : (
                              <div>
                                  <p className="text-fallse"> не оплачено</p>
                              </div>
                            )  
                        }

                        


        </div>
        </div>
        {encodeArray.sum - encodeArray.sumDiscount !== 0
          ? (<p>Cкидка {encodeArray.sum - encodeArray.sumDiscount}</p>)
          : (<></>)}
        <div>

          { typeof encodeArray.paymentStatus === "boolean" && !!!encodeArray.paymentStatus && encodeArray.internetRecordState === 1
            ? (<button onClick={e =>setModalActive(true)} >Оплатить</button>)
            : (<p>  </p>)}
          {paramsURL.array !== "history" && encodeArray.internetRecordState === 1 ? (<button onClick={e => CancelRecord()} className="reset-button">Отменить запись на приём</button>) : ""}

        </div>
        <div>
          <p><b>Услуги:</b></p>
          {encodeArray.services.map(value => (
            <div key={value.$id} className="services-list">
              <p> {value.servName}</p>
              <p> {value.cost}p.</p>
            </div>

          ))}
        </div>
        
        {paramsURL.array == "history" && encodeArray.paymentStatus == true ? (
          <>
            {encodeReview !== null && encodeReview.rating == null && encodeReview.review == null ? ( 
              <div className="rating-content">
                <hr>
                  {/* линия */}
                </hr>  

                <div>

                  <div className="rating-title">
                    <p><b>Оценка посещения:</b></p>
                  </div>

                  <div className="raiting" >   
                  {star.map(value => (
                    <div className="star-rating selected-star" onClick={e=> setSelectStar(e.target.id)} key={value} id={value}>★</div>
                  ))
                  }
                   
                  </div>
                  
                </div>

                <textarea ref={textInput} placeholder="Введите отзыв о посещении" ></textarea>  
                <button onClick={e => SetReview()}>Отправить</button>
             </div>
            ) : (
              <div className="rating-content">
                <hr>
                  {/* линия */}
                </hr>  

                <div>

                  <div className="rating-title">
                    <p><b>Оценка посещения:</b></p>
                  </div>

                  <div className="rating">  
                    {star.map(value => (
                      <div key={value}>
                        {encodeReview !== null && encodeReview.rating >= value ? (
                          <div className=" selected-stars"  key={value} id={value}>★</div>
                        ) : (
                          <div className=" star-rating"  key={value} id={value}>★</div>
                        )}
                        
                      </div>
                    ))
                    }</div>

                </div>
                {encodeReview !== null ? (<p>{encodeReview.review}</p>) : ("")}
                
             </div>
            )} 
          </>
        ) : ("")}
          {paramsURL.array !== "history" ? ( <ModalPayment active={modalActive} setActive={setModalActive}/> ) : ""}
      </div>
      </>
    )
    
  }
export default OneVisit;