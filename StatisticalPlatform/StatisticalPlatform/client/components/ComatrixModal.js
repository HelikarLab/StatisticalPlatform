import React, {Component} from 'react';

class ComatrixModal extends Component {

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
		this.props.onClick(
      this,
      this.refs.comatrix.getValue()
    );
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
      <Modal {...this.props} title="Correlation and Covariance Plots">

        <div className='modal-body'>
          <Input type='select' label='Choose Analyses' ref='comatrix'>
            <option value="cor">Correlation Plot</option>
            <option value="cov">Covariance Plot</option>
          </Input>

          {inst}
           { this.state.showResults ? <ComatInstruction /> : null }
        </div>

        <div className='modal-footer'>
          <Button onClick={this.handleClick}>Submit</Button>
        </div>

      </Modal>
    );
  }
}

class ComatInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Input format: The csv file of data should contain a column of rows.'}</p>
      <p>{'Input: '} <a href="./data/comatrix.csv">{"Sample Data"}</a></p>
      <table style = {style}>
        <tr>
          <td>{'mat <- cor(data) 	# cov(data)'}</td>
        </tr>
        <tr>
          <td>{'heatmap(mat)'}</td>
        </tr>
      </table>
      </div>

    );
  }
}

export default ComatrixModal;
