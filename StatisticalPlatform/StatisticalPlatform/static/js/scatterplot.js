/*
This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details. You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>
*/

function plotScatterData(plotData){

  d3.selectAll("svg > *").remove();

  var data = plotData.scatterdata, lindata = plotData.lindata, expdata = plotData.expdata, logdata = plotData.logdata, poldata = plotData.poldata,
   straight_bool = plotData.straight_bool, exponential_bool = plotData.exponential_bool, logarithmic_bool = plotData.logarithmic_bool,
   polynomial_bool = plotData.polynomial_bool, label_x = plotData.label_x, label_y = plotData.label_y;

  data = JSON.parse(data);

  // set the stage
  var margin = {t:30, r:20, b:20, l:40 },
    w = $(document).width() - margin.l - margin.r,
    h = 500 - margin.t - margin.b,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([h - 60, 0]),
    color = d3.scale.category10();

  var svg = d3.select("#plot-panel").append("svg")
    .attr("width", w + margin.l + margin.r)
    .attr("height", h + margin.t + margin.b);

  var line = d3.svg.line()
  .interpolate("basis")
	.x(function(d) { return x(d.X); } )
	.y(function(d) { return y(d.Y); } );

  // set axes, as well as details on their ticks
  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(20)
    .tickSubdivide(true)
    .tickSize(6, 3, 0)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(20)
    .tickSubdivide(true)
    .tickSize(6, 3, 0)
    .orient("left");

  // group that will contain all of the plots
  var groups = svg.append("g").attr("transform", "translate(" + margin.l + "," + margin.t + ")");

  var max_X = d3.max(data, function(d) { return +d.X;} );
  var min_X = d3.min(data, function(d) { return +d.X;} );
  var max_Y = d3.max(data, function(d) { return +d.Y;} );
  var min_Y = d3.min(data, function(d) { return +d.Y;} );

  var x0 = Math.max(-d3.min(data, function(d) { return d.trust; }), d3.max(data, function(d) { return d.trust; }));
  x.domain([min_X, max_X]);
  y.domain([min_Y, max_Y]);

  // style the circles, set their locations based on data
  var circles =
  groups.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("class", "circles")
    .attr({
      cx: function(d) { return x(+d.X); },
      cy: function(d) { return y(+d.Y); },
      r: function(d) { return 4;},
    })
    .style("fill", function(d) { return color(d.cl); });

  // what to do when we mouse over a bubble
  var mouseOn = function() {
    var circle = d3.select(this);

  // transition to increase size/opacity of bubble
    circle.transition()
    .duration(800).style("opacity", 1)
    .attr("r", 16).ease("elastic");

    // append lines to bubbles that will be used to show the precise data points.
    // translate their location based on margins
    svg.append("g")
      .attr("class", "guide")
    .append("line")
      .attr("x1", circle.attr("cx"))
      .attr("x2", circle.attr("cx"))
      .attr("y1", +circle.attr("cy") + 26)
      .attr("y2", h - margin.t - margin.b)
      .attr("transform", "translate(40,20)")
      .style("stroke", circle.style("fill"))
      .transition().delay(200).duration(400).styleTween("opacity",
            function() { return d3.interpolate(0, 0.8); })

    svg.append("g")
      .attr("class", "guide")
    .append("line")
      .attr("x1", +circle.attr("cx") - 16)
      .attr("x2", 0)
      .attr("y1", circle.attr("cy"))
      .attr("y2", circle.attr("cy"))
      .attr("transform", "translate(40,30)")
      .style("stroke", circle.style("fill"))
      .transition().delay(200).duration(400).styleTween("opacity",
            function() { return d3.interpolate(0, 0.8); });

  // function to move mouseover item to front of SVG stage, in case
  // another bubble overlaps it
    d3.selection.prototype.moveToFront = function() {
      return this.each(function() {
      this.parentNode.appendChild(this);
      });
    };

    // skip this functionality for IE9, which doesn't like it
    var matched, browser;
    jQuery.uaMatch = function( ua ) {
      ua = ua.toLowerCase();

      var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
          /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
          /(msie) ([\w.]+)/.exec( ua ) ||
          ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
          [];

      return {
          browser: match[ 1 ] || "",
          version: match[ 2 ] || "0"
      };
    };

    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
      browser.webkit = true;
    } else if ( browser.webkit ) {
      browser.safari = true;
    }

    jQuery.browser = browser;

    if (!browser.msie) {
      circle.moveToFront();
      }
  };
  // what happens when we leave a bubble?
  var mouseOff = function() {
    var circle = d3.select(this);

    // console.log(circle.attr("id"));

    // go back to original size and opacity
    if(circle.attr("id") == "center"){
      circle.transition()
      .duration(800).style("opacity", 0.8)
      .attr("r", 8).ease("elastic");
    }
    else{
      circle.transition()
      .duration(800).style("opacity", 0.8)
      .attr("r", 4.5).ease("elastic");
    }

    // fade out guide lines, then remove them
    d3.selectAll(".guide").transition().duration(100).styleTween("opacity",
            function() { return d3.interpolate(0.8, 0); })
      .remove()
  };

  // run the mouseon/out functions
  circles.on("mouseover", mouseOn);
  circles.on("mouseout", mouseOff);

  // // tooltips (using jQuery plugin tipsy)
  // circles.append("title")
  //     .text(function(d) { return d.description; })

  $(".circles").tipsy({ gravity: 's', });

  // draw axes and axis labels
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin.l + "," + (h - 60 + margin.t) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
    .call(yAxis);

  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w)
    .attr("y", h - margin.t - 5)
    .style("font-size","10px")
    .text(label_x);

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -20)
    .attr("y", 45)
    .attr("dy", ".75em")
    .style("font-size","10px")
    .attr("transform", "rotate(-90)")
    .text(label_y);

    var legendData = [], color = [];

    if (straight_bool) {
      legendData.push("Straight");
      color.push("#dc3912");
      lindata = JSON.parse(lindata);
      svg.append("path")
          .datum(lindata)
          .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
          .attr("fill", "none")
          .attr("stroke", "#dc3912")
          .attr("stroke-width", "1.5px")
          .attr("d", line);
    }
    if (exponential_bool && expdata != "Singular Gradient") {
      legendData.push("Exponential");
      color.push("#ff9900");
      expdata = JSON.parse(expdata);
      svg.append("path")
          .datum(expdata)
          .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
          .attr("fill", "none")
          .attr("stroke", "#ff9900")
          .attr("stroke-width", "1.5px")
          .attr("d", line);
    }
    if (logarithmic_bool && logdata != "Singular Gradient") {
      legendData.push("Logarithmic");
      color.push("#109618");
      logdata = JSON.parse(logdata);
      svg.append("path")
          .datum(logdata)
          .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
          .attr("fill", "none")
          .attr("stroke", "#109618")
          .attr("stroke-width", "1.5px")
          .attr("d", line);
    }
    if (polynomial_bool && poldata != "Singular Gradient") {
      legendData.push("Polynomial");
      color.push("#990099");
      poldata = JSON.parse(poldata);
      svg.append("path")
          .datum(poldata)
          .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
          .attr("fill", "none")
          .attr("stroke", "#990099")
          .attr("stroke-width", "1.5px")
          .attr("d", line);
    }

    var legend = svg.selectAll(".legend")
        .data(legendData)
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", w - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) {return color[legendData.indexOf(d)]; });

    legend.append("text")
        .attr("x", w - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

}
