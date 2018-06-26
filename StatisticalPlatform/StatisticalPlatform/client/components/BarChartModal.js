import React, {Component} from 'react';

class BarChartModal extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
      <Modal {...this.props} title="Bar Chart">
        <div className='modal-body'>
          <Input type='checkbox' label='Simple Bar Chart' ref='simple_bool' checked={this.state.simple} onChange={this.simpleHandleChange} />

          <Input type='select' label='Select column' ref='var_x' disabled = {!this.state.simple}>
            {options_list}
          </Input>

          <Input type='checkbox' label='Group Bar Chart' ref='group_bool' checked={this.state.group} onChange={this.groupHandleChange} />

          <Input type='checkbox' label='Stack Bar Chart' ref='stack_bool' checked={this.state.stack} onChange={this.stackHandleChange} />

        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleClick}>Submit</Button>
        </div>
      </Modal>
    );
  }
}

export default BarChartModal;
