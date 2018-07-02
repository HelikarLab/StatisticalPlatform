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

class BarChartModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      simple: true,
      group: false,
      stack: false,
      show: false,
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClick = () => {
    this.props.onClose({showBarPlot: false});
    if (this.simple_bool.checked) {
      this.props.onClick(
        this,
        this.simple_bool.checked,
        this.group_bool.checked,
        this.stack_bool.checked,
        this.var_x.value
      );
    }
    else {
      this.props.onClick(
        this,
        this.simple_bool.checked,
        this.group_bool.checked,
        this.stack_bool.checked,
        null
      );
    }
  }

  simpleHandleChange = () => {
    this.setState({simple: true, group: false, stack: false});
  }

  groupHandleChange = () => {
    this.setState({simple: false, group: true, stack: false});
  }

  stackHandleChange = () => {
    this.setState({simple: false, group: false, stack: true});
  }

  render()  {
    const options_list = [];

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
            <form>
              <FormGroup controlId="formControlsSelect">
                <Checkbox checked={this.state.simple} onChange={this.simpleHandleChange} inputRef={ref => {this.simple_bool= ref;}} >
                  Simple Bar Chart
                </Checkbox>
                <ControlLabel>Select Column</ControlLabel>
                <FormControl componentClass="select" placeholder="select" inputRef={ref => {this.var_x= ref;}} disabled = {!this.state.simple}>
                    {options_list}
                </FormControl>
                <Checkbox checked={this.state.group} onChange={this.groupHandleChange} inputRef={ref => {this.group_bool= ref;}} >
                  Group Bar Chart
                </Checkbox>
                <Checkbox  checked={this.state.stack}  onChange={this.stackHandleChange} inputRef={ref => {this.stack_bool= ref;}} >
                  Stack Bar Chart
                </Checkbox>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.onClose({showBarPlot: false})}}>Close</Button>
            <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
          </Modal.Footer>
        </div>
    );
  }
}

export default BarChartModal;
