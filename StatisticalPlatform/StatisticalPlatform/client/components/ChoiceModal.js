import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ChoiceModal extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
		this.props.onRequestHide();
		this.props.onClick(
      this,
      this.refs.first.getValue(),
      this.refs.second.getValue()
    );
	}

  render(){
    const options_list = [];
		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});
		const label = 'Variables (' + options_list.length + ')';
    return(
      <div className="modal-container">
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>{label}</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref="first" multiple>
                {options_list}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Functions</ControlLabel>
              <FormControl componentClass="select" ref='second' multiple>
                <option value='mean'>Mean</option>
    						<option value='median'>Beta</option>
    						<option value='sd'>Standard Deviation</option>
    						<option value='variance'>Variance</option>
    						<option value='skewness'>Skewness</option>
    						<option value='kurtosis'>Kurtosis</option>
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

export default ChoiceModal;
