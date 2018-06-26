import React, {Component} from 'react';

class DashboardModal extends Component {

  handleClick (id) {
    this.props.onRequestHide();
		if (id > 0)
			this.props.onClick(this, id);
		else
			this.props.onClick(this);
  }

  render() {

    const button_list = [];

    const plotId = getDashboardOptionIds();
    const plotType = getDashboardOptionType();
    const plotTime = getDashboardOptionTime();
    const count = plotId.length;

    const button_style = {"width": "100%"};
    const text_style = {"text-align": "center", "top": "6px"};

    if (count == 0) {
      return (
        <Modal {...this.props} title="Dashboard">
          <div className='modal-body'>

            No analysis done yet!!!

          </div>
          <div className='modal-footer'>
            <Button onClick={this.handleClick}>Submit</Button>
          </div>
        </Modal>
      );
    }

    for(var i = 1; i <= count; i = i + 1){
      button_list.push(
        <Row>
          <Col xs={6}>
            <Button style = {button_style} onClick={this.handleClick.bind(this, plotId[i-1])} value={plotId[i-1]}>{plotType[i-1]}</Button>
          </Col>
          <Col xs={6} style = {text_style}>
            {plotTime[i-1]}
          </Col>
        </Row>
      );
    }

    return(
      <Modal {...this.props} title="Dashboard">
				<div className='modal-body'>
					{button_list}
				</div>
			</Modal>
    );
  }
}

export default DashboardModal;
