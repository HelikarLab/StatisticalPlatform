import Particles from 'react-particles-js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {Form, FormGroup, FormControl, Col, Checkbox, FieldGroup, ControlLabel, Button, Grid, Row} from 'react-bootstrap';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;
const particleOpt = {
  "particles": {
    "number": {
      "value": 130,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#f40035"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#f71a1a"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.90917568071615,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#7d7d7d",
      "opacity": 0.364120919134167,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

class SignupPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
          Username: "",
          Password1: "",
          Password2: "",
          Email: "",
          FirstName: "",
          LastName: ""
        };
    }
    signUpUser = () => {
      const { Username, Password1, Password2, Email, FirstName, LastName } = this.state;
      axios.post("/api/rest-auth/registration/",{username: Username, password1: Password1, password2: Password2, email: Email, first_name: FirstName, last_name: LastName })
      .then(resp => {
        alert("Check console for verification link");
      })
    }
  render() {
    const { Username, Password1, Password2, Email, FirstName, LastName } = this.state;

    return(
      <div className="back">
        <div style={{position:'absolute', top: 0, minHeight: 100, width: '100vw', zIndex: 10, backgroundColor: '#c4c4c4'}}>
          <Grid fluid={true}>
            <Row className="show-grid">
              <Col xs={12} md={8}>
              <img src="/../../static/image/logo.png" alt=""/>
            </Col>
            <Col xs={6} md={3} className="head">
              <center>
              <Link to="/login">  <Button bsSize="large" className="headbut">Sign In</Button></Link>
            <Link to="/">  <Button bsSize="large" >Home</Button></Link>
              </center>

          </Col>
        </Row>
      </Grid>
        </div>
        <div className="particle">
          <Grid fluid={true}>
            <Row className="show-grid">
              <Col xs={6} md={4} mdOffset={4} xsOffset={4} >

                <div className="signup">
                  <form>
                  <center><h1 className="MainPage">Signup</h1></center>
                    <Row className="show-grid">
                      <Col md={6}>
                    <FormGroup controlId="formBasicText2">
                                <ControlLabel>First Name</ControlLabel>
                                <FormControl
                                  type="text"
                                  placeholder="Enter text"
                                  onChange={event => this.setState({FirstName: event.target.value})}
                                />
                              </FormGroup>
                            </Col>
                              <Col md={6} id="adjust">
                              <FormGroup controlId="formBasicText3">
                                          <ControlLabel>Last Name</ControlLabel>
                                          <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={event => this.setState({LastName: event.target.value})}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <FormGroup controlId="formBasicText8">
                                      <ControlLabel>Email</ControlLabel>
                                      <FormControl
                                        type="email"
                                        placeholder="Enter text"
                                        onChange={event => this.setState({Email: event.target.value})}
                                      />
                                    </FormGroup>
                                        <FormGroup controlId="formBasicText">
                                                    <ControlLabel>Username</ControlLabel>
                                                    <FormControl
                                                      type="text"
                                                      placeholder="Enter text"
                                                      onChange={event => this.setState({Username: event.target.value})}
                                                    />
                                                  </FormGroup>
                                                  <Row className="show-grid">
                                                    <Col md={6}>
                                                  <FormGroup controlId="formBasicText1">
                                                            <ControlLabel>Password</ControlLabel>
                                                              <FormControl
                                                                type="password"
                                                                placeholder="Enter text"
                                                                onChange={event => this.setState({Password1: event.target.value})}
                                                              />

                                                          </FormGroup>
                                                        </Col>
                                                          <Col md={6} id="adjust">
                                                          <FormGroup controlId="formBasicText9">
                                                          <ControlLabel>Re-Type Password</ControlLabel>
                                                            <FormControl
                                                              type="password"
                                                              placeholder="Enter text"
                                                              onChange={event => this.setState({Password2: event.target.value})}
                                                            />

                                                        </FormGroup>

                                                      </Col>
                                                    </Row>
                <center> <Button onClick ={this.signUpUser}>Submit</Button></center>
                   </form>
                    </div>
                </Col>
              </Row>

            </Grid>


         </div>
           <Particles params={particleOpt} />
       </div>






    );
  }
}
export default SignupPage;
