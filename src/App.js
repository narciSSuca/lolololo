import React from 'react';
import {HashRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import {MyVisit} from './pages/MyVisit';
import {Me} from './pages/Me';
import {CardVisit} from "./pages/CardVisit";
import {Authorization} from './pages/Authorization';
import {FogotPassword} from './pages/FogotPassword';
import {DocumentDogovor} from './pages/DocumentDogovor';


const App = () => {

    return (
      <HashRouter hashType="hashbang">
         <Routes>
             <Route path={'/'} element={<Authorization/>} />
             <Route path={'/home'} element={<Home/>} />
             <Route path={'/visits'} element={<MyVisit/>} />
             <Route path={'/visit/:meta/:array'} element={<CardVisit/>} /> 
             <Route path={'/me'} element={<Me/>} />
             <Route path={'/fogot/password/:number'} element={<FogotPassword/>}/>
             <Route path={'/document'} element={<DocumentDogovor/>}/>
            </Routes>   
       </HashRouter>
    );    
  }
export default App;
