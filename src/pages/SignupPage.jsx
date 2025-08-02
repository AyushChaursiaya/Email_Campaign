import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = signup(name, email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div
                    className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <FiUser className="text-white" size={24} />
                  </div>
                  <h2 className="fw-bold text-dark">Create Account</h2>
                  <p className="text-muted">
                    Start building your email campaigns
                  </p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <div className="position-relative">
                      <FiUser
                        className="position-absolute top-50 translate-middle-y text-muted"
                        style={{ left: "12px", zIndex: 10 }}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="ps-5"
                        style={{ paddingLeft: "40px" }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Email Address
                    </Form.Label>
                    <div className="position-relative">
                      <FiMail
                        className="position-absolute top-50 translate-middle-y text-muted"
                        style={{ left: "12px", zIndex: 10 }}
                      />
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="ps-5"
                        style={{ paddingLeft: "40px" }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <div className="position-relative">
                      <FiLock
                        className="position-absolute top-50 translate-middle-y text-muted"
                        style={{ left: "12px", zIndex: 10 }}
                      />
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="ps-5"
                        style={{ paddingLeft: "40px" }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      Confirm Password
                    </Form.Label>
                    <div className="position-relative">
                      <FiLock
                        className="position-absolute top-50 translate-middle-y text-muted"
                        style={{ left: "12px", zIndex: 10 }}
                      />
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="ps-5"
                        style={{ paddingLeft: "40px" }}
                      />
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={loading}
                    style={{ padding: "12px" }}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-0 text-muted">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-decoration-none fw-semibold"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
