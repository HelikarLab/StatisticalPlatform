import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AnovaModal from './Analyze/AnovaModal';
import PlotModal from './Plot/PlotModal';
import HistModal from './Plot/HistModal';
import BarChartModal from './Plot/BarChartModal';
import ScatterPlotModal from './Plot/ScatterPlotModal';
import BoxPlotModal from './Plot/BoxPlotModal';
import ScatterMatrixModal from './Plot/ScatterMatrixModal';
import HeatmapModal from './Plot/HeatmapModal';
import DensityPlotModal from './Plot/DensityPlotModal';
import ChoiceModal from './Analyze/ChoiceModal';
import PCAModal from './Analyze/PCAModal';
import BivariateModal from './Analyze/BivariateModal';
import TestsModal from './Analyze/TestsModal';
import QQPlotModal from './Analyze/QQPlotModal';
import ComatrixModal from './Analyze/ComatrixModal'
import TimeSeriesModal from './Analyze/TimeSeriesModal';
import KMeansModal from './Clustering/KMeansModal';
import DendogramModal from './Clustering/DendogramModal';
import DensityClusterModal from './Clustering/DensityClusterModal';
import ClassifyModal from './Classification/ClassifyModal';
import DashboardModal from './Dashboard/DashboardModal';
import FileField from './File/FileField';
import SVMModal from './Classification/SVMModal';
import axios from 'axios';
import {Navbar, Nav, DropdownButton, MenuItem, Modal, NavItem, NavDropdown, } from 'react-bootstrap';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

class MyBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };

  }

  logOutUser = () => {
    axios.post("/api/rest-auth/logout/")
    .then(async resp => {
      alert("logged out");
      await localStorage.setItem("PreviousKey", null);
      window.location.href = "/";
    })
  }

  setText = (modal, text) => {
    this.refs[modal].setText(text);
  }

  handleClick = () => {
		let file = ReactDOM.findDOMNode(this.file)
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

  plotDensity = (plotType, child, var_x) => {
  this.props.onClick("show-table");
  this.props.onClick("densityplot", plotType, child, var_x);
  this.props.onClick("show-table");
  }

  plotDensityCluster = (plotType, child, var_x, var_y, minpts, eps) => {
    this.props.onClick("show-table");
    this.props.onClick("densitybasedclustering", plotType, child, var_x, var_y, minpts, eps);
    this.props.onClick("show-table");
  }

  plotPCA = (plotType, child, var_x) => {
  this.props.onClick("show-table");
  this.props.onClick("pcaplot", plotType, child, var_x);
  this.props.onClick("show-table");
  }

  closeModal = (obj) => {
    this.setState(obj)
  }

  render =() => {
    return(
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Statistical Platform</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={1} title="File" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} onClick={this.handleClick}>Open</MenuItem>
            <FileField ref={ref => this.file = ref}/>
              <MenuItem eventKey={1.2} onClick={this.saveClick}>Export Image</MenuItem>
            </NavDropdown>

            <NavDropdown eventKey={2} title="Data" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} onClick={this.tableClick}>View/Hide</MenuItem>
              <MenuItem eventKey={2.2} onClick={this.exportClick}>Export Data</MenuItem>
            </NavDropdown>

            <NavDropdown eventKey={3} title="Plot" id="basic-nav-dropdown">

              <MenuItem eventKey={3.1} onClick = {() => this.setState({showLinePlot: true})}>Line Plot</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showLinePlot ? this.state.showLinePlot : false}
                onHide={this.setState.bind(this,{showLinePlot: false})}>
                  <PlotModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotClick.bind(this, "lineChart")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={3.2} onClick = {() => this.setState({showHistogram: true})}>Histogram</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showHistogram ? this.state.showHistogram : false}
                onHide={this.setState.bind(this,{showHistogram: false})}>
                  <HistModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotClick.bind(this, "lineChart")}
                    variables={this.props.variables && this.props.variables.length > 0 ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={3.3} onClick = {() => this.setState({showBarPlot: true})}>Bar Plot</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showBarPlot? this.state.showBarPlot : false}
                onHide={this.setState.bind(this,{showBarPlot: false})}>
                  <BarChartModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotBarChart.bind(this, "plotBarChart")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={3.4} onClick = {() => this.setState({showScatterPlot: true})}>Scatter Plot</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showScatterPlot? this.state.showScatterPlot : false}
                onHide={this.setState.bind(this,{showScatterPlot: false})}>
                  <ScatterPlotModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotScatterChart.bind(this, "plotScatterPlot")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={3.5} onClick = {() => this.setState({showBoxPlot: true})}>Box Plot</MenuItem>
            <Modal
                {...this.props}
                show={this.state.showBoxPlot? this.state.showBoxPlot : false}
                onHide={this.setState.bind(this,{showBoxPlot: false})}>
                  <BoxPlotModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotClick.bind(this, "boxChart")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={3.6} onClick = {() => this.setState({showScatterMatrix: true})}>Scatter Matrix</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showScatterMatrix? this.state.showScatterMatrix : false}
                onHide={this.setState.bind(this,{showScatterMatrix: false})}>
                  <ScatterMatrixModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotD3Chart.bind(this, "plotScatterMatrix")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={3.7} onClick = {() => this.setState({showHeatMap: true})}>Heatmap</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showHeatMap? this.state.showHeatMap : false}
                onHide={this.setState.bind(this,{showHeatMap: false})}>
                  <HeatmapModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotD3Chart.bind(this, "plotScatterMatrix")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={3.8} onClick = {() => this.setState({showDensityPlot: true})}>Density Plot</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showDensityPlot? this.state.showDensityPlot : false}
                onHide={this.setState.bind(this,{showDensityPlot: false})}>
                  <DensityPlotModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotDensity.bind(this, "plotDensityPlot")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

            </NavDropdown>

            <NavDropdown eventKey={4} title="Analyze" id="basic-nav-dropdown">

              <MenuItem eventKey={4.1} onClick = {() => this.setState({showUniDescStats: true})}>Univariate Descriptive Statistics</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showUniDescStats? this.state.showUniDescStats : false}
                onHide={this.setState.bind(this,{showUniDescStats: false})}>
                  <ChoiceModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.uniClick}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.2} onClick = {() => this.setState({showBiDescStats: true})}>Bivariate Descriptive Statistics</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showBiDescStats? this.state.showBiDescStats : false}
                onHide={this.setState.bind(this,{showBiDescStats: false})}>
                  <BivariateModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.biClick}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.3} onClick = {() => this.setState({showTest: true})}>T-Test</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showTest? this.state.showTest : false}
                onHide={this.setState.bind(this,{showTest: false})}>
                  <TestsModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.testClick}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.4} onClick = {() => this.setState({showAnova: true})}>Anova</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showAnova? this.state.showAnova : false}
                onHide={this.setState.bind(this,{showAnova: false})}>
                  <AnovaModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.anovaClick}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.5} onClick = {() => this.setState({showQQ: true})}>QQPlot</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showQQ? this.state.showQQ : false}
                onHide={this.setState.bind(this,{showQQ: false})}>
                  <QQPlotModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotQQChart.bind(this, "plotQQ")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.6} onClick = {() => this.setState({showComatrix: true})}>Correlation & Covariance</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showComatrix? this.state.showComatrix : false}
                onHide={this.setState.bind(this,{showComatrix: false})}>
                  <ComatrixModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotComatrixChart.bind(this, "plotComatrix")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.7} onClick = {() => this.setState({showLinePlot: true})}>Linear Regression</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showLinearRegression? this.state.showLinearRegression : false}
                onHide={this.setState.bind(this,{showLinePlot: false})}>
                  <PlotModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotClick.bind(this, "regression")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.8} onClick = {() => this.setState({showTimeSeries: true})}>Time Series Analysis </MenuItem>
              <Modal
                {...this.props}
                show={this.state.showTimeSeries? this.state.showTimeSeries : false}
                onHide={this.setState.bind(this,{showTimeSeries: false})}>
                  <TimeSeriesModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotD3Chart.bind(this, "plotTimeSeries")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={4.9} onClick = {() => this.setState({showPCAPlot: true})}>PCA Plot</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showPCAPlot? this.state.showPCAPlot : false}
                onHide={this.setState.bind(this,{showPCAPlot: false})}>
                  <PCAModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotPCA.bind(this, "plotPCAPlot")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

            </NavDropdown>

            <NavDropdown eventKey={5} title="Clustering" id="basic-nav-dropdown">
              <MenuItem eventKey={5.1} onClick = {() => this.setState({showKMeans: true})}>K-Means Clustering </MenuItem>
              <Modal
                {...this.props}
                show={this.state.showKMeans? this.state.showKMeans : false}
                onHide={this.setState.bind(this,{showKMeans: false})}>
                  <KMeansModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotKMeansChart.bind(this, "plotKMeans")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>
              <MenuItem eventKey={5.2} onClick = {() => this.setState({showDendo: true})}>Cluster Dendrogram</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showDendo? this.state.showDendo : false}
                onHide={this.setState.bind(this,{showDendo: false})}>
                  <DendogramModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotD3Chart.bind(this, "plotDendogram")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={5.3} onClick = {() => this.setState({showDensityCluster: true})}>Density Based </MenuItem>
              <Modal
                {...this.props}
                show={this.state.showDensityCluster? this.state.showDensityCluster : false}
                onHide={this.setState.bind(this,{showDensityCluster: false})}>
                  <DensityClusterModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.plotDensityCluster.bind(this, "plotDensityBasedClustering")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>
            </NavDropdown>

            <NavDropdown eventKey={6} title="Classification" id="basic-nav-dropdown">
              <MenuItem eventKey={6.1} onClick = {() => this.setState({showNaiveBayes: true})}>Naive Bayes</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showNaiveBayes? this.state.showNaiveBayes : false}
                onHide={this.setState.bind(this,{showNaiveBayes: false})}>
                  <ClassifyModal
                    onClose={(val) => this.closeModal(val)}
                    ref="naiveBayes_modal"
                    onClick={this.classifyClick}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

              <MenuItem eventKey={6.2} onClick = {() => this.setState({showSVM: true})}>SVM</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showSVM? this.state.showSVM : false}
                onHide={this.setState.bind(this,{showSVM: false})}>
                  <SVMModal
                    onClose={(val) => this.closeModal(val)}
                    ref="svm_modal"
                    onClick={this.SVMClick}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>

            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <MenuItem eventKey={1.1}  onClick = {() => this.setState({showDash: true})}>Dashboard</MenuItem>
              <Modal
                {...this.props}
                show={this.state.showDash? this.state.showDash : false}
                onHide={this.setState.bind(this,{showDash: false})}>
                  <DashboardModal
                    onClose={(val) => this.closeModal(val)}
                    onClick={this.dashboardClick.bind(this, "initDashboard")}
                    variables={this.props.variables ? this.props.variables : ['Car','Car2', 'Car3']}  />
              </Modal>
            </NavItem>

            <NavItem eventKey={1} href="#">
              <MenuItem eventKey={1.1} onClick={this.logOutUser} >LogOut</MenuItem>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MyBar;
