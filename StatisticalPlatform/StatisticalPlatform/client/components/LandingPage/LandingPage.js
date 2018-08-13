import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button, ButtonToolbar} from 'react-bootstrap';

class LandingPage extends Component {
  render() {
    return(
      <div className="box-layout">
        <Grid className="container">
        <center><img src="static/image/logo.png" alt=""/></center>

          <Row className="show-grid">
            <Col xs={6} md={6} xsOffset={3}>
              <h1 className="heading">Statistical Platform</h1>
            </Col>
          </Row>
          <br/>
          <Row className="show-grid">

            <Col xs={4} md={2} mdOffset={4}>

            <Link to="/signup"> <Button bsStyle="primary" className="btn_main" >Sign Up</Button> </Link>


            </Col>
            <Col xs={4} md={2} >

            <Link to="/login"><Button bsStyle="primary" className="btn_main" >Sign In</Button></Link>


            </Col>


          </Row>
          <br/>
          <Row className="show-grid">

            <Col xs={4} md={2} mdOffset={5}>

              <Button bsStyle="primary" className="btn_main" >How To Use</Button>


            </Col>


          </Row>
        </Grid>

      </div>
    );
  }
}
export default LandingPage;
