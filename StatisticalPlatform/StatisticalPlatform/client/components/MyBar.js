import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AnovaModal from './AnovaModal';
import PlotModal from './PlotModal';
import HistModal from './HistModal';
import BarChartModal from './BarChartModal';
import ScatterPlotModal from './ScatterPlotModal';
import BoxPlotModal from './BoxPlotModal';
import ScatterMatrixModal from './ScatterMatrixModal';
import HeatmapModal from './HeatmapModal';
import ChoiceModal from './ChoiceModal';
import BivariateModal from './BivariateModal';
import TestsModal from './TestsModal';
import QQPlotModal from './QQPlotModal';
import ComatrixModal from './ComatrixModal'
import TimeSeriesModal from './TimeSeriesModal';
import KMeansModal from './KMeansModal';
import DendogramModal from './DendogramModal';
import ClassifyModal from './ClassifyModal';
import DashboardModal from './DashboardModal'
import {Navbar, Nav, DropdownButton, MenuItem, FileField, ModalTrigger} from 'react-bootstrap'

class MyBar extends Component {

  setText(modal, text) {
    this.refs[modal].setText(text);
  }

  handleClick() {
		var file = ReactDOM.findDOMNode(this.refs.file);
		file.click();
		$(file).change( () => {
			this.props.onClick("submit");
		})
	}


  saveClick() {
  	this.props.onClick('save');
  }

  urlClick(plotType, child, url) {
		this.props.onClick("url", plotType, url);
	}

	dashboardClick(task, child, plotId){
		this.props.onClick("initDashboard", child, plotId)
	}

	tableClick() {
		this.props.onClick("show-table");
	}

	exportClick() {
		this.props.onClick("export-table");
	}

	lineClick() {
		this.props.onClick("show-feature");
	}

	plotClick(plotType, child, var_x, var_y, var_g, x_name, y_name) {
		this.props.onClick("show-table");
		this.props.onClick("plot", plotType, var_x, var_y, var_g, x_name, y_name);
		this.props.onClick("show-table");
	}

	plotD3Chart(plotType, child) {
		this.props.onClick("show-table");
		this.props.onClick("plot", plotType);
		this.props.onClick("show-table");
	}

	plotKMeansChart(plotType, child, var_x, var_y, kvalue){
		this.props.onClick("show-table");
		this.props.onClick("kmeans", plotType, child, var_x, var_y, kvalue);
		this.props.onClick("show-table");
	}

	plotQQChart(plotType, child, var_x, var_y){
		this.props.onClick("show-table");
		this.props.onClick("qq", plotType, child, var_x, var_y);
		this.props.onClick("show-table");
	}

	plotComatrixChart(plotType, child, comatrix) {
		this.props.onClick("show-table");
		this.props.onClick("comatrix", plotType, comatrix);
		this.props.onClick("show-table");
	}

	plotBarChart(plotType, child, simple_bool, group_bool, stack_bool, varx){
		this.props.onClick("show-table");
		this.props.onClick("barChart", plotType, simple_bool, group_bool, stack_bool, varx);
		this.props.onClick("show-table");
	}

	plotScatterChart(plotType, child, var_x, var_y, straight_bool, exponential_bool, polynomial_bool, logarithmic_bool){
		this.props.onClick("show-table");
		this.props.onClick("scatterPlot", plotType, var_x, var_y, straight_bool, exponential_bool, polynomial_bool, logarithmic_bool);
		this.props.onClick("show-table");
	}

	plotRegression(plotType, child, varx, vars){
		this.props.onClick("show-table");
		this.props.onClick("regressionPlot", plotType, child, varx, vars);
		this.props.onClick("show-table");
	}

	uniClick(child, variables, functions) {
		this.props.onClick("show-table");
		this.props.onClick("stats", variables, functions);
		this.props.onClick("show-table");
	}

	biClick(child, var_x, var_y, functions) {
		this.props.onClick("show-table");
		this.props.onClick("bivariate", var_x, var_y, functions);
		this.props.onClick("show-table");
	}

	testClick(child, var_x, var_y, functions) {
		this.props.onClick("show-table");
		this.props.onClick("tests", var_x, var_y, functions);
		this.props.onClick("show-table");
	}

	anovaClick(child, vars, functions) {
		this.props.onClick("show-table");
		this.props.onClick("anova", vars, functions);
		this.props.onClick("show-table");
	}

	multiPlotClick(child, count, args) {
		this.props.onClick("multi", count, args);
	}

	clusterClick(clusterType, child, var_x, var_y, clusters) {
		this.props.onClick("cluster", clusterType, var_x, var_y, clusters);
	}

	densityClusterClick(clusterType, child, var_x, var_y, minpts, eps) {
		this.props.onClick("cluster", clusterType, var_x, var_y, minpts, eps);
	}

