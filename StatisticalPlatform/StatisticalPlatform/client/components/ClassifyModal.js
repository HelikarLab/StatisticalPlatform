import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
class ClassifyModal extends Component {

  constructor(props) {
    super(props);
    this.evalClick = this.evalClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setText = this.setText.bind(this);
  }

  setText(text) {
		document.getElementById("eval").innerHTML = text;
	}

  handleClick() {
		this.props.onRequestHide();
		console.log(this.refs.file.getInputDOMNode().files[0]);
		this.props.onClick(
      this,
      this.refs.vars.getValue(),
      this.refs.file.getInputDOMNode().files[0],
      false
    );
	}

	evalClick() {
		this.props.onClick(
      this,
      this.refs.vars.getValue(),
      null,
      true,
      this.refs.tsize.getValue()
    );
	}


  render() {
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
              <ControlLabel>Output Column</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref="vars">
                {options_list}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsText">
              <ControlLabel>Training set size (%)</ControlLabel>
            <FormControl ref='tsize' type='text' />
            </FormGroup>
            <div id="eval"></div>

					<Button onClick={this.evalClick}>Evaluate</Button>
        <br/> 
      <ControlLabel>File</ControlLabel>
          <input type='file' label='File' ref='file' />



          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>

    );
  }
}

export default ClassifyModal;
