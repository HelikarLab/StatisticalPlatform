import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
class HeatmapModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false
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

  render(){
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
            Heatmap
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inst}
          { this.state.showResults ? <HeatmapInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

class HeatmapInstruction extends Component{
  render(){
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Input format: The csv file of data should contain a column of rows.'}</p>
      <p>{'Input: '} <a href="./data/heatmap.csv" target="_blank">{"Sample Data"}</a></p>
      <table style = {style}>
        <tr>
          <td>{'library(stats)'}</td>
        </tr>
        <tr>
          <td>{'heatmap(data)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default HeatmapModal;
