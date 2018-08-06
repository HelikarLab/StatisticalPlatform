import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class DistributionClusterModal extends Component {
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
		this.props.onClose({showDistributionCluster: false});
    this.props.onClick(
      this,
      this.first.value,
    );
	}

  render(){
    const options_list = [];

		this.props.variables.map( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

    return(
      <div className="modal-container">
          <Modal.Header>
            <Modal.Title id="contained-modal-title">
              Choose Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Factor Variable</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => {this.first = ref;}}>
                {options_list}
              </FormControl>
            </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.onClose({showDistributionCluster: false})}}>Close</Button>
            <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
          </Modal.Footer>
      </div>
    );
  }
}

export default DistributionClusterModal;
