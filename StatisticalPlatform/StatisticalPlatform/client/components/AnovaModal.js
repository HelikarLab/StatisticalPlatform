import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class AnovaModal extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onRequestHide();
    this.props.onClick(
      this, this.refs.vars.getValue(),
      this.refs.fn.getValue()
    );
  }

  render(){
    const options_list = [];

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
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Variables</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref="vars" multiple>
                {options_list}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Functions</ControlLabel>
            <FormControl componentClass="select" ref='fn' multiple>
                <option value='anova'>ANOVA</option>
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

export default AnovaModal;
