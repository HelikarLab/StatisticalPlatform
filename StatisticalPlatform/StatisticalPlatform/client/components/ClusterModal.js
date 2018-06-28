import React, {Component} from 'react';
import {Button, Input, Modal} from 'react-bootstrap';

class ClusterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custom_clusters: true
    };
  }
  render() {

    const options_list = [];

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

    return(
      <Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input type='checkbox' label='Group' ref='boolgrp' onChange={this.handleChange} />
					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>
					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>
					<Input type='text' label='Clusters' ref='clusters' disabled={this.state.custom_clusters} />
				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>

    );
  }
}

export default ClusterModal;
