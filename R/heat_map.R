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


heat_map <- function(data = ""){

  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)

  rownames(data) <- as.vector(data[,1])
  data[,1] <- NULL
  data <- as.matrix(data)

  mat <- data

  t <- dim(mat)[2]

  V1 <- rep("R", t)
  V2 <- colnames(mat)
  columns <- data.frame(V1, V2)
  columns <- as.matrix(columns)

  index <- rownames(mat)

  out <- list(columns = columns, index = index, data = data)
  out <- toJSON(out)

  list(message = paste(out))
}
