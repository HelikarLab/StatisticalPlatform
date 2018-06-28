import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ScatterPlotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_straigt: false,
      is_exponential: false,
      is_polynomial: false,
      is_logarithmic: false,
      showResults: false
    };
    this.onClick = this.onClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
  }

  onClick() {
       this.setState({ showResults: true });
  }

  handleClick() {
    this.props.onRequestHide();
    this.props.onClick(
      this, this.refs.first.getValue(),
      this.refs.second.getValue(),
      this.refs.straight.getChecked(),
      this.refs.exponential.getChecked(),
      this.refs.polynomial.getChecked(),
      this.refs.logarithmic.getChecked()
    );
  }

  handleChange1() {
    this.setState({is_straigt: !this.state.is_straigt});
  }

  handleChange2() {
    this.setState({is_exponential: !this.state.is_exponential});
  }

  handleChange3() {
    this.setState({is_polynomial: !this.state.is_polynomial});
  }
  handleChange4() {
    this.setState({is_logarithmic: !this.state.is_logarithmic});
  }

  render(){
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
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Variable - X</ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref='first' >
              {options_list}
            </FormControl>
            <ControlLabel>Variable - Y</ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref='second' >
              {options_list}
            </FormControl>
          </FormGroup>
          <Checkbox  onChange={this.handleChange1} inputRef={ref => {this.straight= ref;}} >
            Straight Trendline
          </Checkbox>
          <Checkbox  onChange={this.handleChange2} inputRef={ref => {this.exponential= ref;}} >
            Exponential Trendline
          </Checkbox>
          <Checkbox  onChange={this.handleChange3} inputRef={ref => {this.polynomial= ref;}} >
            Polynomial Trendline
          </Checkbox>
          <Checkbox  onChange={this.handleChange4} inputRef={ref => {this.logarithmic= ref;}} >
            Logarithmic Trendline
          </Checkbox>
          {inst}
           { this.state.showResults ? <ScatterPlotInstruction /> : null }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}


class ScatterPlotInstruction extends Component {
  render(){
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <table style = {style}>
        <tr>
          <td>{'x <- data$var_x; y <- data$var_y;'}</td>
        </tr>
        <tr>
          <td>{'plot(x, y)'}</td>
        </tr>
        <tr>
          <td>{'fit <- glm(y~x)") # basic straight line of fit'}</td>
        </tr>
        <tr>
          <td>{'co <- coef(fit)'}</td>
        </tr>
        <tr>
          <td>{'abline(fit, col="blue", lwd=2)'}</td>
        </tr>
        <tr>
          <td>{'f <- function(x,a,b) {a * exp(b * x)} # exponential'}</td>
        </tr>
        <tr>
          <td>{'fit <- nls(y ~ f(x,a,b), start = c(a=1, b=1))'}</td>
        </tr>
        <tr>
          <td>{'curve(f(x, a=co[1], b=co[2]), add = TRUE, col="green", lwd=2)'}</td>
        </tr>
        <tr>
          <td>{'f <- function(x,a,b) {a * log(x) + b} # logarithmic'}</td>
        </tr>
        <tr>
          <td>{'fit <- nls(y ~ f(x,a,b), start = c(a=1, b=1))'}</td>
        </tr>
        <tr>
          <td>{'co <- coef(fit)'}</td>
        </tr>
        <tr>
          <td>{'curve(f(x, a=co[1], b=co[2]), add = TRUE, col="orange", lwd=2)'}</td>
        </tr>
        <tr>
          <td>{'f <- function(x,a,b,d) {(a*x^2) + (b*x) + d} # polynomial'}</td>
        </tr>
        <tr>
          <td>{'fit <- nls(y ~ f(x,a,b,d), start = c(a=1, b=1, d=1))'}</td>
        </tr>
        <tr>
          <td>{'co <- coef(fit)'}</td>
        </tr>
        <tr>
          <td>{'curve(f(x, a=co[1], b=co[2], d=co[3]), add = TRUE, col="pink", lwd=2)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default ScatterPlotModal;
