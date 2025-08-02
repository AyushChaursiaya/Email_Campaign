import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiClock,
  FiMousePointer,
  FiShoppingCart,
  FiUser,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

const CampaignBuilder = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("sequences");
  const [sequences, setSequences] = useState([
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to our community!",
      delay: 0,
      delayUnit: "minutes",
      triggers: ["signup"],
    },
    {
      id: 2,
      name: "Getting Started Guide",
      subject: "Here's how to get started",
      delay: 1,
      delayUnit: "days",
      triggers: ["time_delay"],
    },
  ]);

  const [triggers] = useState([
    { id: "signup", name: "User Signup", icon: FiUser, color: "success" },
    { id: "email_open", name: "Email Open", icon: FiMail, color: "primary" },
    {
      id: "link_click",
      name: "Link Click",
      icon: FiMousePointer,
      color: "info",
    },
    {
      id: "purchase",
      name: "Purchase Made",
      icon: FiShoppingCart,
      color: "warning",
    },
    {
      id: "cart_abandon",
      name: "Cart Abandoned",
      icon: FiTrash2,
      color: "danger",
    },
    { id: "time_delay", name: "Time Delay", icon: FiClock, color: "secondary" },
  ]);

  const addSequence = () => {
    const newSequence = {
      id: Date.now(),
      name: "New Email",
      subject: "",
      delay: 0,
      delayUnit: "days",
      triggers: [],
    };
    setSequences([...sequences, newSequence]);
  };

  const removeSequence = (seqId) => {
    setSequences(sequences.filter((seq) => seq.id !== seqId));
  };

  const updateSequence = (seqId, field, value) => {
    setSequences(
      sequences.map((seq) =>
        seq.id === seqId ? { ...seq, [field]: value } : seq
      )
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center mb-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="me-3"
              >
                <FiArrowLeft />
              </Button>
              <div>
                <h1 className="h3 fw-bold text-dark mb-1">Campaign Builder</h1>
                <p className="text-muted mb-0">
                  Design your email sequence workflow
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={setActiveTab}
                  className="mb-4"
                >
                  <Tab eventKey="sequences" title="Email Sequences">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold mb-0">Email Sequences</h5>
                      <Button variant="primary" size="sm" onClick={addSequence}>
                        <FiPlus className="me-1" />
                        Add Email
                      </Button>
                    </div>

                    {sequences.map((sequence, index) => (
                      <Card key={sequence.id} className="mb-3 border">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="d-flex align-items-center">
                              <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  fontSize: "14px",
                                }}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <h6 className="mb-1">{sequence.name}</h6>
                                <small className="text-muted">
                                  {sequence.delay > 0 &&
                                    `${sequence.delay} ${sequence.delayUnit} delay`}
                                </small>
                              </div>
                            </div>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeSequence(sequence.id)}
                            >
                              <FiTrash2 />
                            </Button>
                          </div>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                  Email Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  value={sequence.name}
                                  onChange={(e) =>
                                    updateSequence(
                                      sequence.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                  Subject Line
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  value={sequence.subject}
                                  onChange={(e) =>
                                    updateSequence(
                                      sequence.id,
                                      "subject",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter email subject"
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                  Delay
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  value={sequence.delay}
                                  onChange={(e) =>
                                    updateSequence(
                                      sequence.id,
                                      "delay",
                                      parseInt(e.target.value)
                                    )
                                  }
                                  min="0"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                  Unit
                                </Form.Label>
                                <Form.Select
                                  value={sequence.delayUnit}
                                  onChange={(e) =>
                                    updateSequence(
                                      sequence.id,
                                      "delayUnit",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="minutes">Minutes</option>
                                  <option value="hours">Hours</option>
                                  <option value="days">Days</option>
                                  <option value="weeks">Weeks</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Tab>

                  <Tab eventKey="triggers" title="Triggers & Conditions">
                    <h5 className="fw-bold mb-3">Available Triggers</h5>
                    <p className="text-muted mb-4">
                      Configure when emails should be sent based on user
                      behavior or time
                    </p>

                    <Row>
                      {triggers.map((trigger) => (
                        <Col key={trigger.id} md={6} className="mb-3">
                          <Card className="h-100 border hover-shadow transition-all">
                            <Card.Body className="d-flex align-items-center">
                              <div
                                className={`bg-${trigger.color} bg-opacity-10 rounded-3 p-2 me-3`}
                              >
                                <trigger.icon
                                  className={`text-${trigger.color}`}
                                  size={20}
                                />
                              </div>
                              <div>
                                <h6 className="mb-1">{trigger.name}</h6>
                                <small className="text-muted">
                                  {trigger.id === "signup" &&
                                    "When user creates account"}
                                  {trigger.id === "email_open" &&
                                    "When user opens an email"}
                                  {trigger.id === "link_click" &&
                                    "When user clicks a link"}
                                  {trigger.id === "purchase" &&
                                    "When user makes a purchase"}
                                  {trigger.id === "cart_abandon" &&
                                    "When user abandons cart"}
                                  {trigger.id === "time_delay" &&
                                    "After specified time period"}
                                </small>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Tab>

                  <Tab eventKey="settings" title="Campaign Settings">
                    <h5 className="fw-bold mb-3">Campaign Configuration</h5>

                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              Campaign Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue="Welcome Series"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              From Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue="Your Company"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              From Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              defaultValue="noreply@company.com"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              Reply-To Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              defaultValue="support@company.com"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Enable campaign analytics tracking"
                          defaultChecked
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Send test emails before activation"
                          defaultChecked
                        />
                      </Form.Group>
                    </Form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-3">Quick Actions</h5>
                <div className="d-grid gap-2">
                  <Button variant="success" size="lg">
                    Save & Activate
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CampaignBuilder;
