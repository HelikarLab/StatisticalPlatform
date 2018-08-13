import React, {Component} from 'react';
import {Button, Input, Modal} from 'react-bootstrap';

class RegressionModal extends Component {
  handleClick() {
		this.props.onRequestHide();
		this.props.onClick(
      this,
      this.refs.varx.getValue(),
      this.refs.vars.getValue()
    );
	}
  render() {

    const options_list = [];

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		var label = 'Variables (' + options_list.length + ')';
    return (
      <Modal {...this.props} title="Regression Analysis">
				<div className='modal-body'>

          <Input type='select' label='Response Variable' ref='varx'>
            {options_list}
          </Input>

					<Input type= 'select' label={label} ref='vars' multiple>
						{options_list}
					</Input>
				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>

    );
  }
}

export default RegressionModal;
