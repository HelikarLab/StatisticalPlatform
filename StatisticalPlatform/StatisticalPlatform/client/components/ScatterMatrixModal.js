import React, {Component} from 'react';

class ScatterMatrixModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_group: true
    };
  }
  onClick() {
       this.setState({ showResults: true });
  }
  handleClick(){
		this.props.onRequestHide();
		this.props.onClick(this);
	}
  render()  {
    let inst = null;
    const bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

		if (!this.state.showResults) {
			inst = <Button onClick={this.onClick}>i</Button>
		}
		else {
			inst = <p style = {bold_style}>Description:</p>;
		}
    return(
      <Modal {...this.props} title="Scatter Matrix Plot">

				<div className='modal-body'>
				{inst}
				 { this.state.showResults ? <ScatterMatrixInstruction /> : null }
				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
    );
  }
}

class ScatterMatrixInstruction extends Component{
  render()  {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Input format: In the csv file of data add an extra column with column name as "Groups" which contains group of each data point.'}</p>
      <p>{'Input: '} <a href="./data/ScatterMatrix.csv" target="_blank">{"Sample Data"}</a></p>
      <table style = {style}>

        <tr>
          <td>{'library(graphics)'}</td>
        </tr>
        <tr>
          <td>{'pairs(data)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default ScatterMatrixModal;
