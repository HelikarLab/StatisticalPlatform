import React, {Component} from 'react';
import {Button, Input, Modal} from 'react-bootstrap';

class SVMModal extends Component {

  setText(text) {
		document.getElementById("eval").innerHTML = text;
	}

  handleClick() {
		this.props.onRequestHide();
		console.log(this.refs.file.getInputDOMNode().files[0]);
		this.props.onClick(
      this, this.refs.vars.getValue(),
      this.refs.file.getInputDOMNode().files[0],
      false
    );
	}

	evalClick() {
		this.props.onClick(this,
      this.refs.vars.getValue(),
      null,
      true,
      this.refs.tsize.getValue()
    );
	}

  render() {
    const options_list = [];

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});
    return (
      <Modal {...this.props} title="Choose data">
				<div className='modal-body'>

					<Input type='select' label='Output column' ref='vars'>
						{options_list}
					</Input>

					<Input type='text' label='Training set size (%)' ref='tsize' />

					<div id="eval"></div>

					<Button onClick={this.evalClick}>Evaluate</Button>

				    <Input type='file' label='File' ref='file' />

				</div>

		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>

			</Modal>
    );
  }
}

export default SVMModal;
