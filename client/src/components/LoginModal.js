import { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function LoginModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents form default submission

    const userData = {
      email: email,
      password: password,
    };

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, userData);
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);

            // Set login state
            props.setIsLoggedIn(true); // This will cause a re-render

            if (response.data.role) {
                const role = response.data.role.trim();
                localStorage.setItem('role', role);
                props.setUserRole(role); // This too will cause a re-render
            }
            
            props.onHide(); // Close the modal
            if(props.onLoginSuccess) props.onLoginSuccess(); // Notify parent about successful login
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
