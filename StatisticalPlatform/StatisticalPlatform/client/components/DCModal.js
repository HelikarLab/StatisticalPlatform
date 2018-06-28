import React, {Component} from 'react';
import {Button, Input, Modal, Row, Col} from 'react-bootstrap';

class DCModal extends Component {
  render() {

    const options_list = [];
		const wololo="enabled";

		this.props.variables.forEach( (variable) => {
			options_list.push(<option value={variable}>{variable}</option>);
		});

    handleClick() {
  		const count = 0;

  		Object.keys(this.refs).forEach(function (ref) {
  			if(this.refs[ref].props.type == "checkbox" && this.refs[ref].getChecked())
  				count++;
  		}.bind(this));

  		this.props.onRequestHide();
  		this.props.onClick(this, count, {
  			// TODO - remove bar and bubble entirely
  			bar: true,
  			bubble: true,
  			bar_vars: {x: this.refs.bar_x.getValue(), y: this.refs.bar_y.getValue()},
  			bubble_vars: {x: this.refs.bubble_x.getValue(), y: this.refs.bubble_y.getValue(), g: this.refs.bubble_g.getValue()}
  		});
  	}
    return(
      <Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input>


						<Row>
							<Col xs={6}>
								<h2>Bar chart</h2>
							</Col>
							<Col xs={6}>
								<h2>Bubble chart</h2>
							</Col>
						</Row>

						<Row>
							<Col xs={6}>
								<Input type='select' label='Variable - X' ref='bar_x' >
									{options_list}
								</Input>
							</Col>
							<Col xs={6}>
								<Input type='select' label='Variable - X' ref='bubble_x' >
									{options_list}
								</Input>
							</Col>
						</Row>

						<Row>
							<Col xs={6}>
								<Input type='select' label='Variable - Y' ref='bar_y' >
									{options_list}
								</Input>
							</Col>
							<Col xs={6}>
								<Input type='select' label='Variable - Y' ref='bubble_y' >
									{options_list}
								</Input>
							</Col>
						</Row>

						<Row>
							<Col xs={6}>
							</Col>
							<Col xs={6}>
								<Input type='select' label='Group' ref='bubble_g' >
									{options_list}
								</Input>
							</Col>
						</Row>

					</Input>
				</div>
		        <div className='modal-footer'>
    			    <Button onClick={this.handleClick}>Submit</Button>
        		</div>
			</Modal>

    );
  }
}

export default DCModal;
