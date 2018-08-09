import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Handsontable from 'handsontable';
import $ from 'jquery';
import MyBar from './NavBar/MyBar';
import HTable from './HTable';
import Papa from 'papaparse';

class WholeThing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: "",
      data: [],
      path: "",
      variables: [],
      cluster: false,
      plot_type: "",
      data_table: null,
      uni_table: null,
      bi_table: null,
      test_table: null,
      anova_table: null,
      classify_table: null,
      data_table: null,
      plot: false,
      showTable: false,
      multi: true,
      plot_count: 4,
      visiblehandler: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getIndex = (table, str) => {
    var headers = table.getColHeader();
    for(var i = 0; i < headers.length; i++) {
      if(headers[i].indexOf(str) > -1) {
        return i;
      }
    }
  }

  getSanitizedData = (table, column) => {
      var preColArr = table.getDataAtCol(column).map( (elem) => {
          return parseInt(elem);
      });

      preColArr = preColArr.filter(  (elem) => {
          return !isNaN(elem);
      });

      return preColArr;
  }

  Column = (preCol) => {

      var i;

      this.preCol = preCol;
      this.sortedCol = preCol;
      this.sortedCol.sort();
      this.mean = this.preCol.reduce( (a, b) => { return a + b; }, 0) / this.preCol.length;
      this.median = 0;	// init

      var length = this.preCol.length - 1;
      if(length % 2 === 0) {
        this.median = this.sortedCol[length / 2];
      }
      else {
        var low = this.sortedCol[(length - 1) / 2];
        var high = this.sortedCol[(length + 1) / 2];
        this.median = (low + high) / 2;
      }

      this.getCentralMoment = (n) => {
        var sum = 0;
        for (i = 0; i < this.preCol.length; i++) {
          var temp = Math.pow(this.preCol[i] - this.mean, n);
            sum += temp;
          }
          return sum / (this.preCol.length - 1);
      }

      this.subtractMean = () => {
          var sum = [];
          this.preCol.forEach( call.bind(this));
          return sum;
      }

      this.variance = this.getCentralMoment(2);
      this.sd = Math.sqrt(this.variance);


      this.skewness = this.getCentralMoment(3) / Math.pow(this.sd, 3);
      this.kurtosis = this.getCentralMoment(4) / Math.pow(this.sd, 4);

      // apply function by name
      this.applyFunction = (functionName) => {
          return this[functionName]();
      };

      this.getProperty = (functionName) => {
        return this[functionName];
      }

      this.getLength = () => {
        return this.preCol.length;
      }

      // Feature scaling
      this.fscale =  () => {
          var min = Math.min.apply(null, this.preCol);
          var max = Math.max.apply(null, this.preCol);
          return this.preCol.map(  (elem) => {
              return (elem - min) / (max - min);
          });
      };
  }

  componentDidMount () {

    let container = null;
    let table = null;

    // Data table
		container = ReactDOM.findDOMNode(this.data_ref);
	  table = new Handsontable(container, {

	        colHeaders: true,
	        minSpareRows: 1,
	        contextMenu: true,
	        stretchH: "all",
	        manualColumnResize: true,
	        height: 500
    	});

		this.setState({data_table: table}, console.log("hey" + this.state.data_table) );
		this.data_ref.displayOff();

    // Univariate table
		container = ReactDOM.findDOMNode(this.uni_ref);
		table = new Handsontable(container, {
			colHeaders: true,
			minSpareRows: 0,
			contextMenu: false,
			stretchH: "all",
			startCols: 2,
			manualColumnResize: true,
		});

		this.setState({uni_table: table}, console.log("hey1" + this.state.data_table));
		this.uni_ref.displayOff();

		// Bivariate table
		container = ReactDOM.findDOMNode(this.bi_ref);
		table = new Handsontable(container, {
			colHeaders: true,
			minSpareRows: 0,
			contextMenu: false,
			stretchH: "all",
			startCols: 2,
			manualColumnResize: true
		});

		this.setState({bi_table: table});
		this.bi_ref.displayOff();

		// Tests table
		container = ReactDOM.findDOMNode(this.test_ref);
		table = new Handsontable(container, {
			colHeaders: true,
			minSpareRows: 0,
			contextMenu: false,
			stretchH: "all",
			startCols: 2,
			manualColumnResize: true
		});

		this.setState({test_table: table});
		this.test_ref.displayOff();

		// ANOVA table
		container = ReactDOM.findDOMNode(this.anova_ref);
		table = new Handsontable(container, {
			colHeaders: true,
			minSpareRows: 0,
			contextMenu: false,
			stretchH: "all",
			startCols: 2,
			manualColumnResize: true
		});

		this.setState({anova_table: table});
		this.anova_ref.displayOff();

		// Classify table
		container = ReactDOM.findDOMNode(this.classify_ref);
		table = new Handsontable(container, {
			colHeaders: true,
			minSpareRows: 0,
			contextMenu: false,
			stretchH: "all",
			startCols: 2,
			manualColumnResize: true
		});

		this.setState({classify_table: table});
		this.classify_ref.displayOff();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
		/*
		 *	Upload and plot are both including here because both are async calls
		 */
		// State is updated with a new file on clicking upload
		if(this.state.file !== prevState.file)
		{
			// read.csv
      ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R");

      const fourthCallBack = obj => {
      var i;
      var choices = [];
      for (i = 0; i < obj.length; i++) {
        let k = i;
	  		choices.push({name: obj[k], axis: "x"});
	  		choices.push({name: obj[k], axis: "y"});
	    	}
	      this.setState({data: choices});
		  };

      const thirdCallback = fieldsession => {
        fieldsession.getObject(fourthCallBack.bind(this));
      };

      const secondCallback = (out) => {
        var headers = Object.keys(out[0]);
        this.setState({variables: headers});
        this.data_ref.setHeaders(headers);
        this.data_ref.displayOn();
        this.data_ref.setData(out);

        // colnames
        ocpu.seturl("//public.opencpu.org/ocpu/library/base/R");

        var variableRequest = ocpu.call("colnames", {
          x: new ocpu.Snippet("data.frame(jsonlite::fromJSON('" + JSON.stringify(out) + "'))")
        },thirdCallback.bind(this));
      }

      const firstCallback =   (session) => {
        session.getObject(secondCallback.bind(this));
      }

		  // upload
		  const uploadRequest = ocpu.call("read.csv", {
		      "file": this.state.file,
		      "check.names": new ocpu.Snippet("FALSE")
		  }, firstCallback.bind(this))
}


    // Plot graph
    if(this.state.plot) {
    	makePlot(this);
      this.setState({plot: false});
    }

    if(this.state.cluster) {
    	// clusters and minpts are the same
    	var bundle = {clusters: this.state.clusters, eps: this.state.eps, table: this.state.data_table, vars: {x: this.state.var_x, y: this.state.var_y}};

    	if(this.state.cluster_type === "kmeans")
    		kmeansCluster(bundle);

    	else if(this.state.cluster_type === "hierarchical")
    		hierarchicalCluster(bundle);

    	else
    		densityCluster(bundle);

				this.setState({cluster: false});
	    }

	    if(this.state.classify) {

	    	var bundle = {classify_var: this.state.classify_var, table: this.state.data_table, file: this.state.classify_file, ratio: this.state.classify_ratio, classify_type: this.state.classify_type};
	    	//naiveBayesClassify(bundle);
	    	if(this.state.classify_eval)
		    	evaluate(bundle, this.top_bar);
		    else {
		    	naiveBayesClassify(bundle, this.classify_ref);
		    }
	    }

}

