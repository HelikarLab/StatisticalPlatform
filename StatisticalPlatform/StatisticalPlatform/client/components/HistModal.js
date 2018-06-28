import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class HistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
		this.props.onRequestHide();
		this.props.onClick(
      this, this.refs.first.getValue(),
      null,
      this.refs.group.getValue()
    );
	}

	handleChange() {

		this.setState({is_group: !this.state.is_group});
	}

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
            <Checkbox value={this.state.is_group} onChange={this.handleChange} inputRef={ref => {this.boolgrp = ref;}} >
      Group
    </Checkbox>

    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Variables</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        {options_list}
      </FormControl>


      <ControlLabel>Bins</ControlLabel>
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

export default HistModal;
