import React, {Component} from 'react';
import {Button, Input, Modal} from 'react-bootstrap';

class DensityClusterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custom_clusters: true
    };
  }

  handleClick() {
    this.props.onRequestHide();
      this.props.onClick(
        this,
        this.first.value,
        this.second.value,
        this.minpts.value,
        this.eps.value
      );
  }

  handleChange() {
    this.setState({custom_clusters: !this.state.custom_clusters});
  }

  render() {

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
					<Input type='text' label='Minimum points' ref='minpts' />
					<Input type='text' label='Epsilon'	ref='eps' />
				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>

    );
  }
}

export default DensityClusterModal;
