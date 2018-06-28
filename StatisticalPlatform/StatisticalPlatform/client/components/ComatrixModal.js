import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ComatrixModal extends Component {

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

  handleClick() {
		this.props.onRequestHide();
		this.props.onClick(
      this,
      this.refs.comatrix.getValue()
    );
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
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Choose Analysis</ControlLabel>
            <FormControl componentClass="select" ref='comatrix' >
              <option value="cor">Correlation Plot</option>
              <option value="cov">Covariance Plot</option>
              </FormControl>
            </FormGroup>
          </form>
          {inst}
					 { this.state.showResults ? <ComatInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

class ComatInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Input format: The csv file of data should contain a column of rows.'}</p>
      <p>{'Input: '} <a href="./data/comatrix.csv">{"Sample Data"}</a></p>
      <table style = {style}>
        <tr>
          <td>{'mat <- cor(data) 	# cov(data)'}</td>
        </tr>
        <tr>
          <td>{'heatmap(mat)'}</td>
        </tr>
      </table>
      </div>

    );
  }
}

export default ComatrixModal;
