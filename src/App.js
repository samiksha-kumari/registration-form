import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import RegisterForm from './compoments/Register';

function App() {
  return (
    <BrowserRouter>
  
    
       <Route path = "/" component = {RegisterForm} exact ={true}/>
    </BrowserRouter>
  );
}

export default App;
