import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class QQPlotModal extends Component {

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
		this.props.onRequestHide();
		this.props.onClick(
      this,
      this.refs.first.getValue(),
      this.refs.second.getValue()
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
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Variable - Y</ControlLabel>
            <FormControl componentClass="select" placeholder="select" ref="second">
                {options_list}
              </FormControl>
            </FormGroup>
          </form>
          {inst}
					 { this.state.showResults ? <QQPlotInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

class QQPlotInstruction extends Component {
  render() {

    const style = {'fontFamily': 'DROID SANS MONO'};

    return(
      <div id="results" className="search-results">
      <table style = {style}>
        <tr>
          <td>{'cor <- qqplot(data$var_x, data$var_y)'}</td>
        </tr>
        <tr>
          <td>{'ss <- smooth.spline(cor$y~cor$x, spar = 1)'}</td>
        </tr>
        <tr>
          <td>{'lines(ss$x, ss$y)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default QQPlotModal;
