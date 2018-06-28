import React, {Component} from 'react';
import {Button, Modal, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class BarChartModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      simple: true,
      group: false,
      stack: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.simpleHandleChange = this.simpleHandleChange.bind(this);
    this.groupHandleChange = this.groupHandleChange.bind(this);
    this.stackHandleChange = this.stackHandleChange.bind(this);
  }

  handleClick(){
    this.props.onRequestHide();
    if (this.refs.simple_bool.getChecked()){
      this.props.onClick(this, this.refs.simple_bool.getChecked(),
      this.refs.group_bool.getChecked(), this.refs.stack_bool.getChecked(),
      this.refs.var_x.getValue());
    }
    else {
      this.props.onClick(this, this.refs.simple_bool.getChecked(),
      this.refs.group_bool.getChecked(),
      this.refs.stack_bool.getChecked(), null);
    }
  }

  simpleHandleChange(){
    this.setState({simple: true, group: false, stack: false});
  }

  groupHandleChange() {
    this.setState({simple: false, group: true, stack: false});
  }

  stackHandleChange() {
    this.setState({simple: false, group: false, stack: true});
}
  render(){
    const options_list = [];

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
              <Checkbox checked={this.state.simple} onChange={this.simpleHandleChange} inputRef={ref => {this.simple_bool= ref;}} >
                Simple Bar Chart
              </Checkbox>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select Column</ControlLabel>
                <FormControl componentClass="select" placeholder="select" ref='var_x' disabled = {!this.state.simple}>
                  {options_list}
                </FormControl>
              </FormGroup>
              <Checkbox checked={this.state.group} onChange={this.groupHandleChange} inputRef={ref => {this.group_bool= ref;}} >
                Group Bar Chart
              </Checkbox>
              <Checkbox  checked={this.state.stack}  onChange={this.stackHandleChange} inputRef={ref => {this.stack_bool= ref;}} >
                Stack Bar Chart
              </Checkbox>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClick}>Submit</Button>
          </Modal.Footer>
        </div>
    );
  }
}

export default BarChartModal;
