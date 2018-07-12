import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class HistModal extends Component {
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
		this.props.onClose({showHistogram: false});
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

		this.props.variables.map( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});
    return(
      <div className="modal-container" style={{ height: 400 }}>
          <Modal.Header>
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
            <FormControl componentClass="select" placeholder="select" inputRef={ref => {this.first = ref;}}>
                {options_list}
              </FormControl>
              <ControlLabel>Bins</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => {this.group = ref;}} disabled={this.state.is_group}>
                {options_list}
              </FormControl>
            </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.onClose({showHistogram: false})}}>Close</Button>
            <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
          </Modal.Footer>
      </div>
    );
  }
}

export default HistModal;
