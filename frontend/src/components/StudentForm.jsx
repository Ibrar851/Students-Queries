import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Alert } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";

const StudentForm = () => {
  const [queries, setQueries] = useState([]);
  const [fullName, setFullName] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queries");
      setQueries(res.data);
    } catch (err) {
      console.error("❌ Error fetching queries:", err.message);
    }
  };

  // ✅ Submit new query
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !topic || !question) {
      setMessage({ type: "danger", text: "⚠️ Please fill all fields" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/queries", {
        fullName,
        topic,
        question,
      });

      if (res.status === 201) {
        setMessage({ type: "success", text: "✅ Message sent successfully!" });
        setFullName("");
        setTopic("");
        setQuestion("");
        fetchQueries();
      }
    } catch (err) {
      console.error("❌ Error sending message:", err.message);
      setMessage({ type: "danger", text: "⚠️ Failed to send message." });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  // ✅ Delete query
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/queries/${id}`);
      setMessage({ type: "success", text: "🗑️ Query deleted successfully!" });
      fetchQueries();
    } catch (err) {
      console.error("❌ Error deleting query:", err.message);
      setMessage({ type: "danger", text: "⚠️ Failed to delete query." });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  // ✅ Add Reply
  const handleReply = async (id) => {
    if (!reply.trim()) {
      alert("Reply cannot be empty!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/queries/${id}`, { reply });
      setReply("");
      setMessage({ type: "success", text: "✅ Reply added successfully!" });
      fetchQueries();
    } catch (err) {
      console.error("❌ Error sending reply:", err.message);
      setMessage({ type: "danger", text: "⚠️ Failed to send reply." });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  // ✅ Toggle Theme
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <section
      className={`py-5 transition-all ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      <Container>
        {/* 🌙 Theme Toggle */}
        <div className="d-flex justify-content-end mb-3">
          <Button
            variant={darkMode ? "light" : "dark"}
            onClick={toggleTheme}
            className="rounded-pill px-3"
          >
            {darkMode ? (
              <>
                <FaSun className="me-2 text-warning" /> Light Mode
              </>
            ) : (
              <>
                <FaMoon className="me-2" /> Dark Mode
              </>
            )}
          </Button>
        </div>

        <Row className="gy-4">
          {/* Contact Info */}
          <Col lg={4}>
            <div
              className={`p-4 rounded shadow-sm mb-3 d-flex align-items-start ${
                darkMode ? "bg-secondary text-white" : "bg-white text-dark"
              }`}
            >
              <FaMapMarkerAlt className="fs-3 text-primary me-3" />
              <div>
                <h5>Address</h5>
                <p>I-8, Islamabad, Pakistan</p>
              </div>
            </div>
            <div
              className={`p-4 rounded shadow-sm mb-3 d-flex align-items-start ${
                darkMode ? "bg-secondary text-white" : "bg-white text-dark"
              }`}
            >
              <FaPhoneAlt className="fs-3 text-primary me-3" />
              <div>
                <h5>Call Us</h5>
                <p>+92 318 0937324</p>
              </div>
            </div>
            <div
              className={`p-4 rounded shadow-sm d-flex align-items-start ${
                darkMode ? "bg-secondary text-white" : "bg-white text-dark"
              }`}
            >
              <FaEnvelope className="fs-3 text-primary me-3" />
              <div>
                <h5>Email Us</h5>
                <p>learnify@gmail.com</p>
              </div>
            </div>
          </Col>

          {/* Form + Table */}
          <Col lg={8}>
            <Form
              onSubmit={handleSubmit}
              className={`p-4 rounded shadow-sm mb-4 ${
                darkMode ? "bg-secondary text-white" : "bg-white text-dark"
              }`}
            >
              {message && (
                <Alert
                  variant={message.type}
                  onClose={() => setMessage(null)}
                  dismissible
                  className="text-start"
                >
                  {message.text}
                </Alert>
              )}
              <Row className="gy-3">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Course Name or Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12}>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your Question or Message here"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} className="text-center">
                  <Button
                    type="submit"
                    className="px-4 py-2 rounded-pill"
                    style={{ backgroundColor: "#092c77" }}
                  >
                    Send Message
                  </Button>
                </Col>
              </Row>
            </Form>

            <h2 className="text-center mb-3">Students Queries</h2>
            <Table
              striped
              bordered
              hover
              className={`${darkMode ? "table-dark" : ""}`}
            >
              <thead style={{ backgroundColor: "#092c77", color: "white" }}>
                <tr>
                  <th>Full Name</th>
                  <th>Topic</th>
                  <th>Question</th>
                  <th>Reply</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No queries found
                    </td>
                  </tr>
                ) : (
                  queries.map((q) => (
                    <tr key={q._id}>
                      <td>{q.fullName}</td>
                      <td>{q.topic}</td>
                      <td>{q.question}</td>
                      <td>
                        {q.reply ? (
                          q.reply
                        ) : (
                          <div className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Write reply..."
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                            />
                            <Button
                              size="sm"
                              className="ms-2"
                              onClick={() => handleReply(q._id)}
                              style={{ backgroundColor: "#092c77" }}
                            >
                              Reply
                            </Button>
                          </div>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(q._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StudentForm;
