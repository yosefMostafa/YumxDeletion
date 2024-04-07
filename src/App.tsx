import React, { useState } from "react";
import { Container, Form, Button, Accordion, Card } from "react-bootstrap";

import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete your account? This will delete all your data and cannot be undone."
      );
      if(!userConfirmed){
        return;
      }
      const api = import.meta.env.VITE_PUBLIC_API_HOST;
      const loginEndpoint = import.meta.env.VITE_PUBLIC_LOGIN_END_POINT;
      const deleteEndpoint = import.meta.env.VITE_PUBLIC_DEL_END_POINT;
      
      if (!api || !loginEndpoint || !deleteEndpoint) {
        alert("API host is not defined");
        return;
      }

      const response = await fetch(api + loginEndpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json' },
        body: JSON.stringify({ "email": email, "password": password }),
      });
      const data = await response.json(); 
      var token ='';
      if(data["token"]){
        token = data["token"];
      }else{
        alert(data["message"]);
        return;
      }
     
      console.log(token);
      const delResponse = await fetch(
        api + deleteEndpoint,

        {
          method: "DELETE",
          headers: { "Token": `${token}` },
        }
      );
      const delData = await delResponse.json();
      const message = delData["message"]; 
      alert(message);
    } catch (error) {
      console.error(error);
      alert("Failed to delete account - please try again later");
    }
  };
  return (
    <>
      <div className="app-container">
        <img src="/YUM_X Logo.png" alt="Logo" className="app-logo" />
        <Container className="app-container">
          <h1 className="app-title">Delete Account Steps</h1>
          <ol className="delete-account-steps list-group-numbered">
            <li className="list-group-item">
              <strong>Login</strong> to your account
            </li>
            <li className="list-group-item">
              Go to account <strong>settings</strong>
            </li>
            <li className="list-group-item">
              Find the option to <strong>Edit Profile</strong>
            </li>
            <li className="list-group-item">
              Press the <strong>Deletion Icon</strong>
            </li>

            <li className="list-group-item">
              <strong>Confirm</strong> the deletion
            </li>
          </ol>
          <h5 className="app-title">
            Or enter you account details below to be deleted
          </h5>
          <Accordion defaultActiveKey="0" className="custom-accordion" flush>
            <Accordion.Item eventKey="0" className="custom-accordion-item" >
              <Accordion.Header className="custom-accordion-header"style={{ backgroundColor: '#343a40' }} >
                Delete account
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Card.Body>
                  <Form
                    onSubmit={handleDeleteAccount}
                    className="delete-account-form"
                  >
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mt-1">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="primary mt-5" type="submit">
                      Delete Account
                    </Button>
                  </Form>
                </Card.Body>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </>
  );
}

export default App;
