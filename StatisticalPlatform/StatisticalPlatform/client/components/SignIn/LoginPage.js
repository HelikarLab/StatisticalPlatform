import Particles from 'react-particles-js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Form, FormGroup, FormControl, Col, Checkbox, FieldGroup, ControlLabel, Button, Grid, Row} from 'react-bootstrap';

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

class LoginPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
          Username: "",
          Password: ""
        };
    }
    componentDidMount = async () => {
      const tokenKey = localStorage.getItem("PreviousKey");
      if(typeof tokenKey == 'string') {
        window.location.href = "/home";
      }
    }

    signInUser = () => {
      const { Username, Password } = this.state;
      axios.post("http://127.0.0.1:8000/api/rest-auth/login/",{username: Username, password: Password })
      .then(resp => {
        if(resp.data.key) {
          localStorage.setItem("PreviousKey", resp.data.key);
          window.location.href = "/home";
        }
        else {
          alert("There is some Technical error")
        }
      }).catch(e => {
        alert("Please Use Valid Credentials");
      })
    }

  render() {
    const { Username, Password } = this.state;
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
                <Button bsSize="large" className="headbut">Register</Button>
              <Button bsSize="large" >Home</Button>
              </center>
          </Col>
        </Row>
      </Grid>

        </div>
        <div className="particle">
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4} mdOffset={4} xsOffset={4}>
                <div className="login">

                  <form>
                  <center><h1 className="MainPage">Login</h1></center>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Enter text"
                        onChange={event => this.setState({Username: event.target.value})}
                      />
                    </FormGroup>
                    <FormGroup controlId="formBasicText1">
                    <ControlLabel>Password</ControlLabel>
                      <FormControl
                        type="password"
                        placeholder="Enter text"
                        onChange={event => this.setState({Password: event.target.value})}
                      />
                  </FormGroup>
                <center> <Button onClick ={this.signInUser}>Submit</Button></center>
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

export default LoginPage;