	classifyClick(child, vars, file, evaluate, ratio) {
		this.props.onClick("classify", vars, file, evaluate, ratio, "naiveBayes");
	}

	SVMClick(child, vars, file, evaluate, ratio) {
		this.props.onClick("classify", vars, file, evaluate, ratio, "svm");
	}

  render(){
    const dashboard_style = {"left": "50%"};

    return(
      <Navbar>
        <Nav>

          <DropdownButton title="File">
            <MenuItem onClick={this.handleClick}>Open</MenuItem>
            <FileField ref="file"/>
            <MenuItem onClick={this.saveClick}>Export Image</MenuItem>

          </DropdownButton>

          <DropdownButton title="Data">
            <MenuItem onClick={this.tableClick}>View/Hide</MenuItem>
            <MenuItem onClick={this.exportClick}>Export Data</MenuItem>
          </DropdownButton>

          <DropdownButton title="Plots">

            <ModalTrigger modal={<PlotModal onClick={this.plotClick.bind(this, "lineChart")} variables={this.props.variables}  />}>
              <MenuItem>Line Plot</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<HistModal onClick={this.plotClick.bind(this, "histogram")} variables={this.props.variables}  />}>
              <MenuItem>Histogram</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<BarChartModal onClick={this.plotBarChart.bind(this, "plotBarChart")} variables={this.props.variables}  />}>
              <MenuItem>Bar Plot</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<ScatterPlotModal onClick={this.plotScatterChart.bind(this, "plotScatterPlot")} variables={this.props.variables}  />}>
              <MenuItem>Scatter Plot</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<BoxPlotModal onClick={this.plotClick.bind(this, "boxChart")} variables={this.props.variables}  />}>
              <MenuItem>Box Plot</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<ScatterMatrixModal onClick={this.plotD3Chart.bind(this, "plotScatterMatrix")} variables={this.props.variables}  />}>
              <MenuItem>Scatter Matrix</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<HeatmapModal onClick={this.plotD3Chart.bind(this, "plotHeatmap")} variables={this.props.variables}  />}>
              <MenuItem>Heatmap</MenuItem>
            </ModalTrigger>

          </DropdownButton>

          <DropdownButton title="Analyze">

            <ModalTrigger modal={<ChoiceModal onClick={this.uniClick} variables={this.props.variables} />}>
              <MenuItem>Univariate Descriptive Statistics</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<BivariateModal onClick={this.biClick} variables={this.props.variables} />}>
              <MenuItem>Bivariate Descriptive Statistics</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<TestsModal onClick={this.testClick} variables={this.props.variables} />}>
              <MenuItem>T-Tests</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<AnovaModal onClick={this.anovaClick} variables={this.props.variables} />}>
              <MenuItem>ANOVA</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<QQPlotModal onClick={this.plotQQChart.bind(this, "plotQQ")} variables={this.props.variables}  />}>
              <MenuItem>QQ Plot</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<ComatrixModal onClick={this.plotComatrixChart.bind(this, "plotComatrix")} variables={this.props.variables}  />}>
              <MenuItem>Correlation & Covariance</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<PlotModal onClick={this.plotClick.bind(this, "regression")} variables={this.props.variables}  />}>
              <MenuItem>Linear Regression</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<TimeSeriesModal onClick={this.plotD3Chart.bind(this, "plotTimeSeries")} variables={this.props.variables}  />}>
              <MenuItem>Time Series Analysis</MenuItem>
            </ModalTrigger>

          </DropdownButton>

          <DropdownButton title="Clustering">

            <ModalTrigger modal={<KMeansModal onClick={this.plotKMeansChart.bind(this, "plotKMeans")} variables={this.props.variables}  />}>
              <MenuItem>K-Means Clustering</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<DendogramModal onClick={this.plotD3Chart.bind(this, "plotDendogram")} variables={this.props.variables}  />}>
              <MenuItem>Cluster Dendrogram</MenuItem>
            </ModalTrigger>

          </DropdownButton>

          <DropdownButton title="Classification">
            <ModalTrigger modal={<ClassifyModal ref="naiveBayes_modal" onClick={this.classifyClick} variables={this.props.variables} />}>
              <MenuItem>Naive Bayes</MenuItem>
            </ModalTrigger>

            <ModalTrigger modal={<ClassifyModal ref="svm_modal" onClick={this.SVMClick} variables={this.props.variables} />}>
              <MenuItem>SVM</MenuItem>
            </ModalTrigger>
          </DropdownButton>

          <ModalTrigger modal={<DashboardModal onClick={this.dashboardClick.bind(this, "initDashboard")} variables={this.props.variables}  />}>
            <MenuItem style = {dashboard_style}>Dashboard</MenuItem>
          </ModalTrigger>

        </Nav>
      </Navbar>

    );
  }
}

export default MyBar;
