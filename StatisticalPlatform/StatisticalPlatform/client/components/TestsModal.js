import React, {Component} from 'react';

class TestsModal extends Component {

  handleClick() {
		this.props.onRequestHide();
		this.props.onClick(
      this,
      this.refs.first.getValue(),
      this.refs.second.getValue(),
      this.refs.fn.getValue()
    );
	}

  render(){
    const options_list = [];

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

    return(
      <Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>
					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>
					<Input type='select' label='Functions' ref='fn' multiple>
						<option value='welch'>Welch t-test</option>
						<option value='student'>Student t-test</option>
						<option value='paired'>Paired student t-test</option>
					</Input>
				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>
    );
  }
}

export default TestsModal;
