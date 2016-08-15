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

#' Return arg + 1
#'
#' @export
#' @import e1071
#' @import stats
#' @param tr_x train x
#' @param te_x test x
myfn <- function(fn, train, test, split) {
	tr_x <- subset(train, select=-get(split));
	tr_y <- subset(train, select=get(split))[,1];
	te_x <- subset(test, select=-get(split));
	te_y <- subset(test, select=get(split))[,1];

	if(fn != "hpart") {
		t <- table(predict(get(fn)(tr_x, as.factor(tr_y)), te_x), te_y);
	}	else {
		t <- table(predict(get(fn)(rpart(get(split) ~ ., data=train, method="class")), te_x), te_y);
	}
	tp <- t[1];
	fp <- t[2];
	fn <- t[3];
	tn <- t[4];
	p <- tp / (tp + fp);
	r <- tp / (tp + fn);
	f <- 2 * p * r / (p + r);
	d <- data.frame(precision = p, recall = r, f_score = f);
	return(d);
}
