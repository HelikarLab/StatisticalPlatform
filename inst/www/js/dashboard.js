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

var plotsData = [], plotsId = 1;

function addNewPlot(type, data){

  var time = new Date();
  time = time.toLocaleString();

  plotsData.unshift({
    'id': plotsId,
    'type': type,
    'data': data,
    'time': time
  });

  plotsId = plotsId + 1;
}

function plotDashboard(plotType, plotData){

  switch (plotType) {
    case 'Dendogram':
      plotDendogram(plotData);
      break;

    case 'K-means clustering':
      plotKMeans(plotData);
      break;

    case 'Scatter Matrix':
      plotScatterMatrix(plotData);
      break;

    case 'Q-Q plot':
      plotQQ(plotData);
      break;

    case 'Simple Bar Plot':
      plotSimpleBar(plotData);
      break;

    case 'Group Bar Plot':
      plotGroupBar(plotData);
      break;

    case 'Stack Bar Plot':
      plotStackBar(plotData);
      break;

    case 'Heatmap':
      comatrixPlot(plotData);
      break;

    case 'Line Plot':
      plotStandard(plotData);
      break;

    case 'Linear Regression':
      plotStandard(plotData);
      break;

    case 'Histogram':
      plotHist(plotData);
      break;

  }
}

function getDashboardOptionIds(){
  var result = plotsData.map(function(a) {return a.id;});
  return(result);
}

function getDashboardOptionType(){
  var result = plotsData.map(function(a) {return a.type;});
  return(result);
}

function getDashboardOptionData(){
  var result = plotsData.map(function(a) {return a.data;});
  return(result);
}

function getDashboardOptionTime(){
  var result = plotsData.map(function(a) {return a.time;});
  return(result);
}
