import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
class DendogramModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  onClick = () => {
    this.setState({ showResults: true });
  }

  handleClick = () => {
		this.props.onClose({showDendo: false});
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
            Dendogram
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inst}
          {this.state.showResults ? <DendogramInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showDendo: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

class DendogramInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Input format: The csv file of data should contain a column of rows.'}</p>
      <p>{'Input: '} <a href="./data/dendogram.csv" target="_blank">{"Sample Data"}</a></p>
      <table style = {style}>

        <tr>
          <td>{'distance <- dist(data, method = "eucledian")'}</td>
        </tr>
        <tr>
          <td>{'hc <- hclust(distance, method = "complete")'}</td>
        </tr>
        <tr>
          <td>{'plot(hc)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default DendogramModal ;
