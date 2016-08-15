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

simpleBar <- function(data = "", value = ""){

  library(jsonlite)

  data <- fromJSON(data)

  colnames(data)[1] <- "Group"
  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  l <- dim(data)[1]
  data <- data[1:l-1, ]

  Group <- data$Group
  data <- data[value]
  data <- cbind(Group, data)
  colnames(data) <- c('Group', 'value')

  json_string <- toJSON(data)
  list(message = paste(json_string))
}
