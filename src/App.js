import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './Pomodoro';

function App() {
  setViewportSize();

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-And-Logo">
          <h1>The React Pomodoro Clock
            <img src={logo} className="App-logo" alt="logo" />
          </h1>
        </div>
        <Pomodoro></Pomodoro>
        <p className='github'>
          This project's code on<code> GitHub </code>
          <a
            className="App-link"
            href="https://github.com/HansKre/react-pomodoro"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
        </a>
        </p>
      </header>
    </div>
  );
}

export default App;

function setViewportSize() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}
