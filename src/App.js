import React from "react";
import {NavBar} from './nav/NavBar'
import {Citation} from "./component/Citation";
import './fonts/Alata-Regular.ttf';
import './fonts.css'

function App() {
  return (
    <div className="App">
      <div className="container py-4">
          {/* Nav */}
          <NavBar/>

          {/* Body */}
          <div className="p-3 mb-4 bg-light rounded-3">
              <Citation format={'Json'} datatype={'json'}/>
          </div>
      </div>
    </div>
  );
}

export default App;
