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
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';

class SVMModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClick = () => {
		this.props.onClose({showSVM: false});
		this.props.onClick(
      this,
      this.formula.value,
      this.kernel.value,
    );
	}

  onClick = () => {
       this.setState({ showResults: true });
  }

  render() {
    const options_list = [];
		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

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
        <Modal.Header >
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsSelect">
            <ControlLabel>Factor Variable</ControlLabel>
          <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.formula = ref; }}>
              {options_list}
            </FormControl>
        <ControlLabel>Kernel</ControlLabel>
      <FormControl componentClass="select" inputRef={ref => { this.kernel = ref; }}>
          <option value='radial'>Radial</option>
        <option value='linear'>Linear</option>
      <option value='polynomial'>Polynomial</option>
        </FormControl>
            </FormGroup>
          </form>
          {inst}
          { this.state.showResults ? <SVMInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showSVM: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

class SVMInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Data Set should have 3 columns out of which one should be a Factor Variable i.e. it should have different categories on the basis of which classification will be done.'}</p>
      </div>
    );
  }
}


export default SVMModal;
