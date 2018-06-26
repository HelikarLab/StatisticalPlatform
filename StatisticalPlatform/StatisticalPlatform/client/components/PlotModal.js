import React, {Component} from 'react';

class PlotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true
    };
  }

  handleClick(){
    this.props.onRequestHide();
    if (this.refs.boolgrp.getChecked())
      this.props.onClick(
        this, this.refs.first.getValue(),
        this.refs.second.getValue(),
        this.refs.group.getValue()
      );
    else
      this.props.onClick(
        this, this.refs.first.getValue(),
        this.refs.second.getValue(),
        null
      );
  }

  handleChange() {
    this.setState({is_group: !this.state.is_group});
  }


  render(){
    const options_list = [];
    const wololo="enabled";

    this.props.variables.forEach( (variable) => {
      options_list.push(<option value={variable}>{variable}</option>);
    });

    return(
      <Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input type='checkbox' label='Group' ref='boolgrp' onChange={this.handleChange} />
					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>

					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>

					<Input type='select' label='Group' ref='group' disabled={this.state.is_group} >
						{options_list}
					</Input>
				</div>
        <div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>
			</Modal>

    );
  }
}

export default PlotModal;
