import React from 'react';
import {Switch, Route} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navlink from "./components/Navlink";
import Productlist from "./components/Productlist";
import Cart from "./components/Cart/Cart.js";
import Details from "./components/Details";
import Default  from "./components/Default"; 
import Modal from './components/Modal';

function App() {
  return (
    <React.Fragment>
      <Navlink />
      <Switch>
        <Route exact path="/" component={Productlist} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/Cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </React.Fragment>
    // <div className="container">
    //   <div className="row">
    //     <div className="col-6">column Header one</div>
    //     <div className="col-6">
    //       <span>
    //         <i className="fas fa-home" />
    //       </span>
    //     </div>
    //   </div>

    // </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
