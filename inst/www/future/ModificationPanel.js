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

/*
 *	The panel with the modification buttons
 */

var ModificationPanel = React.createClass({
	handleClick: function(child, buttonType, functionName, propertyName) {
		this.props.onClick(this, buttonType, functionName, propertyName);
	},

	render: function() {
		return (
			<div id="pre-button-div" style={{display: 'none'}}>
				<ColumnModifier onClick={this.handleClick} id="fscale" name="Feature scaling" />
				<DescriptiveViewer onClick={this.handleClick} id="mean" name="Mean" />
				<DescriptiveViewer onClick={this.handleClick} id="median" name="Median" />
				<DescriptiveViewer onClick={this.handleClick} id="mode"	name="Mode"	/>
				<DescriptiveViewer onClick={this.handleClick} id="sd"	name="Standard deviation" />
				<DescriptiveViewer onClick={this.handleClick} id="variance" name="Variance"	/>
				<DescriptiveViewer onClick={this.handleClick} id="skewness" name="Skewness"	/>
				<DescriptiveViewer onClick={this.handleClick} id="kurtosis" name="Kurtosis"	/>
	    	</div>
		);
	}
});
