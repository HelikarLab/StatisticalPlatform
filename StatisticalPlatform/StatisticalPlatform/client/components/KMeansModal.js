import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
class KMeansModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResults: false
    };
    this.onClick = this.onClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onClick() {
       this.setState({ showResults: true });
  }

  handleClick() {
		const k = this.refs.kvalue.getValue();
		if (k > 0 || parseFloat(k) === k >>> 0) {
			this.props.onRequestHide();
			this.props.onClick(
        this,
        this.refs.first.getValue(),
        this.refs.second.getValue(),
        this.refs.kvalue.getValue()
      );
		}
		else {
			alert("Value of 'K' is a positive integer");
		}
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
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Variable - X</ControlLabel>
              <FormControl componentClass="select" placeholder="select" ref="first">
                {options_list}
              </FormControl>
              <br/>
              <ControlLabel>Variable - Y</ControlLabel>
              <FormControl componentClass="select" placeholder="select" ref="second">
                {options_list}
              </FormControl>
              <br/>
              <ControlLabel>Number of clusters (k)</ControlLabel>
            <NumericInput className="form-control" ref="kvalue"/>
            </FormGroup>
          </form>
          {inst}
					{ this.state.showResults ? <KMeansInstruction /> : null }

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

class KMeansInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Select two columns and k value i.e. number of clusters.'}</p>
      <table style = {style}>
        <tr>
          <td>{'library(ggplot2)'}</td>
        </tr>
        <tr>
          <td>{'ggplot(data, aes(var_x, var_y, color = Species)) + geom_point()'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default KMeansModal;
