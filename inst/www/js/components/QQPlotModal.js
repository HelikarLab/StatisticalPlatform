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
var QQPlotModal = React.createClass({

		getInitialState: function() {
				 return { showResults: false };
		 },
		 onClick: function() {
	        this.setState({ showResults: true });
	    },
	render: function() {

		var options_list = [];
		var inst, bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

		if (!this.state.showResults) {
			inst = <Button onClick={this.onClick}>Description</Button>
		}
		else {
			inst = <p style = {bold_style}>Description:</p>;
		}

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="QQ Plot">

				<div className='modal-body'>
					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>

					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>

					{inst}
					 { this.state.showResults ? <QQPlotInstruction /> : null }

				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this, this.refs.first.getValue(), this.refs.second.getValue());
		}
});

var QQPlotInstruction = React.createClass({
    render: function() {
			var style = {'fontFamily': 'DROID SANS MONO'};

        return (
            <div id="results" className="search-results">
						<table style = {style}>
							<tr>
								<td>{'cor <- qqplot(data$var_x, data$var_y)'}</td>
							</tr>
							<tr>
								<td>{'ss <- smooth.spline(cor$y~cor$x, spar = 1)'}</td>
							</tr>
							<tr>
								<td>{'lines(ss$x, ss$y)'}</td>
							</tr>
						</table>
            </div>
        );
    }
});
