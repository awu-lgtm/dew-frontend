import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { newLogin } from '../reducers/loginReducer';
import { setStoredWeather } from '../../weather/reducers/weatherReducer';
import './Login.css';
// import './bootstrap.min.css';
import logo from '../../assets/temp_logo-removebg-preview.png';

// Login for
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // dispatches newLogin on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // textInput.current.value = '';
    dispatch(newLogin({ username, password }, navigate));
    dispatch(setStoredWeather());
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {/* <Container className="justify-content-center" style={{ display: 'flex' }} fluid>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Row className="form-fields justify-content-center">
              <Col>
                <FloatingLabel label="Username">
                  <Form.Control autoFocus value={username} onChange={(e) => setUsername(e.target.value)} className="username rounded-0 rounded-top" type="text" placeholder="Username" />
                </FloatingLabel>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Row className="form-fields justify-content-center">
              <Col>
                <FloatingLabel label="Password">
                  <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-0 rounded-bottom" type="password" placeholder="Password" />
                </FloatingLabel>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Row}>
            <Row className="justify-content-center">
              <Col>
                <Button className="form-buttons" variant="primary" type="submit">
                  Sign in
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
      <br /> */}
      <form onSubmit={handleSubmit}>
        <div className="sign-in-form">
          <img src={logo} alt="logo" className="sign-in-logo" />
          <input className="form-field username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input className="form-field password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="form-button" type="submit"> Sign in </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
