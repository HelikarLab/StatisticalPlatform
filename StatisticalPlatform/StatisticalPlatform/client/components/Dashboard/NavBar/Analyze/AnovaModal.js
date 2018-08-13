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

class AnovaModal extends Component {

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
    this.props.onClose({showAnova: false});
    this.props.onClick(
      this,
      this.vars.value,
      this.fn.value
    )
  }

  render()  {
    const options_list = [];

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

    return(
      <div className="modal-container">
        <Modal.Header  >
          <Modal.Title id="contained-modal-title">
            Choose Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Variables</ControlLabel>
            <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.vars = ref; }} multiple>
                {options_list}
              </FormControl>
              <ControlLabel>Functions</ControlLabel>
            <FormControl componentClass="select" inputRef={ref => { this.fn = ref; }} multiple>
                <option value='anova'>ANOVA</option>
              </FormControl>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.onClose({showAnova: false})}}>Close</Button>
          <Button bsStyle= "success"  onClick={this.handleClick} type="submit">Submit</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default AnovaModal;
