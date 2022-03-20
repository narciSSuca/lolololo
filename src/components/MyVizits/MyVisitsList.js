import React, { useState, useEffect} from "react";
import { getCookie, setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { api } from "../../helpers/api";
import './MyVisit.scss';
import {ModalCreateRecord} from "../ModalCreateRecord/ModalCreateRecord";

export const MyVisitsList = () => {
  const [approved, setApproved] = useState([]);
  const [history, setHistory] = useState([]);
  const [waiting, setWaiting] = useState([]);    
  const [modalActive, setModalActive] = useState(false);
  const [specialization, setSpecialization] = useState([]);
  const navigate = useNavigate();

  let star = [];

  for (let i = 0; i < 5; ++i) {
    star.push(i+1);
  }

    function boxClick(e) {
      let infoCard = e.target.id.split(".");

      switch (infoCard[1]) {
        case "approved": 
          for (let key in approved) {
            for (let valueKey in key) {
              if (approved[key]["$id"] === infoCard[0]) {
                setCookie("ORDERARRAY",JSON.stringify(approved[key].order),{});
                let card = JSON.stringify(approved[key]);
                let newCard = JSON.parse(card);   
                delete newCard.order;
                console.log(newCard);
                console.log(approved[key]);   
                setCookie("CARDARRAY",JSON.stringify(newCard),{});
                navigate(`/visit/${infoCard[0]}/${infoCard[1]}`);
              }
            }
          }
        case "history":
          for (let key in history) {
            for (let valueKey in key) {
              if (history[key]["$id"] === infoCard[0]) {
                let review = history[key]['review'];
                delete history[key].review;
                // setCookie("ORDERARRAY",JSON.stringify(approved[key].order),{});
                setCookie("CARDREVIEW",JSON.stringify(review),{});
                setCookie("CARDARRAY",JSON.stringify(history[key]),{});  

                navigate(`/visit/${infoCard[0]}/${infoCard[1]}`);
              }
            }
          }

        case "waiting":
          for (let key in waiting) {
            for (let valueKey in key) {
              if (waiting[key]["$id"] === infoCard[0]) {
                setCookie("CARDARRAY",JSON.stringify(waiting[key]),{});  
                navigate(`/visit/${infoCard[0]}/${infoCard[1]}`);
              }
            }
          }
          
        default:
      }
    }

    async function GetSpecialization(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      let temp = await api(
          `https://patient.simplex48.ru/api/Web/allspec/1`,
          'GET',
          {'Content-Type': 'application/x-www-form-urlencoded'}
      )
      setSpecialization(temp);
      setModalActive(true);
    }

    useEffect(() => {
      const abortController = new AbortController();
      const {signal} = abortController;
      
      const apiCall = async path => {
        try {
          let token = getCookie('token');
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer "+token);
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
          
          var urlencoded = new URLSearchParams();
          urlencoded.append("medorgId", "1");
          urlencoded.append("BranchId", "1");
          urlencoded.append("barcode", getCookie('BARCODE'));
          urlencoded.append("phone", getCookie('PHONEUSER'));

          const request = await fetch(path, {
            method: 'POST',
            body: urlencoded,
            headers: myHeaders});

          const response = await request.json();
          console.log(response);
          setApproved(response['approved']);
          setHistory(response['history']);
          
          setWaiting(response['waiting']);

        } catch (e) {
          if (!signal?.aborted) {
            console.error(e);
          }
        }
      };
  
      apiCall('https://patient.simplex48.ru/api/reception/UserRecords/');

      return () => {
        abortController.abort();
      };
    }, [setApproved, setWaiting, setHistory]);
    
    return (
      <>
      <div className="card-list">
        <button className="add-visit" onClick={e=> GetSpecialization()} >Записаться на приём</button>
        <div className="card-visit">
          <div className="title-visit"><b>Ожидающие подтверждения</b></div>
            <div className="cards">
          {waiting.map(article=> (
              <div className="card" key={article.$id}  id={article.$id+".waiting"} onClick={boxClick} >      
                <div className="card-noef">
                  <div className="card-date">
                      <p className="date-visit">{article.date.split('T')[0]}</p>
                      <p  className="time-visit">{article.timeString}</p>
                      <p>{article.branchName}</p>
                  </div>
                  <p><b>{article.doctorName}</b></p>
                  <p>{article.workerName}</p>
                  
                    {article.paymentStatus === true 
                      ? (<div className="payment-block">  
                            <p>Итого: {article.sumDiscount}.0 ₽.</p>
                            {article.internetRecordState === 1
                            ?(<p className="text-try">оплачено</p>)
                            :(<p className="text-try"> оплачено | ОТМЕНЕННО</p>)}
                        </div>)
                      
                      : (<div>
                            <p>Итого: {article.sumDiscount}.0 ₽.</p>
                            {article.internetRecordState === 3
                            ?(<p className="text-fallse"> не оплачено | ОТМЕНЕННО</p>)
                            :( 
                              <div><p className="text-fallse"> не оплачено</p>
                                  <button >оплатить</button>
                              </div>)}
                        </div>)  
                    }
                  </div>  
              </div>               
            ))}
            </div>
          </div>
        {/* <div className="card-visit">
          <div className="title-visit"><b>Ожидающие подтверждения</b></div>
          <div className="cards">
          {waiting.map(article=> (
                <div key={article.$id} className="card" id={article.$id} >      
                  <div>
                      <p>{article.branchName}</p>
                      <p>{article.date.split('T')[0]}</p>
                  </div>
                  
                  <p>{article.workerName}</p>
                  <p><b>{article.doctorName}</b></p>
                  <p>Итого: {article.sumDiscount}.0 р.</p>
                </div>
            ))}
          </div>
        </div> */}

        <div className="card-visit">
          <div className="title-visit"><b>Предстоящие посещения</b></div>
          <div className="cards">
          {approved.map(article=> (
              <div key={article.$id} className="card"  id={article.$id+".approved"} onClick={boxClick} >      
                <div className="card-noef">
                  <div className="card-date">
                      <p className="date-visit">{article.date.split('T')[0]}</p>
                      <p  className="time-visit">{article.timeString}</p>
                      <p>{article.branchName}</p>
                  </div>
                  <p><b>{article.doctorName}</b></p>
                
                    
                  <p>{article.workerName}</p>
                  
                    {article.paymentStatus === true 
                      ? (<div className="payment-block">  
                            <p>Итого: {article.sumDiscount}.0 ₽.</p>
                            {article.internetRecordState === 1
                            ?(<p className="text-try">оплачено</p>)
                            :(<p className="text-try"> оплачено | ОТМЕНЕННО</p>)}
                        </div>)
                      
                      : (<div> 
                            <p>Итого: {article.sumDiscount}.0 ₽.</p>
                            {article.internetRecordState === 3
                            ?(<p className="text-fallse"> не оплачено | ОТМЕНЕННО</p>)
                            :( 
                              <div><p className="text-fallse"> не оплачено</p>
                                  <button >оплатить</button>
                              </div>)}
                        </div>)  
                    }
                  </div>  
              </div>               
            ))}
          </div>
        </div>

        <div className="card-visit">
          <div className="title-visit"><b>История посещения</b></div>
          <div className="cards">
          {history.map(article=> (
            <div key={article.$id} className="card"  id={article.$id+".history"} onClick={boxClick} >      
              <div className="card-noef">     
                <div className="card-date">
                    <p className="date-visit">{article.date.split('T')[0]}</p>
                    <p  className="time-visit">{article.timeString}</p>
                    <p>{article.branchName}</p>
                </div>
                <p><b>{article.doctorName}</b></p>
               
                  
                <p>{article.workerName}</p>
                  <div className="payment-block">  
                          <p>Итого: {article.sumDiscount}.0 ₽.</p>
                           <p className="text-try">оплачено</p>
                  </div>
                  <hr></hr>
                  {/* <div className="ra"> */}
                  {article.review !== null && article.review.rating !== null ? (
                    <div className="rating">  
                      {star.map(value => (
                        <div key={value}>
                          {article.review.rating >= value ? (
                            <div className=" selected-stars"  key={value} id={value}>★</div>
                          ) : (
                            <div className=" star-rating"  key={value} id={value}>★</div>
                          )}
                          
                        </div>
                      ))
                      }</div> ) : ("")}
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
          <ModalCreateRecord  active={modalActive} setActive={setModalActive} specialization={specialization}/>
      </>); 
  };



export default MyVisitsList;