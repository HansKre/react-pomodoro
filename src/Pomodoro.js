import React from 'react';
import './Pomodoro.css';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import Timer from './Timer';
import Controls from './Controls'

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.DEFAULT_STATE = {
      breakLength: 5,
      sessionLength: 25,
      currentMinutes: 25,
      currentSeconds: 0,
      timerId: undefined,
      isSession: true
    }

    this.state = this.DEFAULT_STATE;

    this.startCountDown = this.startCountDown.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timeString = this.timeString.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.stopCountDown = this.stopCountDown.bind(this);
    this.toggleCountDown = this.toggleCountDown.bind(this);
    this.resetCountDown = this.resetCountDown.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
  }

  timeString() {
    let m = this.state.currentMinutes;
    let s = this.state.currentSeconds;
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    return `${m}:${s}`;
  }

  componentDidMount() {
    this.startCountDown();
  }

  startCountDown() {
    const timerId = setInterval(this.countDown, 1000);
    this.setState({
      timerId: timerId
    });
  }

  countDown() {
    let prevM = this.state.currentMinutes;
    let prevS = this.state.currentSeconds;
    let newM, newS;
    let isSession = this.state.isSession;
    if (prevS > 0) {
      newM = prevM;
      newS = prevS - 1;
    } else {
      if (prevM > 0) {
        newM = prevM - 1;
        newS = 59;
      } else {
        this.audioBeep.play();
        // re-init with ...
        if (isSession) {
          // ...a break
          this.stopCountDown();
          newM = this.state.breakLength;
          newS = 0;
          isSession = false;
          this.startCountDown();
        } else {
          // ... a new session
          this.stopCountDown();
          newM = this.state.sessionLength;
          newS = 0;
          isSession = true;
          this.startCountDown();
        }
      }
    }
    this.setState({
      currentMinutes: newM,
      currentSeconds: newS,
      isSession: isSession
    });
  }

  stopCountDown() {
    clearInterval(this.state.timerId);
    this.setState({
      timerId: undefined
    });
  }

  toggleCountDown() {
    if (this.state.timerId === undefined) {
      this.startCountDown();
    } else {
      this.stopCountDown();
    }
  }

  resetCountDown() {
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.stopCountDown();
    this.setState(this.DEFAULT_STATE);
  }

  incrementBreak() {
    if (this.state.timerId === undefined) {
      if (!this.state.isSession) {
        this.setState(prevState => {
          const newM = prevState.breakLength < 60 ? prevState.breakLength + 1 : prevState.breakLength;
          return {
            breakLength: newM,
            currentMinutes: newM,
            currentSeconds: 0
          };
        });
      } else {
        this.setState(prevState => ({
          breakLength: prevState.breakLength < 60 ? prevState.breakLength + 1 : prevState.breakLength
        }));
      }
    }
  }

  decrementBreak() {
    if (this.state.timerId === undefined) {
      if (!this.state.isSession) {
        this.setState(prevState => {
          const newM = prevState.breakLength > 1 ? prevState.breakLength - 1 : prevState.breakLength;
          return {
            breakLength: newM,
            currentMinutes: newM,
            currentSeconds: 0
          };
        });
      } else {
        this.setState(prevState => ({
          breakLength: prevState.breakLength > 1 ? prevState.breakLength - 1 : prevState.breakLength
        }));
      }
    }
  }

  incrementSession() {
    if (this.state.timerId === undefined) {
      if (this.state.isSession) {
        this.setState(prevState => {
          const newM = prevState.sessionLength < 60 ? prevState.sessionLength + 1 : prevState.sessionLength;
          return {
            sessionLength: newM,
            currentMinutes: newM,
            currentSeconds: 0
          };
        });
      } else {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength < 60 ? prevState.sessionLength + 1 : prevState.sessionLength
        }));
      }
    }
  }

  decrementSession() {
    if (this.state.timerId === undefined) {
      if (this.state.isSession) {
        this.setState(prevState => {
          const newM = prevState.sessionLength > 1 ? prevState.sessionLength - 1 : prevState.sessionLength;
          return {
            sessionLength: newM,
            currentMinutes: newM,
            currentSeconds: 0
          };
        });
      } else {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength > 1 ? prevState.sessionLength - 1 : prevState.sessionLength
        }));
      }
    }
  }

  render() {
    return (
      <div className='pomodoro-grid-container'>
        <BreakLength current={this.state.breakLength} handleIncrement={this.incrementBreak} handleDecrement={this.decrementBreak} ></BreakLength>
        <SessionLength current={this.state.sessionLength} handleIncrement={this.incrementSession} handleDecrement={this.decrementSession} ></SessionLength>
        <Timer isSession={this.state.isSession} current={this.timeString()}></Timer>
        <Controls handleClickStartStop={this.toggleCountDown} handleClickReset={this.resetCountDown}></Controls>
        <audio id='beep' preload='auto' type='audio/mpeg'
          src='http://soundbible.com/mp3/dixie-horn_daniel-simion.mp3'
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>
    );
  }
};