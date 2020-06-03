import React from 'react';
import './BreakLength.css';

export default class BreakLength extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  render() {
    return (
      <div className='break-length-container'>
        <p className='break-label' id='break-label'>
          Break Length
        </p>
        <i className='minus fa fa-arrow-down fa-lg' id='break-decrement' onClick={this.props.handleDecrement} />
        <p className='current' id='break-length'>
          {this.props.current}
        </p>
        <i className='plus fa fa-arrow-up fa-lg' id='break-increment' onClick={this.props.handleIncrement} />
      </div>
    );
  }
};