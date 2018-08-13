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
 *	Contains all the plot functions
 *	MASSIVE TODO: reorganise the variables into SOME consistent system
 */
function makePlot(obj, state) {

	d3.selectAll("svg > *").remove();

	// read.csv
	ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R");

	// plot
	if(obj) {
		var hot = obj.state.data_table;
		var type = obj.state.plot_type;
		var state = obj.state;
		var dataJSON = JSON.stringify(hot.getSourceData());
		var reg = type === "regression";
	}
	else {
		var dataJSON = JSON.stringify(state.data);
		var type = state.type;
	}

	if (type === "urlData") {
		$.ajax({
			url: state.url,
			type: 'GET',
			dataType: "json",
			success: getUrlData
	});

	function getUrlData(data){
		dataJSON = JSON.stringify(data);
		alert(dataJSON);
	}

	}

	if(type === "regression") type = "scatterChart";

	var nvdata = [{key: "Data", values: JSON.parse(dataJSON)}];

	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

	if(type === "lineChart" || type === "scatterChart") {

		ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

		if(reg === true) {
			var slope, intercept;

			var req = ocpu.call("lm", {
				formula: new ocpu.Snippet(state.var_y + " ~ " + state.var_x),
				data: new ocpu.Snippet("jsonlite::fromJSON('" + dataJSON + "')")
			}, function (session) {
				session.getObject(null, {force: true}, function (obj) {
					intercept = obj.coefficients[0];
					slope = obj.coefficients[1];
					var plotData = {};
					plotData.dataJSON = dataJSON, plotData.type = type, plotData.var_x = state.var_x, plotData.var_y = state.var_y, plotData.var_g = state.var_g, plotData.x_name = state.x_name, plotData.y_name = state.y_name, plotData.slope = slope, plotData.intercept = intercept;
					addNewPlot('Linear Regression', plotData);
					plotStandard(plotData);
				});
			});
		}
		else {
			var plotData = {};
			plotData.dataJSON = dataJSON, plotData.type = type, plotData.var_x = state.var_x, plotData.var_y = state.var_y, plotData.var_g = state.var_g, plotData.x_name = state.x_name, plotData.y_name = state.y_name;
			addNewPlot('Line Plot', plotData);
			plotStandard(plotData);
		}
	}

	if (type === "plotDendogram") {

		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON;

		var req = ocpu.rpc("dendogram", {data: data}, function(output){
        var dendogramData = output.message;
				addNewPlot('Cluster Dendrogram', dendogramData);
				plotDendogram(dendogramData);
      });

			//if R returns an error, alert the error message
      req.fail(function(){
        alert("Server error: " + req.responseText);
      });
	}

	if (type==="plotDensityPlot") {
		var var_x = state.var_x;
		console.log("tejasav" + var_x);
		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};

		plotData.var_x = var_x;

		var req = $("#plotdiv").rplot("densityplot", {
		data : data,
		var_x : var_x
		})
		//optional: add custom callbacks
		req.fail(function(){
			alert("R returned an error: " + req.responseText);
		});
	}

	if (type==="plotDensityBasedClustering") {
		var var_x = state.var_x;
		var var_y = state.var_y;
		var minpts = state.minpts;
		var eps = state.eps;
		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};

		plotData.var_x = var_x;
		plotData.var_y = var_y;
		plotData.minpts = minpts;
		plotData.eps = eps;

		var req = $("#plotdiv").rplot("densitybasedclustering", {
		data : data,
		var_x : var_x,
		var_y : var_y,
		eps : eps,
		MinPts : minpts

	})
