import logo from './logo.svg';
import React from 'react'
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import { Route, Redirect } from 'react-router-dom'


function App() {
  return (
    <div className="App">
        <Header/>
        <div>
          <Route exact path='/' render={ () => <Redirect to="/home"/> } />
          <Route path='/home' render={ () => <Content/> }/>
        </div>
        
    </div>
  );
}

export default App;
