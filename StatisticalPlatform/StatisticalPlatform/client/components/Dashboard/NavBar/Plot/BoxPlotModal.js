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

class BoxPlotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true,
      show : false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClick = () => {
		this.props.onClose({showBoxPlot: false});
		this.props.onClick(
      this,
      this.first.value,
      null,
      this.group.value
    );
	}

	handleChange = () => {
		this.setState({is_group: !this.state.is_group});
	}

  render(){
    const options_list = [];
		const wololo="enabled";

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});
    return(
      <div className="modal-container">
        <Modal.Header>
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Variable</ControlLabel>
          <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.first = ref; }} >
              {options_list}
            </FormControl>
            <br/>
            <ControlLabel>Group</ControlLabel>
          <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.group = ref; }}>
              {options_list}
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showBoxPlot: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
        </Modal.Footer>
      </div>

    );
  }
}

export default BoxPlotModal;
