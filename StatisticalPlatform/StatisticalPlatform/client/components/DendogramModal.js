import React, {Component} from 'react';

class DendogramModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResults: false
    };
  }

  onClick() {
       this.setState({ showResults: true });
  }

  handleClick() {
		this.props.onRequestHide();
		this.props.onClick(this);
		}

  render() {
    let inst = null;
    const bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

		if (!this.state.showResults) {
			inst = <Button onClick={this.onClick}>i</Button>
		}
		else {
			inst = <p style = {bold_style}>Description:</p>;
		}
    return(
      <Modal {...this.props} title="Dendogram">

				<div className='modal-body'>

					{inst}
					 { this.state.showResults ? <DendogramInstruction /> : null }
				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>
			</Modal>
    );
  }
}

class DendogramInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Input format: The csv file of data should contain a column of rows.'}</p>
      <p>{'Input: '} <a href="./data/dendogram.csv" target="_blank">{"Sample Data"}</a></p>
      <table style = {style}>

        <tr>
          <td>{'distance <- dist(data, method = "eucledian")'}</td>
        </tr>
        <tr>
          <td>{'hc <- hclust(distance, method = "complete")'}</td>
        </tr>
        <tr>
          <td>{'plot(hc)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default DendogramModal ;
