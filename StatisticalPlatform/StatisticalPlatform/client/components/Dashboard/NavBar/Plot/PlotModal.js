/*
copyright 2018 Helikar Lab

Developed by Tejasav Khattar, Achilles Gasper Rasquinah, Shubham Kumar, Vinit Ravishankar and Akram Mohammed

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

class PlotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true,
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClick = () => {
    this.props.onClose({showLinePlot: false});
    if (this.boolgrp.checked)
      this.props.onClick(
        this,
        this.first.value,
        this.second.value,
        this.group.value
      );
    else
      this.props.onClick(
        this,
        this.first.value,
        this.second.value,
        null
      );
  }

  handleChange = () => {
    this.setState({is_group: !this.state.is_group});
  };


  render()  {
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
            <form>
            <Checkbox inputRef={ref => { this.boolgrp = ref; }}value={this.state.is_group} onChange={this.handleChange} >
              Group
            </Checkbox>
            <FormGroup controlId="formControlsSelect" >
              <ControlLabel>Variable - X</ControlLabel>
              <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.first = ref; }}>
                {options_list}
              </FormControl>

              <ControlLabel>Variable - Y</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.second = ref; }}>
                {options_list}
              </FormControl>

              <ControlLabel>Group</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.group = ref; }} disabled={this.state.is_group}>
                {options_list}
              </FormControl>
            </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.onClose({showLinePlot: false})}}>Close</Button>
            <Button bsStyle= "success"  onClick={this.handleClick}type="submit">Submit</Button>
          </Modal.Footer>
      </div>

    );
  }
}

export default PlotModal;
