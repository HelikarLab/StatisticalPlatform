import React, {Component} from 'react';

class BivariateModal extends Component {
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

    const label_x = 'Variable - X (' + options_list.length + ')', label_y = 'Variable - Y (' + options_list.length + ')';

    return(
      <Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input type='select' label={label_x} ref='first'>
						{options_list}
					</Input>
					<Input type='select' label={label_y} ref='second'>
						{options_list}
					</Input>
					<Input type='select' label='Functions' ref='fn' multiple>
						<option value='cov'>Covariance</option>
						<option value='cor'>Correlation</option>
					</Input>
				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>
    );
  }
}

export default BivariateModal;
