/*
copyright 2016 Helikar Lab

Developed by Shubham Kumar, Vinit Ravishankar and Akram Mohammed

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details. You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>
*/
var BarChartModal = React.createClass({

	getInitialState: function() {
		return {simple: true,
            group: false,
            stack: false};
	},

	render: function() {

		var options_list = [];

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
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
	},

	handleClick: function() {
		this.props.onRequestHide();
    if (this.refs.simple_bool.getChecked()){
      this.props.onClick(this, this.refs.simple_bool.getChecked(), this.refs.group_bool.getChecked(), this.refs.stack_bool.getChecked(), this.refs.var_x.getValue());
    }
    else {
      this.props.onClick(this, this.refs.simple_bool.getChecked(), this.refs.group_bool.getChecked(), this.refs.stack_bool.getChecked(), null);
    }
	},

	simpleHandleChange: function() {
    this.setState({simple: true, group: false, stack: false});
	},

  groupHandleChange: function() {
    this.setState({simple: false, group: true, stack: false});
	},

  stackHandleChange: function() {
    this.setState({simple: false, group: false, stack: true});
  }
});
