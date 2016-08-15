#copyright 2016 Helikar Lab

#Developed by Shubham Kumar, Vinit Ravishankar and Akram Mohammed

#This program is free software: you can redistribute it and/or modify it under
#the terms of the GNU General Public License as published by the Free Software
#Foundation, either version 3 of the License, or (at your option) any later
#version. This program is distributed in the hope that it will be useful, but
#WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
#FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
#details. You should have received a copy of the GNU General Public License
#along with this program. If not, see <http://www.gnu.org/licenses/>

kmeansCluster <- function(data, var_x, var_y, kvalue){

  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)
  data <- data[c(var_x, var_y)]
  colnames(data) <- c("X", "Y")

  cl <- kmeans(x = data, centers = kvalue)

  data <- cbind(description = c(1:dim(data)[1]), data, cl = cl$cluster)

  center <- cl$centers
  colnames(center) <- c("X", "Y")
  center <- cbind(description = rep("center", dim(center)[1]), center, cl = c(1:dim(center)[1]))

  data <- merge(data, center, all = TRUE)

  kmeansdata <- toJSON(data)
  list(message = paste(kmeansdata))
}
