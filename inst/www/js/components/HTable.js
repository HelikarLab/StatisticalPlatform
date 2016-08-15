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
 *	Div for handsontable
 */

var HTable = React.createClass({

	getDefaultProps: function() {
		return {table: null, visible: false, table_id: 0};
	},

	componentDidMount: function() {
		var asc = true;
		if(this.props.table_id === 1) {
			Handsontable.Dom.addEvent(document.getElementById("hot-div" + this.props.table_id), 'click', function (event) {
			    if (event.target.className === 'mod_button') {
			        var data = this.props.table.getData().filter(function (x) {

			        	// magic - check if all keys are null
			        	return !Object.keys(x).every(function (y) { return x[y] === null });

			        });

			        var key = event.target.getAttribute("name");
			        console.log(asc);
			        var sorted = sortByKey(data, key, asc);
			        asc = !asc;
			        this.props.table.loadData(sorted);
			    }
			}.bind(this));
		}
	},

	setHeaders: function(headers) {

		if(this.props.table_id === 1)
		{
			this.props.table.updateSettings({


	            colHeaders: function (col) {
	            	// GHETTO - change later if necessary
	            	// Sets markup of each column header
        	    	return "<b>" + headers[col] + "</b>" + "<button class='mod_button' name='" + headers[col] + "' style='margin-left: 10%;'>\u25BC</button>";
	        	}
	        });
    	}
    	else {
    		this.props.table.updateSettings({
    			colHeaders: headers
    		})
    	}
	},

	setData: function(data) {
		this.props.table.loadData(data);
	},

	displayOff: function() {
		this.props.visible = false;
		React.findDOMNode(this.refs.tempref).style.display = "none";
	},

	displayOn: function() {
		this.props.visible = true;
		React.findDOMNode(this.refs.tempref).style.display = 'block';
	},

	toggleDisplay: function() {
		if(!this.props.visible)
			this.displayOn();
		else
			this.displayOff();
	},

	render: function() {

		return (
			<div id={"hot-div" + this.props.table_id} ref="tempref" style={{width: '1000px', overflow: 'auto', margin: '2% auto'}}></div>
		);
	}
});

function sortByKey(array, key, asc) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if(asc)
        	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
       	else
       		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
