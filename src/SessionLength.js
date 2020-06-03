import React from 'react';
import './SessionLength.css';

export default class SessionLength extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  render() {
    return (
      <div className='session-length-container'>
        <p className='session-label' id='session-label'>
          Session Length
        </p>
        <i className='minus fa fa-arrow-down fa-lg' id='session-decrement' onClick={this.props.handleDecrement} />
        <p className='current' id='session-length'>
          {this.props.current}
        </p>
        <i className='plus fa fa-arrow-up fa-lg' id='session-increment' onClick={this.props.handleIncrement} />
      </div>
    );
  }
};