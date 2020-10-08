import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector, shallowEqual } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';
import * as actions from '../actions/actions';

function Login() {
  // const mapDispatchToProps = (dispatch) => ({
  //   addCity(data) {
  //     dispatch(actions.addUser(data));
  //   },
  // });

  const dispatch = useDispatch();
  // const currentState = useSelector((state) => state.informationReducer);

  const onSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    // GET FIRST NAME
    const firstName = profile.getGivenName();
    console.log('firstName: ', firstName);
    // GET LAST NAME
    const lastName = profile.getFamilyName();
    console.log('lastName: ', lastName);
    // GET IMAGE URL
    const imageUrl = profile.getImageUrl();
    console.log('imageURL: ', imageUrl);
    // GET EMAIL
    const email = profile.getEmail();
    console.log('email: ', email);
    const { id_token } = googleUser.getAuthResponse();
    fetch('/login/createUser', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        id_token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data from response: ', data);
        dispatch(actions.updateFavorites(data));
        dispatch(actions.addUser(email));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    gapi.signin2.render('g-signin2', {
      width: 200,
      height: 50,
      longtitle: false,
      theme: 'light',
      onsuccess: onSignIn,
    });
  });

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
            {/* <a href="/auth/google">
              <Button variant="primary">Log In with google</Button>
              end of test button for Google OAuth */}
            {/* </a> */}
          </Form>
        </Tab>
      </Tabs>
      <div id="g-signin2"></div>
    </div>
  );
}

export default Login;
