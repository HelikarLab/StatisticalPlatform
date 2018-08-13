import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class TestsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClick = () => {
    this.props.onClose({showTest: false});
		this.props.onClick(
      this,
      this.first.value,
      this.second.value,
      this.fn.value
    );
	}

  render(){
    const options_list = [];

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

    return(
      <div className="modal-container">
        <Modal.Header >
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Variable -X</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.first = ref; }}>
                {options_list}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Variable- Y</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.second = ref; }}>
                {options_list}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Functions</ControlLabel>
            <FormControl componentClass="select" inputRef={ref => { this.fn = ref; }} multiple>
              <option value='welch'>Welch t-test</option>
              <option value='student'>Student t-test</option>
              <option value='paired'>Paired student t-test</option>
            </FormControl>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showTest: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default TestsModal;
