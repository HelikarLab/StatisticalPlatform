import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class PlotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(){
    this.props.onRequestHide();
    if (this.refs.boolgrp.getChecked())
      this.props.onClick(
        this, this.refs.first.getValue(),
        this.refs.second.getValue(),
        this.refs.group.getValue()
      );
    else
      this.props.onClick(
        this, this.refs.first.getValue(),
        this.refs.second.getValue(),
        null
      );
  }

  handleChange(){
  
    this.setState({is_group: !this.state.is_group});
  };


  render(){
    const options_list = [];
    const wololo="enabled";

    this.props.variables.forEach( (variable) => {
      options_list.push(<option value={variable}>{variable}</option>);
    });

    return(
      <div className="modal-container" style={{ height: 400 }}>
          <Modal.Header closeButton >
            {/* <button onClick={()=>{this.props.onClose({showLinePlot: false})}}>close</button> */}
            <Modal.Title id="contained-modal-title">
              Choose Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <Checkbox value={this.state.is_group} onChange={this.handleChange} >
      Group
    </Checkbox>

    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Variable - X</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        {options_list}
      </FormControl>

      <ControlLabel>Variable - Y</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        {options_list}
      </FormControl>

      <ControlLabel>Group</ControlLabel>
      <FormControl componentClass="select" placeholder="select" disabled={this.state.is_group}>
        {options_list}
      </FormControl>
    </FormGroup>
  </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClick}>Submit</Button>
          </Modal.Footer>
      </div>

    );
  }
}

export default PlotModal;
