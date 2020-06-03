import React from 'react';
import './Timer.css';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  render() {
    return (
      <div className='timer-container'>
        <p className='timer-label' id='timer-label'>
          {this.props.isSession ? 'Session' : 'Break'}
        </p>
        <p className='time-left' id='time-left'>
          {this.props.current}
        </p>
      </div>
    );
  }
};