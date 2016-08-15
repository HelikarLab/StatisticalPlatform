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
var DCModal = React.createClass({
	render: function() {

		var options_list = [];
		var wololo="enabled";

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input>


						<Row>
							<Col xs={6}>
								<h2>Bar chart</h2>
							</Col>
							<Col xs={6}>
								<h2>Bubble chart</h2>
							</Col>
						</Row>

						<Row>
							<Col xs={6}>
								<Input type='select' label='Variable - X' ref='bar_x' >
									{options_list}
								</Input>
							</Col>
							<Col xs={6}>
								<Input type='select' label='Variable - X' ref='bubble_x' >
									{options_list}
								</Input>
							</Col>
						</Row>

						<Row>
							<Col xs={6}>
								<Input type='select' label='Variable - Y' ref='bar_y' >
									{options_list}
								</Input>
							</Col>
							<Col xs={6}>
								<Input type='select' label='Variable - Y' ref='bubble_y' >
									{options_list}
								</Input>
							</Col>
						</Row>

						<Row>
							<Col xs={6}>
							</Col>
							<Col xs={6}>
								<Input type='select' label='Group' ref='bubble_g' >
									{options_list}
								</Input>
							</Col>
						</Row>

					</Input>
				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>
		);
	},

	handleClick: function() {
		var count = 0;

		Object.keys(this.refs).forEach(function (ref) {
			if(this.refs[ref].props.type == "checkbox" && this.refs[ref].getChecked())
				count++;
		}.bind(this));

		this.props.onRequestHide();
		this.props.onClick(this, count, {
			// TODO - remove bar and bubble entirely
			bar: true,
			bubble: true,
			bar_vars: {x: this.refs.bar_x.getValue(), y: this.refs.bar_y.getValue()},
			bubble_vars: {x: this.refs.bubble_x.getValue(), y: this.refs.bubble_y.getValue(), g: this.refs.bubble_g.getValue()}
		});
	}

})
