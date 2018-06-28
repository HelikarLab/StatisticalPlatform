import React, {Component} from 'react';
import {Button, Input, Modal} from 'react-bootstrap';

class URLModal extends Component {

  handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(
      this,
      this.refs.url.getValue()
    );
	}

  render() {
    return (
      <Modal {...this.props} title="Input URL">

        <div className='modal-body'>
					<Input type='url' label='JSON file' ref='url' />
				</div>

        <div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>

    );
  }
}

export default URLModal;
