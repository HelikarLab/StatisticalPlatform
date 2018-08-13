/*
copyright 2018 Helikar Lab

Developed by Achilles Gasper Rasquinah, Tejasav Khattar, Shubham Kumar, Vinit Ravishankar and Akram Mohammed

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details. You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>
*/

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
    this.props.onClose({showScatterPlot: false});
    this.props.onClick(
      this,
      this.first.value,
      this.second.value,
      this.straight.checked,
      this.exponential.checked,
      this.polynomial.checked,
      this.logarithmic.checked
    );
  }

  handleChange1 = () => {
    this.setState({is_straigt: !this.state.is_straigt});
  }

  handleChange2 = () => {
    this.setState({is_exponential: !this.state.is_exponential});
  }

  handleChange3 = () => {
    this.setState({is_polynomial: !this.state.is_polynomial});
  }
  handleChange4 = () => {
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
        <Modal.Header>
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Variable - X</ControlLabel>
          <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.first = ref; }} >
              {options_list}
            </FormControl>
            <ControlLabel>Variable - Y</ControlLabel>
          <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.second = ref; }} >
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
          <Button onClick={()=>{this.props.onClose({showScatterPlot: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
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
