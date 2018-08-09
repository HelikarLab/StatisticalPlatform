#copyright 2018 Helikar Lab

#Developed by Achilles Gasper Rasquinah, Tejasav Khattar,Shubham Kumar, Vinit Ravishankar and Akram Mohammed

#This program is free software: you can redistribute it and/or modify it under
#the terms of the GNU General Public License as published by the Free Software
#Foundation, either version 3 of the License, or (at your option) any later
#version. This program is distributed in the hope that it will be useful, but
#WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
#FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
#details. You should have received a copy of the GNU General Public License
#along with this program. If not, see <http://www.gnu.org/licenses/>

densitybasedclustering <- function(data, var_x, var_y, eps, MinPts) {
  library(jsonlite)
  data <- fromJSON(data)
  data <- na.omit(data)
  var_x <- data[,var_x]
  var_y <- data[,var_y]
  df <- cbind(var_x,var_y)
  library("fpc")
  db <- fpc::dbscan(df, eps, MinPts)
  library(factoextra)
  fviz_cluster(db, data = df, stand = FALSE,
               ellipse = FALSE, show.clust.cent = FALSE,
               geom = "point",palette = "jco", ggtheme = theme_classic())
}


