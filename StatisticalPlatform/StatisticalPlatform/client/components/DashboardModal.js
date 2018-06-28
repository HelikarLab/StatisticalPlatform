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
          <Modal.Header closeButton >
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
        <Modal.Header closeButton >
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
