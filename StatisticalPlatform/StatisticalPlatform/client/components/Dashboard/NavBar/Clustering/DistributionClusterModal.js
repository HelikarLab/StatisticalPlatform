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

  onClick = () => {
       this.setState({ showResults: true });
  }

  render(){
    const options_list = [];

		this.props.variables.map( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

    let inst = null;
    const bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

		if (!this.state.showResults) {
			inst = <Button onClick={this.onClick}>i</Button>
		}
		else {
			inst = <p style = {bold_style}>Description:</p>;
		}

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
          {inst}
          { this.state.showResults ? <DistributionInstruction /> : null }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.onClose({showDistributionCluster: false})}}>Close</Button>
            <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
          </Modal.Footer>
      </div>
    );
  }
}

class DistributionInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Factor Variable should be a categorical variable and all other varibales should be Numeric type.'}</p>
      </div>
    );
  }
}


export default DistributionClusterModal;
