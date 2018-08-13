import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

class DensityClusterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  onClick = () => {
       this.setState({ showResults: true });
  }

  handleClick = () => {
    this.props.onClose({showDensityCluster: false});
      this.props.onClick(
        this,
        this.first.value,
        this.second.value,
        this.minpts.value,
        this.eps.value
      );
  }


  render() {

    const options_list = [];
		let inst = null;
    const bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

		if (!this.state.showResults) {
			inst = <Button onClick={this.onClick}>i</Button>
		}
		else {
			inst = <p style = {bold_style}>Description:</p>;
		}

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
              <ControlLabel>Variable - X</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.first = ref; }}>
                {options_list}
              </FormControl>
              <br/>
              <ControlLabel>Variable - Y</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.second = ref; }}>
                {options_list}
              </FormControl>
              <br/>
            <ControlLabel>Minimum Points</ControlLabel>
          <input type="number" min={ 0 } className="form-control" ref={ref => this.minpts = ref } />
          <br/>
            <ControlLabel>Epsilon</ControlLabel>
          <input type="number" min={ 0 } className="form-control" ref={ref => this.eps = ref } />
            </FormGroup>
          </form>
          {inst}
					{ this.state.showResults ? <DensityClusteringInstruction/> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showDensityCluster: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}


class DensityClusteringInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Select data with 2 columns'}</p>
    <p>{'Minimum Points: as minimum neighbors to consider a point as core point'}</p>
  <p>{'Epsilon: as neighborhood radius '}</p>
      </div>
    );
  }
}

export default DensityClusterModal;
