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

regression <- function(data, var_s){
  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)
  data <- data[var_s]
  colnames(data)[1] <- "x"

  col1 <- rep(data$x, dim(data)[2] - 1)
  col2 <- data
  col2$x <- NULL
  col2 <- unlist(col2)
  cl <- rep(1:(dim(data)[2]-1), each = dim(data)[1])
  scatterdata <- cbind(X = col1, Y = col2)
  scatterdata <- cbind(description = rownames(scatterdata), scatterdata, cl = cl)
  rownames(scatterdata) <- 1:nrow(scatterdata)
  scatterdata <- data.frame(scatterdata)
  scatterdata <- toJSON(scatterdata)

  formula <- as.formula(paste("x~",paste(var_s[-1],collapse="+")))
  fit <- lm(formula, data = data)
  co <- fit$coefficients

  x <- data$x
  data$x <- NULL

  data <- cbind(intercept = rep(1, dim(data)[1]), data)
  y <- co*data
  y <- rowSums(data)

  linedata <- cbind(X = x, Y = y)
  linedata <- data.frame(linedata)
  linedata <- linedata[order(linedata$X), ]
  linedata <- sapply(linedata, as.character)
  linedata <- data.frame(linedata)
  linedata <- toJSON(linedata)

  list(scatterdata = paste(scatterdata), linedata = paste(linedata))
}
