import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class QQPlotModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      show: false
    };
  }

  onClick = () => {
    this.setState({ showResults: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClick = () => {
    this.props.onClose({showQQ: false});
		this.props.onClick(
      this,
      this.first.value,
      this.second.value
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
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Variable - Y</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.second = ref; }}>
                {options_list}
              </FormControl>
            </FormGroup>
          </form>
          {inst}
					 { this.state.showResults ? <QQPlotInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showQQ: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
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
