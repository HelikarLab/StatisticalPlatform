import React, {Component} from 'react';

class AnovaModal extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onRequestHide();
    this.props.onClick(
      this, this.refs.vars.getValue(),
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

					<Input type='select' label='Variables' ref='vars' multiple>
						{options_list}
					</Input>

					<Input type='select' label='Functions' ref='fn' multiple>
						<option value='anova'>ANOVA</option>
					</Input>



				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>

    );
  }
}

export default AnovaModal;
