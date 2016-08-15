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

function naiveBayesClassify(bundle, table) {

	console.log(bundle);
	ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R");

	ocpu.call("read.csv", {
		file: bundle.file
	}, function (session) {
		session.getObject(function (out) {
			console.log(out);

			var train = bundle.table.getData();
			var classify_var = bundle.classify_var;

			/*var train_y = train.map(function (d) {
				return d[classify_var];
			});

			var train_x = train;

			train_x.forEach(function (f) {
				delete f[classify_var];
			});

			console.log(JSON.stringify(train_x));
			console.log(JSON.stringify(train_y));
			*/
			ocpu.seturl("/ocpu/library/StatisticalPlatform");

			ocpu.call("classify", {
				fn: bundle.classify_type,
				train: train,
				ip:   out,
				split: classify_var
			}, function (session) {

				session.getObject(function (obj) {
					out.forEach(function (x, n) {
						x["output"] = obj[n];
					});
					console.log(out);
					console.log(Object.keys(out[0]));
					table.setHeaders(Object.keys(out[0]));
					table.setData(out);
					table.displayOn();
				});

			});
		});
	});
}

function evaluate(bundle, bar_ref) {

	var data = bundle.table.getData();
	var ratio = Number(bundle.ratio);
	console.log(bundle.ratio);

	shuffle(data);
	var test_index = Math.floor(data.length * ratio / 100);
	console.log(test_index);

	var classify_var = bundle.classify_var;

	var train = data.slice(0, test_index);
	var test = data.slice(test_index);

	/*var train_y = train.map(function (d) {
		return d[classify_var];
	})

	var test_y = test.map(function (d) {
		return d[classify_var];
	})

	var train_x = train;
	var test_x = test;

	train_x.forEach(function (f) {
		delete f[classify_var];
	});

	test_x.forEach(function (f) {
		delete f[classify_var];
	});

	console.log(JSON.stringify(train_x));
	console.log(JSON.stringify(train_y));
	console.log(JSON.stringify(test_x));
	console.log(JSON.stringify(test_y));
	*/

	ocpu.seturl("/ocpu/library/StatisticalPlatform");

	ocpu.call("myfn", {
		fn: bundle.classify_type,
		train: train,
		test: test,
		split: classify_var
	}, function (session) {
		session.getObject(function (obj) {
			console.log(obj);
			bar_ref.setText(bundle.classify_type + "_modal", "Precision: " + obj[0].precision + "; recall: " + obj[0].recall + "; F-score: " + obj[0].f_score);
		});
		session.getConsole(function (outtxt) {
			console.log(outtxt);
		})
	});
}

function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}
