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

/*global Handsontable, ocpu, Papa, Blob, saveAs*/

// column class (for preprocessing)
function Column(functionName, preCol) {

    var sum = 0;
    var i;

    this.functionName = functionName;
    this.preCol = preCol;
    this.mean = this.preCol.reduce(function (a, b) { return a + b; }, 0) / this.preCol.length;

    for (i = 0; i < this.preCol.length; i++) {
        sum += Math.pow(this.preCol[i] - this.mean, 2);
    }

    this.variance = sum / this.preCol.length;
    this.sd = Math.sqrt(this.variance);

    // apply function by name
    this.applyFunction = function () {
        console.log(this.sd);
        return this[this.functionName]();
    };

    // Feature scaling
    this.fscale = function () {
        var min = Math.min.apply(null, this.preCol);
        var max = Math.max.apply(null, this.preCol);
        return this.preCol.map(function (elem) {
            return (elem - min) / (max - min);
        });
    };
}

function createOption(name, axis) {
    var plotVariableSelect = document.getElementById("variable-select-" + axis);
    var plotVariableOption = document.createElement("option");
    plotVariableOption.text = name;
    plotVariableOption.setAttribute("name", "variable-" + axis);
    plotVariableOption.setAttribute("id", name);
    plotVariableSelect.add(plotVariableOption);
}

// Create radio buttons for variables to be plotted
/*function createRadio(name, axis) {
    var plotVariableDiv, plotVariableCheck, plotVariableLabel;
    plotVariableDiv = document.getElementById("variable-div-" + axis);
    plotVariableCheck = document.createElement("input");
    plotVariableCheck.setAttribute("type", "radio");
    plotVariableCheck.setAttribute("name", "variable-" + axis);
    plotVariableCheck.setAttribute("id", name);
    plotVariableLabel = document.createElement("label");
    plotVariableLabel.appendChild(document.createTextNode("\n" + name));
    plotVariableLabel.setAttribute("for", name);
    plotVariableDiv.appendChild(plotVariableCheck);
    plotVariableDiv.appendChild(plotVariableLabel);
}*/


// Get selected option
function getOption(axis) {
    var select = document.getElementById("variable-select-" + axis);
    return select.options[select.selectedIndex].value;
}

// Get checked variables in the pane
/*
function getOption(axis) {
    var i;
    var boxes = document.getElementsByName("variable-" + axis);
    for (i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            return boxes[i];
        }
    }
}
*/

function getPlotType() {
    var types = document.getElementsByName("plot-type");
    for (i = 0; i < types.length; i++) {
        if (types[i].checked) {
            return i;
        }
    }
}

