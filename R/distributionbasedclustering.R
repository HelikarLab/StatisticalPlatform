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

distributionbasedclustering <- function(data, classify) {
  library(jsonlite)
  data <- fromJSON(data)
  data <- na.omit(data)
  library(mclust)
  cl <- data[,grep(classify, names(data))]
  X <- data[,-grep(classify, names(data))]
  clPairs(X, cl)
  BIC <- mclustBIC(X)
  mod1 <- Mclust(X, x = BIC)
  plot(mod1, what = "classification")
}


