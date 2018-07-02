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

class DashboardModal extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (id) {
    this.props.onRequestHide();
		if (id > 0)
			this.props.onClick(this, id);
		else
			this.props.onClick(this);
  }

  render() {

    const button_list = [];

    const plotId = getDashboardOptionIds();
    const plotType = getDashboardOptionType();
    const plotTime = getDashboardOptionTime();
    const count = plotId.length;

    const button_style = {"width": "100%"};
    const text_style = {"text-align": "center", "top": "6px"};

    if (count == 0) {
      return (
        <div className="modal-container" >
          <Modal.Header >
            <Modal.Title id="contained-modal-title">
              Dashboard
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            No Analysis Done Yet
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClick}>Submit</Button>
          </Modal.Footer>
        </div>
      );
    }

    for(var i = 1; i <= count; i = i + 1){
      button_list.push(
        <Row>
          <Col xs={6}>
            <Button style = {button_style} onClick={this.handleClick.bind(this, plotId[i-1])} value={plotId[i-1]}>{plotType[i-1]}</Button>
          </Col>
          <Col xs={6} style = {text_style}>
            {plotTime[i-1]}
          </Col>
        </Row>
      );
    }

    return(
      <div className="modal-container" >
        <Modal.Header >
          <Modal.Title id="contained-modal-title">
            Dashboard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {button_list}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default DashboardModal;
