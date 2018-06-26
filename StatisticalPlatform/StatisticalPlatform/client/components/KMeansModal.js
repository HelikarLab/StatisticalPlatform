import React, {Component} from 'react';

class KMeansModal extends Component {

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
		const k = this.refs.kvalue.getValue();
		if (k > 0 || parseFloat(k) === k >>> 0) {
			this.props.onRequestHide();
			this.props.onClick(
        this,
        this.refs.first.getValue(),
        this.refs.second.getValue(),
        this.refs.kvalue.getValue()
      );
		}
		else {
			alert("Value of 'K' is a positive integer");
		}
	}

  render() {

    const options_list = [];
		let inst = null;
    const bold_style = {'fontSize': '15', 'fontWeight': 'bold'};

		if (!this.state.showResults) {
			inst = <Button onClick={this.onClick}>i</Button>
		}
		else {
			inst = <p style = {bold_style}>Description:</p>;
		}

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});


    return(
      <Modal {...this.props} title="Kmeans Clustering">

				<div className='modal-body'>

					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>

					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>

					<Input type="number" label="Number of clusters (k)" ref="kvalue" pattern="[0-9]*" min = "1" step = "1"/>

					{inst}
					{ this.state.showResults ? <KMeansInstruction /> : null }
				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
    );
  }
}

class KMeansInstruction extends Component {
  render() {
    const style = {'fontFamily': 'DROID SANS MONO'};
    return(
      <div id="results" className="search-results">
      <p>{'Select two columns and k value i.e. number of clusters.'}</p>
      <table style = {style}>
        <tr>
          <td>{'library(ggplot2)'}</td>
        </tr>
        <tr>
          <td>{'ggplot(data, aes(var_x, var_y, color = Species)) + geom_point()'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default KMeansModal;
