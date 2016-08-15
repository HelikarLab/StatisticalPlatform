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

dendogram <- function(data = ""){

library(jsonlite)

json_file <- data
json_file <- fromJSON(json_file)

json_file <- lapply(json_file, function(x) {
  x[sapply(x, is.null)] <- NA
  unlist(x)
})

data <- do.call("cbind", json_file)
data <- data.frame(data)
data <- na.omit(data)
rownames(data) <- as.vector(data[ ,1])
data[,1] <- NULL
d <- dist(data)
hc <- hclust(d)

#plot(hc)

#names(hc)
mergeData <- data.frame(hc$merge)
lableData <- hc$labels
size <- dim(mergeData)
storeData <- c(1:size[1])

for (i in 1:size[1]) {
  index1 <- mergeData$X1[i]
  index2 <- mergeData$X2[i]

  if (index1 < 0 & index2 < 0) {
    string <- paste('{"name": "","children":[{"name":"',
                    lableData[-index2], '"},{"name":"',lableData[-index1],'"}]}',
                    collapse = "")
  }
  else if (index1 > 0 & index2 > 0) {
    string <- paste('{"name": "","children":[',
                    storeData[index1], ',',storeData[index2],']}',
                    collapse = "")
  }
  else if (index1 > 0 & index2 < 0) {
    string <- paste('{"name": "","children":[',
                    storeData[index1], ',{"name":"',lableData[-index2],'"}]}',
                    collapse = "")
  }
  else if (index1 < 0 & index2 > 0) {
    string <- paste('{"name": "","children":[{"name":"',
                    lableData[-index1],'"},',storeData[index2],']}',
                    collapse = "")
  }
  storeData[i] <- string
}
list(message = paste(storeData[size[1]]))
}
