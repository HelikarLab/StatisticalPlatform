import React, {Component} from 'react';
import Handsontable from 'handsontable';
import ReactDOM from 'react-dom';

class HTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  setProps = obj => {
    const newProps = {...this.props ,...obj };
    this.props = newProps;
    this.forceUpdate();
  }


  componentDidMount () {
    const callback = (event) => {
        if (event.target.className === 'mod_button') {

            var data = this.props.table.getData().filter( (x) => {
              console.log("getting data");

              // magic - check if all keys are null
              return !Object.keys(x).every( (y) => { return x[y] === null });

            });

            var key = event.target.getAttribute("name");
            console.log(asc);
            var sorted = sortByKey(data, key, asc);
            asc = !asc;
            console.log(sorted);
            this.props.table.loadData(sorted);
        }
    }


		var asc = true;
		if(this.props.table_id === 1) {
      console.log("id" + this.props.table_id);
			Handsontable.dom.addEvent(document.getElementById("hot-div" + this.props.table_id), 'click', callback.bind(this));
		}
	}


  setHeaders = (headers) => {
		if(this.props.table_id === 1) {
			this.props.table.updateSettings( {

	            colHeaders(col) {
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

  setData = (data) => {
		this.props.table.loadData(data);
	}

	displayOff = () => {
    this.setState({visible: false});
    ReactDOM.findDOMNode(this.tempref).style.display = "none";
	}

	displayOn = () => {
    this.setState({visible: true});
    ReactDOM.findDOMNode(this.tempref).style.display = 'block';
	}

	toggleDisplay = () => {
		if(!this.state.visible)
			this.displayOn();
		else
			this.displayOff();
	}
  render() {

    console.log(this.props);
    return(
      <div id={"hot-div" + this.props.table_id} ref= {ref => this.tempref = ref} style={{width: '1000px', overflow: 'auto', margin: '2% auto'}}></div>
    );
  }
}

HTable.defaultProps = {
  table: null,
  table_id: 0
};

const sortByKey = (array, key, asc) => {
  return array.sort( (a, b) => {
    const x = a[key];
    const y = b[key];
    if(asc)
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    else
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}

export default HTable;
