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
var TimeSeriesModal = React.createClass({

	getInitialState: function() {
			 return { showResults: false };
	 },
	 onClick: function() {
        this.setState({ showResults: true });
    },
	render: function() {

		var inst, bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

		if (!this.state.showResults) {
			inst = <Button onClick={this.onClick}>i</Button>
		}
		else {
			inst = <p style = {bold_style}>Description:</p>;
		}


		return (
			<Modal {...this.props} title="Time Series Analysis">

				<div className='modal-body'>
				{inst}
				 { this.state.showResults ? <DendogramInstruction /> : null }
				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this);
		}
});

var DendogramInstruction = React.createClass({
    render: function() {
			var style = {'fontFamily': 'DROID SANS MONO'};

        return (
            <div id="results" className="search-results">

						<p>{'Input format: The csv file of data should contain a column of rows that determines the time.'}</p>
						<p>{'Input: '} <a href="./data/TimeSeries.csv" target="_blank">{"Sample Data"}</a></p>
            </div>
        );
    }
});
