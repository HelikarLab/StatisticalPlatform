/*
copyright 2018 Helikar Lab

Developed by Achilles Gasper Rasquinah, Tejasav Khattar, Shubham Kumar, Vinit Ravishankar and Akram Mohammed

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details. You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>
*/

import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ComatrixModal extends Component {

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
		this.props.onClose({showComatrix: false});
		this.props.onClick(
      this,
      this.comatrix.value
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
        <Modal.Header>
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Choose Analysis</ControlLabel>
            <FormControl componentClass="select" inputRef={ref => { this.comatrix = ref; }} >
              <option value="cor">Correlation Plot</option>
              <option value="cov">Covariance Plot</option>
              </FormControl>
            </FormGroup>
          </form>
          {inst}
					 { this.state.showResults ? <ComatInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showComatrix: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
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
