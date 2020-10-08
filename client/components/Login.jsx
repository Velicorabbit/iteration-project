import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container signup-login-container">
      <h1>Welcome!</h1>
      <Tabs defaultActiveKey="signup" id="signup-login-tab">
        <Tab eventKey="signup" title="Sign Up">
          <Form className="signup-login-form">
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up!
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="login" title="Log In">
          <Form className="signup-login-form">
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
            {/* test button for Google OAuth */}
            <a href="/auth/google">
              <Button variant="primary">Log In with google</Button>
              {/* end of test button for Google OAuth */}
            </a>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Login;
