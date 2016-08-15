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
var ClassifyModal = React.createClass({

	setText: function (text) {
		document.getElementById("eval").innerHTML = text;
	},

	render: function() {

		var options_list = [];

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="Choose data">
				<div className='modal-body'>

					<Input type='select' label='Output column' ref='vars'>
						{options_list}
					</Input>

					<Input type='text' label='Training set size (%)' ref='tsize' />

					<div id="eval"></div>

					<Button onClick={this.evalClick}>Evaluate</Button>


				    <Input type='file' label='File' ref='file' />

				</div>

		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>

			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		console.log(this.refs.file.getInputDOMNode().files[0]);
		this.props.onClick(this, this.refs.vars.getValue(), this.refs.file.getInputDOMNode().files[0], false);
	},

	evalClick: function() {
		this.props.onClick(this, this.refs.vars.getValue(), null, true, this.refs.tsize.getValue());
	}

});
