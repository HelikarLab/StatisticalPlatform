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

var Alert = ReactBootstrap.Alert;
var Navbar = ReactBootstrap.Navbar,
Button = ReactBootstrap.Button,
Nav = ReactBootstrap.Nav,
NavItem = ReactBootstrap.NavItem,
DropdownButton = ReactBootstrap.DropdownButton,
MenuItem = ReactBootstrap.MenuItem,
Modal = ReactBootstrap.Modal,
ModalTrigger = ReactBootstrap.ModalTrigger,
Input = ReactBootstrap.Input,
Panel = ReactBootstrap.Panel,
Row = ReactBootstrap.Row,
Col = ReactBootstrap.Col;

function getOption(axis) {
	var select = document.getElementById("variable-select-" + axis);
	return select.options[select.selectedIndex].value;
}

function Column(preCol) {

    var i;

    this.preCol = preCol;
    this.sortedCol = preCol;
    this.sortedCol.sort();
    this.mean = this.preCol.reduce(function (a, b) { return a + b; }, 0) / this.preCol.length;
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

    this.getCentralMoment = function(n) {
    	var sum = 0;
    	for (i = 0; i < this.preCol.length; i++) {
    		var temp = Math.pow(this.preCol[i] - this.mean, n);
        	sum += temp;
        }
        return sum / (this.preCol.length - 1);
    }

    this.subtractMean = function() {
        var sum = [];
        this.preCol.forEach(function (elem) {
            sum.push(elem - this.mean);
        }.bind(this));
        return sum;
    }

    this.variance = this.getCentralMoment(2);
    this.sd = Math.sqrt(this.variance);


    this.skewness = this.getCentralMoment(3) / Math.pow(this.sd, 3);
    this.kurtosis = this.getCentralMoment(4) / Math.pow(this.sd, 4);

    // apply function by name
    this.applyFunction = function (functionName) {
        return this[functionName]();
    };

    this.getProperty = function(functionName) {
    	return this[functionName];
    }

    this.getLength = function() {
    	return this.preCol.length;
    }

    // Feature scaling
    this.fscale = function () {
        var min = Math.min.apply(null, this.preCol);
        var max = Math.max.apply(null, this.preCol);
        return this.preCol.map(function (elem) {
            return (elem - min) / (max - min);
        });
    };
}

function getIndex(table, str) {
	var headers = table.getColHeader();
	for(var i = 0; i < headers.length; i++) {
		if(headers[i].indexOf(str) > -1) {
			return i;
		}
	}
}

function getSanitizedData(table, column)
{
    var preColArr = table.getDataAtCol(column).map(function (elem) {
        return parseInt(elem);
    });

    preColArr = preColArr.filter(function (elem) {
        return !isNaN(elem);
    });

    return preColArr;
}

function getDataAtIndex(table, label)
{
    return getSanitizedData(table, getIndex(table, label));
}

function MultiCol(firstCol, secondCol) {
	this.firstCol = firstCol;
	this.secondCol = secondCol;

	this.cov = function() {
		var firstCol = this.firstCol.subtractMean();
        var secondCol = this.secondCol.subtractMean();

        console.log(firstCol);
        console.log(secondCol);

        firstCol = firstCol.map(function (elem, index) {
            return elem * secondCol[index] / firstCol.length;
        });

        console.log(firstCol);

        return firstCol.reduce(function (x, y) {
            return x + y;
        });
	}

	this.applyFunction = function(functionName) {
		return this[functionName]();
	};
}

React.render(<WholeThing />, document.body);
