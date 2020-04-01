import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// var script = document.createElement("script");
// script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
// script.setAttribute("id", "MathJax-script");
// document.head.appendChild(script);

// window.MathJax = {
//   loader: { load: ["input/asciimath"] },
//   startup: {},
//   tex: {
//     inlineMath: [["$", "$"], ["\\(", "\\)"]],
//     processEscapes: true,
//   },
// };


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
