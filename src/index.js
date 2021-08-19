import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import logo from './logo.svg';

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <div className="space-y-16">
      <header className="flex flex-col items-center space-y-4">
        <img src={logo} alt="AlterClass" height={32} className="logo" />
        <h1 className="capitalize text-center">
          Today's cryptocurrency prices by market cap
        </h1>
      </header>
      <App />
    </div>
  </StrictMode>,
  rootElement
);
