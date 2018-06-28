import React, {Component} from 'react';

class PlotWindow extends Component {
  render() {
    const url = this.props.path;
		if(url !== "")
    if(url !== "")
		{
			const jsonFile = new XMLHttpRequest();
			jsonFile.open("GET", url, true);
			jsonFile.send();
			jsonFile.onreadystatechange = function () {
				if (jsonFile.readyState === 4 && jsonFile.status === 200) {
					const plotHTML = jsonFile.responseText;
					const plotArr = plotHTML.split("<head>");

					//temp static stuff
					const squeezeFrame = '<head>\n<script type="text/javascript" src="js/libs/squeezeFrame.js"></script>\n<script type="text/javascript">\n\tmyContainer="localhost/Statistical Computing/components.html";\n\tmyMax=0.25;\n\tmyRedraw="both";\n</script>';

					const plotFrame = document.getElementById("plot-frame").contentWindow.document;

					plotFrame.open();
					plotFrame.write(plotArr[0] + squeezeFrame + plotArr[1]);
					plotFrame.close();
				}
			}
      return (
				<iframe id="plot-frame"></iframe>
			);
    }
    else {
			return (
				<iframe id="plot-frame"></iframe>
			);
		}
  }
}

export default PlotWindow;
