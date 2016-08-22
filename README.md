# Interactive Platform for Statistical Computing

Interactive Platform for Statistical Computing is a tool designed by <a href = "http://helikarlab.org/">Helikar Lab</a> (Computational Biology @ University of Nebraska-Lincoln) to provide a free web-based platform to perform various statistical computations without having any knowledge of the high level programming languages, which is required for most statistical technologies. Most statistical technologies require users to be familiar with the command line and/or some type of a higher level programming language, making statistics less accessible to those who are not familiar with these technologies.

The tool has been deployed and is currently in its beta phase.<br>
<b>Tool:</b> http://129.93.136.33/ocpu/library/StatisticalPlatform/www/components.html

## Development
The project was introduced as a part of <a href = "https://summerofcode.withgoogle.com/">Google Summer of Code </a> (GSoC) in 2015. <br>
The <b>first version</b> of the project utilizes the R server to build web-based interactive statistical analyses. Specifically, the following statistical functions were implemented in the first phase: Tabular data upload/export/visualization, descriptive statistics, t-tests (single-sample, independent sample, paired), graphing (2D/3D scatter plots, line, bar charts, box plots, histograms) and one/multi-way ANOVA.

As part of the <b>second phase</b> in GSoC 2016, the focus was to implement the statistical functions such as clustering, classification, time series analysis, regression models, correlation & covariance computations, heatmaps and various other plots.

###Technologies
<ul>
  <li>R</li>
  <li>Javascript, jQuery</li>
  <li>React JS</li>
  <li>Data visualization packages such as D3, NVD3 js</li>
  <li>CSS3</li>
  <li>HTML5</li>
</ul>

###Quick Start
* [Download the latest release](https://github.com/HelikarLab/StatisticalPlatform/archive/master.zip).
* Clone the repository: `git clone https://github.com/HelikarLab/StatisticalPlatform.git`.
```
#start R terminal
sudo R

#install from github
library(devtools)
install_github("HelikarLab/StatisticalPlatform")

#open in single-user server
library(opencpu)
opencpu$browse("/library/StatisticalPlatfrom/www")
```
## Features

<ul>
  Data Manipulation
  <li>Tabular data upload/export (.csv files)</li>
  <li>Tabular data viewing and editing</li>
  <li>Data preprocessing (sorting, subset)</li>
</ul>

<ul>
  Analysis
  <li>Descriptive Statistics (mean, beta, standard deviation, variance, skewness, kurtosis)</li>
  <li>t-tests (Welch, Student, Paired)</li>
  <li>One/Multi-way ANOVA</li>
  <li>QQ Plot</li>
  <li>Correlation and Covariance Plots</li>
  <li>Linear Regression</li>
  <li>Time Series Analysis</li>
</ul>

<ul>
  Plots
  <li>Line plots</li>
  <li>Histogram</li>
  <li>Bar plots (simple, grouped & stacked)</li>
  <li>Scatter plot</li>
  <li>Box plots</li>
  <li>Scatter Matrix plot</li>
  <li>Heatmap</li>
</ul>

<ul>
  Clustering
  <li>K-Means clustering</li>
  <li>Cluster dendogram</li>
</ul>

##License
<b>This program is a free software:</b> You can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses>
