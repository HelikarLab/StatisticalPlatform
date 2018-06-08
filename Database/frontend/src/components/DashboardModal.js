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
var DashboardModal = React.createClass({

	render: function() {

		var button_list = [];

		var plotId = getDashboardOptionIds(), plotType = getDashboardOptionType(), plotTime = getDashboardOptionTime();
		var count = plotId.length;

		var button_style = {"width": "100%"}, text_style = {"text-align": "center", "top": "6px"};

		if (count == 0) {
			return (
				<Modal {...this.props} title="Dashboard">
					<div className='modal-body'>

						No analysis done yet!!!

					</div>
					<div className='modal-footer'>
						<Button onClick={this.handleClick}>Submit</Button>
					</div>
				</Modal>
			);
		}

		for(var i = 1; i <= count; i = i + 1){
			button_list.push(
				<Row>
					<Col xs={6}>
						<Button style = {button_style} onClick={this.handleClick.bind(this, plotId[i-1])} value={plotId[i-1]}>{plotType[i-1]}</Button>
					</Col>
					<Col xs={6} style = {text_style}>
						{plotTime[i-1]}
					</Col>
				</Row>
			);
		}

		return (
			<Modal {...this.props} title="Dashboard">
				<div className='modal-body'>
					{button_list}
				</div>
			</Modal>
		);
	},

  handleClick: function(id) {

    this.props.onRequestHide();
		if (id > 0)
			this.props.onClick(this, id);
		else
			this.props.onClick(this);
  }
});
