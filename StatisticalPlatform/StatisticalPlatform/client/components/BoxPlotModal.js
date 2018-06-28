import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class BoxPlotModal extends Component {
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
      this,
      this.refs.first.getValue(),
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
      <div className="modal-container">
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Variable</ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref='first' >
              {options_list}
            </FormControl>
            <br/>
            <ControlLabel>Group</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref='var_x'>
              {options_list}
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>

    );
  }
}

export default BoxPlotModal;