//optional: add custom callbacks
		req.fail(function(){
			alert("R returned an error: " + req.responseText);
		});
	}

	if (type==="plotPCAPlot") {
		var var_x = state.var_x;
		console.log("tejasav" + var_x);
		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};

		plotData.var_x = var_x;

		var req = $("#plotdiv").rplot("principalcomp", {
		data : data,
		classify : var_x
	})
		//optional: add custom callbacks
		req.fail(function(){
			alert("R returned an error: " + req.responseText);
		});
	}

	if (type==="plotsvmclassification") {
		let formula  = state.formula;
		let kernel  = state.kernel;

		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");
		var data = dataJSON, plotData = {};
		plotData.formula  = formula;
		plotData.kernel  = kernel;

		console.log("tejasav" + JSON.stringify(plotData));

		var req = $("#plotdiv").rplot("supportvectormachine", {
    dat : data,
		formul : formula,
		k : kernel
		})

		req.fail(function(){
    alert("R returned an error: " + req.responseText);
		});
	}

	if (type==="plotDistributionBasedClustering") {
		var var_x = state.var_x;
		console.log("tejasav" + var_x);
		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};

		plotData.var_x = var_x;

		var req = $("#plotdiv").rplot("distributionbasedclustering", {
    data : data,
    classify : var_x
		})
		//optional: add custom callbacks
		req.fail(function(){
		    alert("R returned an error: " + req.responseText);
		});
	}

	if (type === "plotKMeans") {

		var var_x = state.var_x, var_y = state.var_y, kvalue = state.kvalue;

		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};
		plotData.kvalue = kvalue;
		plotData.var_x = var_x;
		plotData.var_y = var_y;

		var req =ocpu.rpc("kmeansCluster", {data: data, var_x: var_x, var_y: var_y, kvalue: kvalue}, function(output){
				var kmeansData = output.message;
				plotData.kmeansData = kmeansData;
				addNewPlot('K-Means Clustering', plotData);
				plotKMeans(plotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotScatterMatrix") {

		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON;

		var req = ocpu.rpc("scatterMatrix", {data: data}, function(output){
				var scatterMatrixData = output.message;
				addNewPlot('Scatter Matrix', scatterMatrixData);
				plotScatterMatrix(scatterMatrixData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotQQ") {

	var var_x = state.var_x, var_y = state.var_y;

		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};
		plotData.var_x = var_x;
		plotData.var_y = var_y;

		var req = ocpu.rpc("q_qplot", {data: data, var_x: var_x, var_y}, function(output){
				 	plotData.qqdata = output.qqdata;
					plotData.linedata = output.linedata;
					addNewPlot('Q-Q plot', plotData);
					plotQQ(plotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotTimeSeries") {

		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};

		var req = ocpu.rpc("timeSeries", {data: data}, function(output){
				plotData.timeSeriesData = output.message;
				plotData.count = output.count;
				addNewPlot('Time Series Analysis', plotData);
				plotTimeSeries(plotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type === "plotComatrix") {

		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var method = state.comatrix;
		var data = dataJSON;

		var req = ocpu.rpc("comatrix",
											{	data: data,
												method: method
											}, function(output){
				var comatrixData = output.message;
				if (method == "cor") {
					method = "Correlation Plot";
				}
				else if (method == "cov") {
					method = "Covariance Plot";
				}
				addNewPlot(method, comatrixData);
				comatrixPlot(comatrixData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type == "plotBarChart") {

		if (state.simple_bool) {
			ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

			var data = dataJSON, value = state.var_x, plotData = {};

			var req = ocpu.rpc("simpleBar", {data: data, value: value}, function(output){
					var simpleBarPlotData = output.message;
					plotData.data = simpleBarPlotData;
					plotData.value = value;
					addNewPlot('Simple Bar Plot', plotData);
					plotSimpleBar(plotData);
				});
				//if R returns an error, alert the error message
				req.fail(function(){
					alert("Server error: " + req.responseText);
				});
		}
		if (state.group_bool) {

			ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

			var data = dataJSON;

			var req = ocpu.rpc("groupBar", {data: data}, function(output){
					var groupBarPlotData = output.message;
						addNewPlot('Group Bar Plot', groupBarPlotData);
						plotGroupBar(groupBarPlotData);
				});

				//if R returns an error, alert the error message
				req.fail(function(){
					alert("Server error: " + req.responseText);
				});
		}
		if (state.stack_bool) {

			ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

			var data = dataJSON;

			var req = ocpu.rpc("groupBar", {data: data}, function(output){
					var stackBarPlotData = output.message;
					addNewPlot('Stack Bar Plot', stackBarPlotData);
					plotStackBar(stackBarPlotData);
				});

				//if R returns an error, alert the error message
				req.fail(function(){
					alert("Server error: " + req.responseText);
				});
		}
	}

	if (type == "plotScatterPlot") {
		var var_x = state.var_x, var_y = state.var_y, straight_bool = state.straight_bool, exponential_bool = state.exponential_bool, polynomial_bool = state.polynomial_bool, logarithmic_bool = state.logarithmic_bool;
		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");
		var data = dataJSON, plotData = {};

		var req = ocpu.rpc("scatterplot", {data: data, var_x: var_x, var_y: var_y}, function(output){
			plotData.scatterdata = output.scatterdata;
			plotData.lindata = output.lindata;
			plotData.expdata = output.expdata;
			plotData.logdata = output.logdata;
			plotData.poldata = output.poldata;
			plotData.straight_bool = straight_bool;
			plotData.exponential_bool = exponential_bool;
			plotData.polynomial_bool = polynomial_bool;
			plotData.logarithmic_bool = logarithmic_bool;
			plotData.label_x = var_x;
			plotData.label_y = var_y;
			addNewPlot('Scatter Plot', plotData);
			plotScatterData(plotData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if (type == "plotHeatmap") {
		ocpu.seturl("http://localhost:5656/ocpu/apps/tejasavkhattar/testpackage/R");

		var data = dataJSON, plotData = {};

		var req = ocpu.rpc("heat_map", {data: data}, function(output){
				plotData.message = output.message;
				addNewPlot('Heatmap', plotData.message);
				plotHeatmap(plotData.message);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if(type === "discreteBarChart")
		plotBar(dataJSON, type, state.var_x, state.var_y);

	if(type === "histogram"){

		var plotData = {};
		plotData.dataJSON = dataJSON;
		plotData.var_x = state.var_x;
		plotData.var_g = state.var_g;
		addNewPlot('Histogram', plotData);
		plotHist(plotData);
	}

	if(type === "boxChart")
		plotBox(dataJSON, type, state.var_g, state.var_x, state.x_name, state.y_name);
}

function plotBar(array, type, var_x, var_y) {

	data = JSON.parse(array);

	vals = [];
	obj = {};
	data.forEach(function (d) {
		vals.push({"x" : d[var_y], "y": d[var_x]});
	});

	out = [{'key': 'out', 'values': vals}];

	d3.selectAll("svg > *").remove();

 	nv.addGraph(function() {

		var chart = nv.models[type]()
		.x(function(d) { return d.label })    //Specify the data accessors.
		.y(function(d) { return d.value })
		.color(d3.scale.category10().range())
		;

		d3.select('#plot-panel')
		.datum(out)
		.call(chart);

		//nv.utils.windowResize(chart.update);

		return chart;
	}.bind(this));
}

/*
 *  NVD3 data format:
 *     [{key: "group_name", values: [group_elements]}, ...]
 */

function realBox(myData, x_name, y_name) {

	d3.selectAll("svg > *").remove();

	nv.addGraph(function() {

		var chart = nv.models.boxPlotChart()
		.x(function(d) { return d.label })    //Specify the data accessors.
		.y(function(d) { return d.values.Q3 })
		.maxBoxWidth(75)
		.staggerLabels(true)
		;

		chart.xAxis.axisLabel(x_name);
		chart.yAxis.axisLabel(y_name);

		d3.select('#plot-panel')
		.datum(myData)
		.call(chart);

		//nv.utils.windowResize(chart.update);

		return chart;
	});

}

function plotBox(data, type, var_x, var_y, x_name, y_name) {
	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

	process = [], keys = [];
	var myData = [];

	data = JSON.parse(data);
	categories = _.uniq(data.map(function (d) {
		return d[var_x]
	}));

	categories.forEach(function (x) {
		now = data.filter(function(d) {
			return d[var_x] === x;
		}).map(function(y) {
			return y[var_y]
		});

		if(now[0] !== null)
			process.push({label: x, values: now});
	});

	_.initial(process).forEach(function (p) {
		ocpu.call("quantile", {
			x: p.values
		}, function (session) {
			session.getObject(function(out) {
				d = {
					Q1: out[1],
					Q2: out[2],
					Q3: out[3],
					whisker_low: out[0],
					whisker_high: out[4],
					outliers: []
				};
				p.values = d;
				myData.push(p);
			});
		});
	});

	var last = _.last(process);

	ocpu.call("quantile", {
		x: last.values
	}, function (session) {
		session.getObject(function(out) {
			d = {
				Q1: out[1],
				Q2: out[2],
				Q3: out[3],
				whisker_low: out[0],
				whisker_high: out[4],
				outliers: []
			};
			last.values = d;
			myData.push(last);

			realBox(myData, x_name, y_name);
		});
	});
}

function plotHierarchical(obj) {

	var data = document.getElementById('plot-panel').innerHTML;
	root = JSON.parse(data);

	var width = 640,
	height = 480;

	var cluster = d3.layout.cluster()
	.size([height - 50, width - 160]);

	var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(40,0)");


	var nodes = cluster.nodes(root),
	links = cluster.links(nodes);

	var link = svg.selectAll(".link")
	.data(links)
	.enter().append("path")
	.attr("class", "link")
	.attr("d", diagonal);

	var node = svg.selectAll(".node")
	.data(nodes)
	.enter().append("g")
	.attr("class", "node")
	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

	node.append("circle")
	.attr("r", 4.5);

	node.append("text")
	.attr("dx", function(d) { return d.children ? 8 : 8; })
	.attr("dy", function(d) { return d.children ? 20 : 4; })
	.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
	.text(function(d) { return d.name; });


	d3.select(self.frameElement).style("height", height + "px");
}