handleClick (buttonType, functionName, propertyName, plotType) {
  // map function names to actual names
 const {data_table} = this.state;
 console.log("in handle click",data_table)
  const fn_names = {
    "mean": "Mean",
    "median": "Median",
    "sd": "Standard Deviation",
    "variance": "Variance",
    "skewness": "Skewness",
    "kurtosis": "Kurtosis",
    "cov": "Covariance",
    "cor": "Correlation"
  }
  switch(buttonType) {
    /*
     *	Load file
     */
    case "submit":
      const myFile = $("#invis-file")[0].files[0];
      this.setState({file: myFile});
      break;

    /*input URL*/
    case "url":
      let plot_type = arguments[1];
      const url = arguments[2];
      this.setState({multi: false, plot: true});
      this.setState({plot_type: plot_type, url: url});

      $.ajax({
        url: url,
        type: 'GET',
        dataType: "json",
        success: getUrlData
      });

      const getUrlData = (data) => {
        let dataJSON = JSON.stringify(data);
        alert(dataJSON);
      }
      break;

      /*
       *	Toggle table visibility
       */

      case "show-table":

        if(this.data_ref != null)
          this.data_ref.toggleDisplay();
        break;

      case "export-table":
        table = this.state.data_table;
        dataJSON = JSON.stringify(table.getData());
        const dataCSV = Papa.unparse(dataJSON);
        const csvString = dataCSV;
        const a         = document.createElement('a');
        a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
        a.target      = '_blank';
        a.download    = 'data.csv';
        document.body.appendChild(a);
        a.click();
      break;

    case "initDashboard":
      const id = arguments[2];
      this.data_ref = null;

      let plotId = getDashboardOptionIds();
      let plotType = getDashboardOptionType();
      let plotData = getDashboardOptionData();

      plotId = plotId[id-1];
      plotType = plotType[plotId-1];
      plotData = plotData[plotId-1];
      plotDashboard(plotType, plotData);
      break;

    case "kmeans":
      plot_type = arguments[1];
      let var_x = arguments[3];
      let var_y = arguments[4];
      const kvalue = arguments[5];
      this.setState({multi: false, plot: true, visiblehandler: false});
      this.setState({plot_type: plot_type, var_x: var_x, var_y: var_y, kvalue: kvalue});
      break;

    case "qq":
      plot_type = arguments[1];
      var_x = arguments[3];
      var_y = arguments[4];
      this.setState({multi: false, plot: true, visiblehandler: false});
      this.setState({plot_type: plot_type, var_x: var_x, var_y: var_y});
      break;

    /*choose correlation or covariance matrix*/
    case "comatrix":
      constplot_type = arguments[1];
      const comatrix = arguments[2];
      this.setState({multi: false, plot: true, visiblehandler: false});
      this.setState({plot_type: plot_type, comatrix: comatrix});
      break;

    case "barChart":
      plot_type = arguments[1];
      const simple_bool = arguments[2];
      const group_bool = arguments[3];
      const stack_bool = arguments[4];
      var_x = arguments[5];
      this.setState({multi: false, plot: true, visiblehandler: false});
      this.setState({plot_type: plot_type, simple_bool: simple_bool, group_bool: group_bool, stack_bool: stack_bool, var_x: var_x});
      break;

    case "scatterPlot":
      plot_type = arguments[1];
      var_x = arguments[2];
      var_y = arguments[3];
      const straight_bool = arguments[4];
      const exponential_bool = arguments[5];
      const polynomial_bool = arguments[6];
      const logarithmic_bool = arguments[7];
      this.setState({multi: false, plot: true, visiblehandler: false});
      this.setState({plot_type: plot_type, var_x: var_x, var_y: var_y, straight_bool: straight_bool, exponential_bool: exponential_bool, polynomial_bool, polynomial_bool, logarithmic_bool: logarithmic_bool});
      break;

    case "regressionPlot":
      plot_type = arguments[1];
      var_x = arguments[3];
      const vars = arguments[4];
      this.setState({multi: false, plot: true, visiblehandler: false});
      this.setState({plot_type: plot_type, var_x: var_x, vars: vars});
      break;

    case "densityplot":
      plot_type = arguments[1];
      var_x = arguments[3];
      this.setState({plot: true, visiblehandler: true});
      this.setState({plot_type: plot_type, var_x: var_x});
      break;

    case "densitybasedclustering":
        plot_type = arguments[1];
        var_x = arguments[3];
        var_y = arguments[4];
        let minpts = arguments[5];
        let eps = arguments[6];
        this.setState({ plot: true, visiblehandler: true});
        this.setState({plot_type: plot_type, var_x: var_x, var_y: var_y, minpts: minpts, eps: eps});
        break;

    case "pcaplot":
        plot_type = arguments[1];
        var_x = arguments[3];
        this.setState({plot: true, visiblehandler: true});
        this.setState({plot_type: plot_type, var_x: var_x});
        break;

    case "distributionplot":
      plot_type = arguments[1];
      var_x = arguments[3];
      this.setState({ plot: true, visiblehandler: true});
      this.setState({plot_type: plot_type, var_x: var_x});
      break;

    case "svmclassification":
      plot_type = arguments[1];
      let formula  = arguments[3];
      let kernel  = arguments[4];
      this.setState({plot: true, visiblehandler: true});
      this.setState({plot_type: plot_type, formula: formula, kernel: kernel});
      break;

    /*
     *	Display descriptive stats table
     */

    case "stats":
      let table = this.state.data_table;
      const uni_table = this.state.uni_table;

      const variable = arguments[1];
      const variables = [variable];
      let functions1 = arguments[2];
      let functions =[functions1]

      let table_data = [];
      variables.unshift("Function");

      this.uni_ref.setHeaders(variables);
      this.uni_ref.displayOn();

      let columns = [];
      variables.map( (vars) => {
        columns.push(this.getIndex(table, vars));
      });

      columns = columns.filter( (elem) => {
        return elem !== undefined;
      });

      for(let i = 0; i < functions.length; i++) {
        uni_table.setDataAtCell(i, 0, fn_names[functions[i]]);
      }

      functions.map( (fn, f_ind) => {
        let row = [];
        row.push(fn);
        columns.map( (column, c_ind) => {

          let preColArr = this.getSanitizedData(table, column);

              console.log("hi this is precol" + preColArr);

              preColArr = [preColArr];
              console.log("hi this is precol new " + preColArr);
              const out = this[fn];
              uni_table.setDataAtCell(f_ind, c_ind + 1, out);
        });
        table_data.push(row);
      });

      // do this for automatic resizing
      break;

    /*
     *	Bivariate stats
     */

    case "bivariate":
      table = this.state.data_table;
      const bi_table = this.state.bi_table;

      data = [];

      let label_1 = arguments[1];
      let label_2 = arguments[2];
      functions = arguments[3];
      let col_1 = this.getSanitizedData(table, this.getIndex(table, label_1));
      let col_2 = this.getSanitizedData(table, this.getIndex(table, label_2));

      this.bi_ref.setHeaders(["Function", label_2 + " ~ " + label_1]);
      this.bi_ref.displayOn();

      // TODO: use state
      ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

          functions.forEach( (fn, n) => {
            const row = [fn];

        var statsRequest = ocpu.call(fn, {
          "x": col_1,
          "y": col_2
        }, (session) => {
          session.getObject(null, {force: true}, (out) => {
            console.log(out);

            if(fn === "t.test")
              d = "t: " + out.statistic[0] + "\np: " + out["p.value"][0];
            else
              d = out;
            bi_table.spliceRow(n, 0, 0, fn_names[fn], d);

          });
        });
        data.push(row);
          });

//	      bi_table.loadData(data);

      break;

    /*
     *	t-tests
     */

    case "tests":
      table = this.state.data_table;
      let test_table = this.state.test_table;

      let data = [];

      label_1 = arguments[1];
      label_2 = arguments[2];
      functions1 = arguments[3];

      functions =[functions1]
      col_1 = this.getSanitizedData(table, this.getIndex(table, label_1));
      col_2 = this.getSanitizedData(table, this.getIndex(table, label_2));

      this.test_ref.setHeaders(["Test", label_2 + " ~ " + label_1]);
      this.test_ref.displayOn();

      // TODO: use state
      ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

      functions.forEach( (fn, n) => {
        let paired = false;
        let student = false;
        let row = [fn];

        if(fn === "paired")
          paired = true;

        if(fn === "student")
          student = true;

        const statsRequest = ocpu.call("t.test", {
          "x": col_1,
          "y": col_2,
          "paired": paired,
          "var.equal": student
        }, (session) => {
          session.getObject(null, {force: true}, (out) => {
            let d = "t: " + out.statistic[0] + "\np-value: " + out["p.value"][0];
            test_table.spliceRow(n, 0, 0, out["method"][0], d);
          });
        });

        data.push(row);
      });

      break;

    /*
     *	ANOVA
     */

    case "anova":
      table = this.state.data_table;
      const anova_table = this.state.anova_table;

      let for_table = [];
      data = [];
      let cols = [];
      let groups = [];
      let values = [];
      let title_string = "";
      const labels = arguments[1];
      functions = arguments[2];

      labels.forEach( (l, index) => {
        title_string = title_string.concat(index ===0 ? l : (", " + l));
        const col = getSanitizedData(table, getIndex(table, l));
        for(let i = 0; i < col.length; i++)
        {
          let k= i;
          groups.push(l);
          values.push(col[k]);
          data.push([col[k], l]);
        }
      });

      this.anova_ref.setHeaders(["Test", title_string]);
      this.anova_ref.displayOn();

      ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

      ocpu.call("lm", {
        "data": new ocpu.Snippet("data.frame(label = jsonlite::fromJSON('" + JSON.stringify(values) + "'), value = jsonlite::fromJSON('" + JSON.stringify(groups) + "'))")
      }, (session) => {

      // BEGIN
      functions.forEach( (fn, n) => {
        const row = [fn];

        const statsRequest = ocpu.call(fn, {
          object: session
        }, (session) => {
          session.getObject(null, {force: true}, (out) => {
          d = "F-value: " + out[0]["F value"] + "\np: " + out[0]["Pr(>F)"];
          anova_table.spliceRow(n, 0, 0, "ANOVA", d);
          console.log(anova_table.getData());
        });
        });
        data.push(row);
        });

      });
      table = this.state.anova_table;
      dataJSON = JSON.stringify(table.getData());
      break;

    /*
     *	Save graph as SVG
     *	TODO: add modal with format and path support
     */

    case "save":
      $.getScript("js/libs/svg-crowbar.js", () => {
      });
      break;

    /*
     *	Clustering
     */

    case "cluster":
      this.setState({cluster: true, cluster_type: arguments[1], var_x: arguments[2], var_y: arguments[3], clusters: arguments[4], eps: arguments[5] || 0});
      break;

    /*
     *	Classification
     */

    case "classify":
      this.setState({classify: true, classify_var: arguments[1], classify_file: arguments[2], classify_eval: arguments[3], classify_ratio: arguments[4], classify_type: arguments[5]});
      break;

    /*
     *	Plot graph
     */

    default:
      plot_type = arguments[1];
      var_x = arguments[2];
      var_y = arguments[3];
      const var_g = arguments[4];
      const x_name = arguments[5];
      const y_name = arguments[6];
      this.setState({multi: false, plot: true});
      this.setState({plot_type: plot_type, var_x: var_x, var_y: var_y, var_g: var_g, reg: false, x_name: x_name, y_name: y_name});
  }

}




  render() {
    if(!this.state.multi)
			var thing = <svg id="plot-panel" ref={ref => this.plot_ref = ref}></svg>;
		else {
			var thing = [];
			for(var i = 0; i < this.state.plot_count; i++) {
        let k = i
        thing.push(<div id={"box_" + k}></div>);
      }
		}
    return (

      <div>
				<MyBar ref={ref => this.top_bar = ref} onClick={this.handleClick} variables={this.state.variables} plotenabled={this.state.plot_type} />

      <div style={{display: this.state.visiblehandler ? 'block': 'none', height:1000}} id="plotdiv"></div>
          <div>
              {thing}
	        		<div id="temp_plot_thing"></div>
              <HTable  ref={ref => this.data_ref = ref} table={this.state.data_table} table_id={1} />
		        	<HTable  ref={ref => this.uni_ref = ref} table={this.state.uni_table} table_id={2} />
		        	<HTable  ref={ref => this.bi_ref = ref} table={this.state.bi_table} table_id={3} />
		        	<HTable  ref={ref => this.test_ref = ref} table={this.state.test_table} table_id={4} />
		        	<HTable  ref={ref => this.anova_ref = ref} table={this.state.anova_table} table_id={5} />
		       		<HTable ref={ref => this.classify_ref = ref} table={this.state.classify_table} table_id={6} />
	        	</div>
	        </div>
          );
  }

}



export default WholeThing;
