import React, {Component} from 'react';

class HistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true
    };
  }

  handleClick() {
		this.props.onRequestHide();
		this.props.onClick(
      this, this.refs.first.getValue(),
      null,
      this.refs.group.getValue()
    );
	}

	handleChange() {
		this.setState({is_group: !this.state.is_group});
	}

  render(){
    const options_list = [];
		const wololo="enabled";

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});
    return(
      <Modal {...this.props} title="Choose data">
        <div className='modal-body'>

          <Input type='checkbox' label='Group' ref='boolgrp' onChange={this.handleChange} />
          <Input type='select' label='Variable' ref='first'>
            {options_list}
          </Input>

          <Input type='text' label='Bins' ref='group' disabled={this.state.is_group} />
        </div>
            <div className='modal-footer'>
              <Button onClick={this.handleClick}>Submit</Button>
            </div>
      </Modal>

    );
  }
}

export default HistModal;