window.onload = function () {


    var preColumnNum;
    var container = document.getElementById("hot");

    /*global Handsontable*/
    var hot = new Handsontable(container, {
        colHeaders: true,
        minSpareRows: 1,
        contextMenu: true,
        stretchH: "all"
    });

    $("#submit-button").click(function () {

        /*global ocpu*/
        ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R");

        var myFile = $("#input-file")[0].files[0];

        if (!myFile) {
            alert("No file selected.");
            return;
        }

        $("#submit-button").attr("disabled", "disabled");

        var uploadRequest = ocpu.call("read.csv", {
            "file": myFile
        }, function (session) {

            ocpu.seturl("//public.opencpu.org/ocpu/library/base/R");

            session.getObject(function (out) {
                // WATCH
                var headers = Object.keys(out[0]);

                hot.updateSettings({
                    colHeaders: function (col) {
                        // GHETTO - change later if necessary
                        // Sets markup of each column header
                        return "<b>" + headers[col] + "</b>" + "<button class='mod_button' name='" + col + "' style='margin-left: 10%;'>\u25BC</button>";
                    }
                });

                // add click event to header buttons
                Handsontable.Dom.addEvent(container, 'click', function (event) {
                    if (event.target.className === 'mod_button') {
                        var preDiv = document.getElementById("pre-button-div");

                        // slide up current div to show a visual change
                        $(preDiv).slideUp("fast");
                        $(preDiv).slideDown("slow");

                        // TODO: remove global scope
                        preColumnNum = Number(event.target.getAttribute("name"));
                    }
                });

                // load data
                hot.loadData(out);

                // get fields, create radio buttons
                var radioRequest = ocpu.call("colnames", {
                    x: new ocpu.Snippet("data.frame(jsonlite::fromJSON('" + JSON.stringify(out) + "'))")
                }, function (fieldsession) {
                    fieldsession.getObject(function (obj) {
                        var i;
                        for (i = 0; i < obj.length; i++) {
                            /*createRadio(obj[i], "x");
                            createRadio(obj[i], "y");*/
                            createOption(obj[i], "x");
                            createOption(obj[i], "y");
                            createOption(obj[i], "group");
                        }
                    });
                });

                radioRequest.fail(function () {
                    alert(radioRequest.responseText);
                });

            });
        });

        uploadRequest.fail(function () {
            alert("Fail: " + uploadRequest.responseText);
        });

        uploadRequest.always(function () {
            $("#submit-button").removeAttr("disabled");
        });
    });

    $("#plot-button").click(function () {

        ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R");

        var myFile = $("#input-file")[0].files[0];

        if (!myFile) {
            alert("No file selected.");
            return;
        }

        $("#submit-button").attr("disabled", "disabled");

        var readRequest = ocpu.call("read.csv", {
            "file": myFile
        }, function (session) {

            ocpu.seturl("//public.opencpu.org/ocpu/library/base/R");

            session.getObject(function () {
                // plot functions
                ocpu.seturl("//ramnathv.ocpu.io/rCharts/R");

                var requestText = "";
                var plotNumber = getPlotType();

                switch(plotNumber) {
                    case 0:
                        requestText = "nPlot(" + getOption("y") + " ~ " + getOption("x") + ", data = data.frame(jsonlite::fromJSON('" + JSON.stringify(hot.getData()) + "')), type = 'scatterChart')\n";
                    break;
                    case 1:
                        requestText = "nPlot(" + getOption("y") + " ~ " + getOption("x") + ", data = data.frame(jsonlite::fromJSON('" + JSON.stringify(hot.getData()) + "')), type = 'lineChart')\n";
                    break;
                    case 2:
                        requestText = "nPlot(" + getOption("y") + " ~ " + getOption("x") + ", group = '" + getOption("group") + "', data = data.frame(jsonlite::fromJSON('" + JSON.stringify(hot.getData()) + "')), type = 'multiBarChart')\n";
                    break;

                    // Add the rest with placeholder groups
                }

                var plotRequest = ocpu.call("make_chart", {
                    text: requestText
                }, function (session2) {
                    session2.getConsole(function () {

                        // plot is saved in this file
                        var url = session2.getLoc() + "files/output.html";
                        var jsonFile = new XMLHttpRequest();

                        // get output file
                        jsonFile.open("GET", url, true);
                        jsonFile.send();
                        jsonFile.onreadystatechange = function () {
                            if (jsonFile.readyState === 4 && jsonFile.status === 200) {
                                // get HTML content of file
                                var plotHTML = jsonFile.responseText;
                                var plotArr = plotHTML.split("<head>");
                                var plotFrame = document.getElementById("plot-frame").contentWindow.document;

                                // squeezeframe.js code to be injected
                                var squeezeFrame = '<head>\n<script type="text/javascript" src="js/squeezeFrame.js"></script>\n<script type="text/javascript">\n\tmyContainer="localhost/Helikar/index.html";\n\tmyMax=0.25;\n\tmyRedraw="both";\n</script>';

                                // open iframe to write to
                                plotFrame.open();
                                plotFrame.write(plotArr[0] + squeezeFrame + plotArr[1]);
                                plotFrame.close();
                            }
                        };
                    });
                });

                plotRequest.fail(function () {
                    alert(plotRequest.responseText);
                });

            });
        });

        readRequest.fail(function () {
            alert("Fail: " + readRequest.responseText);
        });

        readRequest.always(function () {
            $("#submit-button").removeAttr("disabled");
        });
    });

    $("#save-button").click(function () {
        var dataJSON = JSON.stringify(hot.getData());
        var dataCSV = Papa.unparse(dataJSON);
        var dataBlob = new Blob([dataCSV], {
            type: 'text/plain'
        });
        saveAs(dataBlob, "temp2.csv");
    });

    // preprocessing buttons

    $(".pre-button").click(function (event) {
        var i;
        var buttonID = event.target.id;
        console.log(buttonID);
        var preColArr = hot.getDataAtCol(preColumnNum).filter(function (elem) {
            return elem !== null;
        });
        preColArr = new Column(buttonID, preColArr);
        var postColArr = preColArr.applyFunction();
        for (i = 0; i < postColArr.length; i++) {
            hot.setDataAtCell(i, preColumnNum, postColArr[i]);
        }
    });
};
