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
var KMeansModal = React.createClass({

	render: function() {

		var options_list = [];

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="Kmeans Clustering">

				<div className='modal-body'>

					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>

					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>

					<Input type="number" label="Number of clusters (k)" ref="kvalue" pattern="[0-9]*" min = "1" step = "1"/>
				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		var k = this.refs.kvalue.getValue();
		if (k > 0 || parseFloat(k) === k >>> 0) {
			this.props.onRequestHide();
			this.props.onClick(this, this.refs.first.getValue(), this.refs.second.getValue(), this.refs.kvalue.getValue());
		}
		else {
			alert("Value of 'K' is a positive integer");
		}
		}
});
