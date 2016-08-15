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

q_qplot <- function(data, var_x, var_y){

  library(jsonlite)

  data <- fromJSON(data)

  data <- na.omit(data)
  data <- data[c(var_x, var_y)]
  colnames(data) <- c("X", "Y")

  cor <- qqplot(data$X, data$Y)
  data <- data.frame(X = cor$x, Y = cor$y)
  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  qqdata <- toJSON(data)

  ss <- smooth.spline(cor$y~cor$x, spar = 1)
  data <- data.frame(X = ss$x, Y = ss$y)
  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  linedata <- toJSON(data)

  list(qqdata = paste(qqdata), linedata = paste(linedata))
}
