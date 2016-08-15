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
var BoxPlotModal = React.createClass({

	getInitialState: function() {
		return {is_group: true};
	},

	render: function() {

		var options_list = [];
		var wololo="enabled";

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input type='select' label='Variable' ref='first'>
						{options_list}
					</Input>
					<Input type='select' label='Group' ref='group'>
						{options_list}
					</Input>
					<Input type="text" label="X-axis name (optional)" ref='x_name' />
					<Input type="text" label="Y-axis name (optional)" ref='y_name' />

				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this, this.refs.first.getValue(), null, this.refs.group.getValue(), this.refs.x_name.getValue(), this.refs.y_name.getValue());
	},

	handleChange: function() {
		this.setState({is_group: !this.state.is_group});
	}
});
