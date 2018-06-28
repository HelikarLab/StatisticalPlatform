import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ScatterMatrixModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true
    };
    this.onClick = this.onClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  onClick() {
       this.setState({ showResults: true });
  }
  handleClick(){
		this.props.onRequestHide();
		this.props.onClick(this);
	}
  render()  {
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
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title">
            Scatter Matrix Plot
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inst}
          { this.state.showResults ? <ScatterPlotInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

class ScatterPlotInstruction extends Component{
  render()  {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Input format: In the csv file of data add an extra column with column name as "Groups" which contains group of each data point.'}</p>
      <p>{'Input: '} <a href="./data/ScatterMatrix.csv" target="_blank">{"Sample Data"}</a></p>
      <table style = {style}>

        <tr>
          <td>{'library(graphics)'}</td>
        </tr>
        <tr>
          <td>{'pairs(data)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default ScatterMatrixModal;
