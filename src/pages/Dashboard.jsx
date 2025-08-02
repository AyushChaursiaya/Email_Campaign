import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiUsers,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiPlay,
  FiPause,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    fromName: "",
    fromEmail: "",
  });

  useEffect(() => {
    // Load user's campaigns from localStorage
    const userCampaigns = JSON.parse(
      localStorage.getItem(`campaigns_${user.id}`) || "[]"
    );
    setCampaigns(userCampaigns);
  }, [user.id]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name.trim()) return;

    const campaign = {
      id: Date.now(),
      name: newCampaign.name,
      description: newCampaign.description,
      fromName: newCampaign.fromName || user.name,
      fromEmail: newCampaign.fromEmail || user.email,
      subject: newCampaign.subject,
      status: "draft",
      subscribers: 0,
      openRate: 0,
      clickRate: 0,
      sequences: 0,
      triggers: [],
      createdAt: new Date().toISOString(),
      emails: [],
    };

    const updatedCampaigns = [...campaigns, campaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem(
      `campaigns_${user.id}`,
      JSON.stringify(updatedCampaigns)
    );

    // Reset form and close modal
    setNewCampaign({
      name: "",
      description: "",
      fromName: "",
      fromEmail: "",
      subject: "",
    });
    setShowCreateModal(false);
  };

  const handleDeleteCampaign = (campaignId) => {
    const updatedCampaigns = campaigns.filter(
      (campaign) => campaign.id !== campaignId
    );
    setCampaigns(updatedCampaigns);
    localStorage.setItem(
      `campaigns_${user.id}`,
      JSON.stringify(updatedCampaigns)
    );
  };

  const handleStatusToggle = (campaignId) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === campaignId) {
        const newStatus =
          campaign.status === "active"
            ? "paused"
            : campaign.status === "paused"
            ? "active"
            : "active";
        return { ...campaign, status: newStatus };
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
    localStorage.setItem(
      `campaigns_${user.id}`,
      JSON.stringify(updatedCampaigns)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "draft":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return FiPlay;
      case "paused":
        return FiPause;
      case "draft":
        return FiEdit3;
      default:
        return FiEdit3;
    }
  };

  const stats = [
    {
      title: "Total Campaigns",
      value: campaigns.length.toString(),
      icon: FiMail,
      color: "primary",
    },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
      <Navbar bg="white" variant="light" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-primary">
            <FiMail className="me-2" />
            Campaign Engine
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <span className="me-3 text-muted">Welcome, {user.name}</span>
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              <FiLogOut className="me-1" />
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h3 fw-bold text-dark mb-1">Email Campaigns</h1>
                <p className="text-muted mb-0">
                  Manage your automated email sequences
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="px-4"
                onClick={() => setShowCreateModal(true)}
              >
                <FiPlus className="me-2" />
                New Campaign
              </Button>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-5">
          {stats.map((stat, index) => (
            <Col key={index} xs={12} sm={6} lg={3} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <div
                    className={`bg-${stat.color} bg-opacity-10 rounded-3 p-3 me-3`}
                  >
                    <stat.icon className={`text-${stat.color}`} size={24} />
                  </div>
                  <div>
                    <h3 className="h4 fw-bold mb-0">{stat.value}</h3>
                    <p className="text-muted mb-0 small">{stat.title}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Campaign Cards */}
        {campaigns.length === 0 ? (
          <Row>
            <Col>
              <Card className="border-0 shadow-sm text-center py-5">
                <Card.Body>
                  <FiMail size={48} className="text-muted mb-3" />
                  <h4 className="fw-bold text-dark mb-2">No Campaigns Yet</h4>
                  <p className="text-muted mb-4">
                    Create your first email campaign to get started with
                    automated sequences
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowCreateModal(true)}
                  >
                    <FiPlus className="me-2" />
                    Create Your First Campaign
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            {campaigns.map((campaign) => {
              const StatusIcon = getStatusIcon(campaign.status);
              return (
                <Col key={campaign.id} xs={12} md={6} xl={4} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="flex-grow-1">
                          <h5 className="fw-bold mb-1">{campaign.name}</h5>
                          {campaign.description && (
                            <p className="text-muted small mb-2">
                              {campaign.description}
                            </p>
                          )}
                          <Badge
                            bg={getStatusColor(campaign.status)}
                            className="text-capitalize"
                          >
                            <StatusIcon className="me-1" size={12} />
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            title="Delete Campaign"
                          >
                            <FiTrash2 size={14} />
                          </Button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted d-block mb-1">From</small>
                        <span className="fw-semibold small">
                          {campaign.fromName} &lt;{campaign.fromEmail}&gt;
                        </span>
                      </div>

                      {campaign.subject && (
                        <div className="mb-3">
                          <small className="text-muted d-block mb-1">
                            Subject
                          </small>
                          <span className="fw-semibold small">
                            {campaign.subject}
                          </span>
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          Created{" "}
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </small>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate(`/campaign/${campaign.id}`)}
                        >
                          <FiEdit3 className="me-1" />
                          Edit
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

      {/* Create Campaign Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Email Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Campaign Name *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Welcome Series"
                    value={newCampaign.name}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Brief description of this campaign"
                value={newCampaign.description}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">From Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user.name}
                    value={newCampaign.fromName}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        fromName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">From Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={user.email}
                    value={newCampaign.fromEmail}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        fromEmail: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreateModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateCampaign}
            disabled={!newCampaign.name.trim()}
          >
            <FiPlus className="me-1" />
            Create Campaign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
