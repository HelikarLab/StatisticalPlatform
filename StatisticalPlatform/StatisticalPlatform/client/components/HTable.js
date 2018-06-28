import React, {Component} from 'react';
import Handsontable from 'handsontable';

const sortByKey = (array, key, asc) => {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if(asc)
        	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
       	else
       		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

class HTable extends Component {

  componentDidMount() {
    let asc = true;
    const mainFunc = event => {
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
    };
    if(this.props.table_id === 1) {
			Handsontable.Dom.addEvent(document.getElementById("hot-div" + this.props.table_id), 'click', mainFunc.bind(this));
		}
  }

  setHeaders() {
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
  }

  setData (data) {
		this.props.table.loadData(data);
	}

	displayOff() {
		this.props.visible = false;
		ReactDOM.findDOMNode(this.refs.tempref).style.display = "none";
	}

	displayOn() {
		this.props.visible = true;
		ReactDOM.findDOMNode(this.refs.tempref).style.display = 'block';
	}

	toggleDisplay() {
		if(!this.props.visible)
			this.displayOn();
		else
			this.displayOff();
	}

  render() {
    return (
      <div id={"hot-div" + this.props.table_id} ref="tempref" style={{width: '1000px', overflow: 'auto', margin: '2% auto'}}></div>
    );
  }
}

HTable.defaultProps = {
  table: null,
  visible: false,
  table_id: 0
}

export default HTable;
