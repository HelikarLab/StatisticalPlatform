import React, {Component} from 'react';

class QQPlotModal extends Component {

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
      this.refs.first.getValue(),
      this.refs.second.getValue()
    );
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
      <Modal {...this.props} title="QQ Plot">

        <div className='modal-body'>
          <Input type='select' label='Variable - X' ref='first'>
            {options_list}
          </Input>

          <Input type='select' label='Variable - Y' ref='second'>
            {options_list}
          </Input>

          {inst}
           { this.state.showResults ? <QQPlotInstruction /> : null }

        </div>

        <div className='modal-footer'>
          <Button onClick={this.handleClick}>Submit</Button>
        </div>

      </Modal>

    );
  }
}

class QQPlotInstruction extends Component {
  render() {

    const style = {'fontFamily': 'DROID SANS MONO'};

    return(
      <div id="results" className="search-results">
      <table style = {style}>
        <tr>
          <td>{'cor <- qqplot(data$var_x, data$var_y)'}</td>
        </tr>
        <tr>
          <td>{'ss <- smooth.spline(cor$y~cor$x, spar = 1)'}</td>
        </tr>
        <tr>
          <td>{'lines(ss$x, ss$y)'}</td>
        </tr>
      </table>
      </div>
    );
  }
}

export default QQPlotModal;
