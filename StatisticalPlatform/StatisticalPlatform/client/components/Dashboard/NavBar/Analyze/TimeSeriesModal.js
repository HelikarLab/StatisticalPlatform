import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class TimeSeriesModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      show:false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  onClick = () => {
    this.setState({ showResults: true });
  }

  handleClick = () => {
 		this.props.onClose({showTimeSeries: false});
 		this.props.onClick(this);
 	}

  render() {
    let inst = null;
    const bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

    if (!this.state.showResults) {
      inst = <Button onClick={this.onClick}>i</Button>
    }
    else {
      inst = <p style = {bold_style}>Description:</p>;
    }
    return(
      <div className="modal-container">
        <Modal.Header>
          <Modal.Title id="contained-modal-title">
            Time Series Analysis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inst}
          { this.state.showResults ? <DendogramInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showTimeSeries: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
        </Modal.Footer>
      </div>

    );
  }
}

class DendogramInstruction extends Component{
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">

      <p>{'Input format: The csv file of data should contain a column of rows that determines the time.'}</p>
      <p>{'Input: '} <a href="./data/TimeSeries.csv" target="_blank">{"Sample Data"}</a></p>
      </div>

    );
  }
}
export default TimeSeriesModal;
