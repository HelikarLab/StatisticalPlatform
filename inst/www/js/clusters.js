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

function kmeansCluster(bundle) {
	var clusters = parseInt(bundle.clusters);
	var hot = bundle.table;
	var var_x = bundle.vars.x, var_y = bundle.vars.y;

	ocpu.seturl("//public.opencpu.org/ocpu/library/base/R");
	var frame = new ocpu.Snippet("head(data.frame(jsonlite::fromJSON('" + JSON.stringify(hot.getData()) + "')), -1)");

	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");
	var req = ocpu.call("kmeans", {
		x: frame,
		centers: clusters
	}, function(session) {
		session.getObject(null, {force: true}, function (obj) {
			ocpu.seturl("//public.opencpu.org/ocpu/library/base/R");
			ocpu.call("identity", {
				//x: new ocpu.Snippet("data.frame(cluster=jsonlite::fromJSON('" + JSON.stringify(obj) + "')$cluster)")
				x: new ocpu.Snippet("data.frame(na.omit(jsonlite::fromJSON('" + JSON.stringify(hot.getData()) + "')),cluster=jsonlite::fromJSON('" + JSON.stringify(obj) + "')$cluster)")
			}, function(session2) {
				session2.getObject(function (obj2) {
					makePlot(null, {type: "scatterChart", data: obj2, var_x: var_x, var_y: var_y, var_g: "cluster"});
				});
			});
			console.log(obj);
		});
	});
}

function hierarchicalCluster(bundle) {

	var table = bundle.table;
	var var_x = bundle.vars.x, var_y = bundle.vars.y;

	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

	ocpu.call("hclust", {
		d: new ocpu.Snippet("dist(head(data.frame(jsonlite::fromJSON('" + JSON.stringify(table.getData()) + "')), -1))")
	}, function (session) {
		session.getObject(null, {force: true}, function (obj) {
			console.log(obj);

			ocpu.seturl("//public.opencpu.org/ocpu/library/ggdendro/R");

			/*
			var HCtoJSON = new ocpu.Snippet (
				"\
				labels <- jsonlite::fromJSON('" + JSON.stringify(obj.labels) + "');\
				merge  <- data.frame(jsonlite::fromJSON('" + JSON.stringify(obj.merge) + "'));\
				for (i in (1:nrow(merge))) {\n\
				    if (merge[i,1]<0 & merge[i,2]<0) {\n\
				    	eval(parse(text=paste0('node', i, '<-list(name=\"node', i, '\", children=list(list(name=labels[-merge[i,1]]),list(name=labels[-merge[i,2]])))')));\
				    }\n\
				    else if (merge[i,1]>0 & merge[i,2]<0) {\n\
				    	eval(parse(text=paste0('node', i, '<-list(name=\"node', i, '\", children=list(node', merge[i,1], ', list(name=labels[-merge[i,2]])))')));\
				    }\n\
			        else if (merge[i,1]<0 & merge[i,2]>0) {\n\
			        	eval(parse(text=paste0('node', i, '<-list(name=\"node', i, '\", children=list(list(name=labels[-merge[i,1]]), node', merge[i,2],'))')));\
			        }\n\
		            else if (merge[i,1]>0 & merge[i,2]>0) {\n\
		            	eval(parse(text=paste0('node', i, '<-list(name=\"node', i, '\", children=list(node', merge[i,1], ', node', merge[i,2], '))')));\
		            }\n\
			  	};\
				eval(parse(text=paste0('JSON<-jsonlite::toJSON(node', nrow(merge), ')')));\
				return(JSON);\
				"
			);
			*/

			var getPlot = new ocpu.Snippet (
				"\
				temp <- jsonlite::fromJSON('" + JSON.stringify(obj) + "');\
				temp2 <- c(1, 2, 3);\
				class(temp) <- 'hclust';\
				return(temp);\
				"
				);

			$("#temp_plot_thing").rplot("ggdendrogram", {
				data: getPlot
			}, function (session2) {
				session2.getObject(function (obj2) {
					//plotHierarchical(obj2);
					console.log(obj2);
				});
			});
		});
	});
}

function densityCluster(bundle) {
	var minpts = parseInt(bundle.clusters);
	var eps = parseInt(bundle.eps);
	var hot = bundle.table;
	var var_x = bundle.vars.x, var_y = bundle.vars.y;

	ocpu.seturl("//public.opencpu.org/ocpu/library/base/R");
	var frame = new ocpu.Snippet("head(data.frame(jsonlite::fromJSON('" + JSON.stringify(hot.getData()) + "')), -1)");

	ocpu.seturl("//public.opencpu.org/ocpu/library/fpc/R");
	var req = ocpu.call("dbscan", {
		data: frame,
		MinPts: minpts,
		eps: eps
	}, function(session) {
		session.getObject(null, {force: true}, function (obj) {
			ocpu.seturl("//public.opencpu.org/ocpu/library/base/R");
			ocpu.call("identity", {
				//x: new ocpu.Snippet("data.frame(cluster=jsonlite::fromJSON('" + JSON.stringify(obj) + "')$cluster)")
				x: new ocpu.Snippet("data.frame(na.omit(jsonlite::fromJSON('" + JSON.stringify(hot.getData()) + "')),cluster=jsonlite::fromJSON('" + JSON.stringify(obj) + "')$cluster)")
			}, function(session2) {
				session2.getObject(function (obj2) {
					makePlot(null, {type: "scatterChart", data: obj2, var_x: var_x, var_y: var_y, var_g: "cluster"});
				});
			});
			console.log(obj);
		});
	});
}
