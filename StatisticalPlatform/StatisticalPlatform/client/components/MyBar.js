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
import DashboardModal from './DashboardModal';
import FileField from './FileField'
import {Navbar, Nav, DropdownButton, MenuItem, Modal} from 'react-bootstrap';

class MyBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ isMenuOpen: true });
  }

  handleClose = () => {
    this.setState({ isMenuOpen: false });
  }

  setText = (modal, text) => {
    this.refs[modal].setText(text);
  }

  handleClick = () => {
		var file = ReactDOM.findDOMNode(this.refs.file);
		file.click();
		$(file).change( () => {
			this.props.onClick("submit");
		})
	}


  saveClick = () => {
  	this.props.onClick('save');
  }

  urlClick = (plotType, child, url) => {
		this.props.onClick("url", plotType, url);
	}

	dashboardClick = (task, child, plotId) => {
		this.props.onClick("initDashboard", child, plotId)
	}

	tableClick = () => {
		this.props.onClick("show-table");
	}

	exportClick = () => {
		this.props.onClick("export-table");
	}

	lineClick = () => {
		this.props.onClick("show-feature");
	}

	plotClick = (plotType, child, var_x, var_y, var_g, x_name, y_name) => {
		this.props.onClick("show-table");
		this.props.onClick("plot", plotType, var_x, var_y, var_g, x_name, y_name);
		this.props.onClick("show-table");
	}

	plotD3Chart = (plotType, child) => {
		this.props.onClick("show-table");
		this.props.onClick("plot", plotType);
		this.props.onClick("show-table");
	}

	plotKMeansChart = (plotType, child, var_x, var_y, kvalue) => {
		this.props.onClick("show-table");
		this.props.onClick("kmeans", plotType, child, var_x, var_y, kvalue);
		this.props.onClick("show-table");
	}

	plotQQChart = (plotType, child, var_x, var_y) => {
		this.props.onClick("show-table");
		this.props.onClick("qq", plotType, child, var_x, var_y);
		this.props.onClick("show-table");
	}

	plotComatrixChart = (plotType, child, comatrix) => {
		this.props.onClick("show-table");
		this.props.onClick("comatrix", plotType, comatrix);
		this.props.onClick("show-table");
	}

	plotBarChart = (plotType, child, simple_bool, group_bool, stack_bool, varx) => {
		this.props.onClick("show-table");
		this.props.onClick("barChart", plotType, simple_bool, group_bool, stack_bool, varx);
		this.props.onClick("show-table");
	}

	plotScatterChart = (plotType, child, var_x, var_y, straight_bool, exponential_bool, polynomial_bool, logarithmic_bool) => {
		this.props.onClick("show-table");
		this.props.onClick("scatterPlot", plotType, var_x, var_y, straight_bool, exponential_bool, polynomial_bool, logarithmic_bool);
		this.props.onClick("show-table");
	}

	plotRegression = (plotType, child, varx, vars) => {
		this.props.onClick("show-table");
		this.props.onClick("regressionPlot", plotType, child, varx, vars);
		this.props.onClick("show-table");
	}

	uniClick = (child, variables, functions) => {
		this.props.onClick("show-table");
		this.props.onClick("stats", variables, functions);
		this.props.onClick("show-table");
	}

	biClick = (child, var_x, var_y, functions) => {
		this.props.onClick("show-table");
		this.props.onClick("bivariate", var_x, var_y, functions);
		this.props.onClick("show-table");
	}

	testClick = (child, var_x, var_y, functions) => {
		this.props.onClick("show-table");
		this.props.onClick("tests", var_x, var_y, functions);
		this.props.onClick("show-table");
	}

	anovaClick = (child, vars, functions) => {
		this.props.onClick("show-table");
		this.props.onClick("anova", vars, functions);
		this.props.onClick("show-table");
	}

	multiPlotClick = (child, count, args) => {
		this.props.onClick("multi", count, args);
	}

	clusterClick = (clusterType, child, var_x, var_y, clusters) => {
		this.props.onClick("cluster", clusterType, var_x, var_y, clusters);
	}

	densityClusterClick = (clusterType, child, var_x, var_y, minpts, eps) => {
		this.props.onClick("cluster", clusterType, var_x, var_y, minpts, eps);
	}

	classifyClick = (child, vars, file, evaluate, ratio) => {
		this.props.onClick("classify", vars, file, evaluate, ratio, "naiveBayes");
	}

	SVMClick = (child, vars, file, evaluate, ratio) => {
		this.props.onClick("classify", vars, file, evaluate, ratio, "svm");
	}
  closeModal = (obj) => {
    this.setState(obj)
  }

  render =() => {
    const dashboard_style = {"left": "150%"};

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
            <MenuItem onClick = {() => this.setState({showLinePlot: true})}>Line Plot</MenuItem>
            <Modal
              show={this.state.showLinePlot ? this.state.showLinePlot : false}
              onHide={this.setState.bind(this,{showLinePlot: false})}>
                <PlotModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotClick.bind(this, "lineChart")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showHistogram: true})}>Histogram</MenuItem>
            <Modal
              show={this.state.showHistogram ? this.state.showHistogram : false}
              onHide={this.setState.bind(this,{showHistogram: false})}>
                <HistModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotClick.bind(this, "lineChart")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showBarPlot: true})}>Bar Plot</MenuItem>
            <Modal
              show={this.state.showBarPlot? this.state.showBarPlot : false}
              onHide={this.setState.bind(this,{showBarPlot: false})}>
                <BarChartModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotBarChart.bind(this, "plotBarChart")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showScatterPlot: true})}>Scatter Plot</MenuItem>
            <Modal
              show={this.state.showScatterPlot? this.state.showScatterPlot : false}
              onHide={this.setState.bind(this,{showScatterPlot: false})}>
                <ScatterPlotModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotScatterChart.bind(this, "plotScatterPlot")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showBoxPlot: true})}>Box Plot</MenuItem>
            <Modal
              show={this.state.showBoxPlot? this.state.showBoxPlot : false}
              onHide={this.setState.bind(this,{showBoxPlot: false})}>
                <BoxPlotModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotClick.bind(this, "boxChart")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showScatterMatrix: true})}>Scatter Matrix</MenuItem>
            <Modal
              show={this.state.showScatterMatrix? this.state.showScatterMatrix : false}
              onHide={this.setState.bind(this,{showScatterMatrix: false})}>
                <ScatterMatrixModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotD3Chart.bind(this, "plotScatterMatrix")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showHeatMap: true})}>Heatmap</MenuItem>
            <Modal
              show={this.state.showHeatMap? this.state.showHeatMap : false}
              onHide={this.setState.bind(this,{showHeatMap: false})}>
                <HeatmapModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotD3Chart.bind(this, "plotScatterMatrix")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>
          </DropdownButton>

          <DropdownButton title="Analyze">
            <MenuItem onClick = {() => this.setState({showUniDescStats: true})}>Univariate Descriptive Statistics</MenuItem>
            <Modal
              show={this.state.showUniDescStats? this.state.showUniDescStats : false}
              onHide={this.setState.bind(this,{showUniDescStats: false})}>
                <ChoiceModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.uniClick}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showBiDescStats: true})}>Bivariate Descriptive Statistics</MenuItem>
            <Modal
              show={this.state.showBiDescStats? this.state.showBiDescStats : false}
              onHide={this.setState.bind(this,{showBiDescStats: false})}>
                <BivariateModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.biClick}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showTest: true})}>T-Test</MenuItem>
            <Modal
              show={this.state.showTest? this.state.showTest : false}
              onHide={this.setState.bind(this,{showTest: false})}>
                <TestsModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.testClick}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showAnova: true})}>Anova</MenuItem>
            <Modal
              show={this.state.showAnova? this.state.showAnova : false}
              onHide={this.setState.bind(this,{showAnova: false})}>
                <AnovaModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.anovaClick}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showQQ: true})}>QQPlot</MenuItem>
            <Modal
              show={this.state.showQQ? this.state.showQQ : false}
              onHide={this.setState.bind(this,{showQQ: false})}>
                <QQPlotModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotQQChart.bind(this, "plotQQ")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showComatrix: true})}>Correlation & Covariance</MenuItem>
            <Modal
              show={this.state.showComatrix? this.state.showComatrix : false}
              onHide={this.setState.bind(this,{showComatrix: false})}>
                <ComatrixModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotComatrixChart.bind(this, "plotComatrix")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showLinearRegression: true})}>Linear Regression</MenuItem>
            <Modal
              show={this.state.showLinearRegression? this.state.showLinearRegression : false}
              onHide={this.setState.bind(this,{showLinearRegression: false})}>
                <PlotModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotClick.bind(this, "regression")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showTimeSeries: true})}>Time Series Analysis </MenuItem>
            <Modal
              show={this.state.showTimeSeries? this.state.showTimeSeries : false}
              onHide={this.setState.bind(this,{showTimeSeries: false})}>
                <TimeSeriesModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotD3Chart.bind(this, "plotTimeSeries")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

          </DropdownButton>

          <DropdownButton title="Clustering">
            <MenuItem onClick = {() => this.setState({showKMeans: true})}>K-Means Clustering </MenuItem>
            <Modal
              show={this.state.showKMeans? this.state.showKMeans : false}
              onHide={this.setState.bind(this,{showKMeans: false})}>
                <KMeansModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotKMeansChart.bind(this, "plotKMeans")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>
            <MenuItem onClick = {() => this.setState({showDendo: true})}>Cluster Dendrogram</MenuItem>
            <Modal
              show={this.state.showDendo? this.state.showDendo : false}
              onHide={this.setState.bind(this,{showDendo: false})}>
                <DendogramModal
                  onClose={() => this.closeModal(val)}
                  onClick={this.plotD3Chart.bind(this, "plotDendogram")}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

          </DropdownButton>


          <DropdownButton title="Classification">

            <MenuItem onClick = {() => this.setState({showNaiveBayes: true})}>Naive Bayes</MenuItem>
            <Modal
              show={this.state.showNaiveBayes? this.state.showNaiveBayes : false}
              onHide={this.setState.bind(this,{showNaiveBayes: false})}>
                <ClassifyModal
                  onClose={() => this.closeModal(val)}
                  ref="naiveBayes_modal"
                  onClick={this.classifyClick}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

            <MenuItem onClick = {() => this.setState({showSVM: true})}>SVM</MenuItem>
            <Modal
              show={this.state.showSVM? this.state.showSVM : false}
              onHide={this.setState.bind(this,{showSVM: false})}>
                <ClassifyModal
                  onClose={() => this.closeModal(val)}
                  ref="svm_modal"
                  onClick={this.SVMClick}
                  variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
            </Modal>

          </DropdownButton>

          <MenuItem style = {dashboard_style} onClick = {() => this.setState({showDash: true})}>Dashboard</MenuItem>
          <Modal
            show={this.state.showDash? this.state.showDash : false}
            onHide={this.setState.bind(this,{showDash: false})}>
              <DashboardModal
                onClose={() => this.closeModal(val)}
                onClick={this.dashboardClick.bind(this, "initDashboard")}
                variables={this.props.variables ? this.props.variable : ['Car','Car2', 'Car3']}  />
          </Modal>

        </Nav>
      </Navbar>

    );
  }
}

export default MyBar;
