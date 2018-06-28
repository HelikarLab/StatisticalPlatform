import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class BivariateModal extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
		this.props.onRequestHide();
		this.props.onClick(
      this,
      this.refs.first.getValue(),
      this.refs.second.getValue(),
      this.refs.fn.getValue()
    );
	}
  render(){
    const options_list = [];

    this.props.variables.forEach( (variable) => {
      options_list.push(<option value={variable}>{variable}</option>);
    });

    const label_x = 'Variable - X (' + options_list.length + ')';
    const label_y = 'Variable - Y (' + options_list.length + ')';

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
              <ControlLabel>{label_x}</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref="first" multiple>
                {options_list}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>{label_y}</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref="second" multiple>
                {options_list}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Functions</ControlLabel>
            <FormControl componentClass="select" ref='fn' multiple>
                <option value='cov'>Covariance</option>
                <option value='cor'>Correlation</option>
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

export default BivariateModal;
