import React from 'react';
import './Controls.css';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current
    }
  }

  render() {
    return (
      <div className='controls-container'>
        <div id='start_stop'>
          <i className="fa fa-play fa-2x" onClick={this.props.handleClickStartStop} />
          <i className="fa fa-pause fa-2x" onClick={this.props.handleClickStartStop} />
        </div>
        <i className="fa fa-refresh fa-2x" id='reset' onClick={this.props.handleClickReset} />
      </div>
    );
  }
};