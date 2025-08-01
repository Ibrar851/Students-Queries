import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";

const Studentform = () => {
  const [queries, setQueries] = useState([]);
  const [fullName, setFullName] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState(''); // ✅ missing state
  const [selectedQueryId, setSelectedQueryId] = useState(null); // optional for reply
  const [replyText, setReplyText] = useState("");

  // Load all queries
  useEffect(() => {
    axios.get('http://localhost:5000/api/queries')
      .then(res => setQueries(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuery = { fullName, topic, question };

    await axios.post('http://localhost:5000/api/queries', newQuery);

    const res = await axios.get('http://localhost:5000/api/queries');
    setQueries(res.data);

    setFullName('');
    setTopic('');
    setQuestion('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/queries/${id}`);
    setQueries(queries.filter(q => q._id !== id));
  };

  const handleReply = (id) => {
    setSelectedQueryId(id);
    const q = queries.find(item => item._id === id);
    setReplyText(q.reply || "");
  };

  const submitReply = async () => {
    await axios.put(`http://localhost:5000/api/queries/${selectedQueryId}`, {
      reply: replyText
    });

    const res = await axios.get('http://localhost:5000/api/queries');
    setQueries(res.data);
    setSelectedQueryId(null);
    setReplyText("");
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="gy-4">
          {/* Contact Info */}
          <Col lg={4}>
            <div className="bg-white p-4 rounded shadow-sm mb-3 d-flex align-items-start">
              <i className="bi bi-geo-alt fs-3 text-primary me-3"></i>
              <div>
                <h5>Address</h5>
                <p>I-8, Islamabad, Pakistan</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-3 d-flex align-items-start">
              <i className="bi bi-telephone fs-3 text-primary me-3"></i>
              <div>
                <h5>Call Us</h5>
                <p>+92 318 0937324</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow-sm d-flex align-items-start">
              <i className="bi bi-envelope fs-3 text-primary me-3"></i>
              <div>
                <h5>Email Us</h5>
                <p>learnify@gmail.com</p>
              </div>
            </div>
          </Col>

          {/* Form + Table */}
          <Col lg={8}>
            {/* Form */}
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm mb-4">
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
                  <Button type="submit" className="px-4 py-2 rounded-pill" style={{ backgroundColor: "#092c77" }}>
                    Send Message
                  </Button>
                </Col>
              </Row>
            </Form>

            {/* Reply Input if selected */}
            {selectedQueryId && (
              <div className="mb-3 bg-white p-3 rounded shadow-sm">
                <h5>Reply to Query</h5>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                />
                <div className="mt-2 text-end">
                  <Button variant="primary" onClick={submitReply}>
                    Submit Reply
                  </Button>
                </div>
              </div>
            )}

            {/* Table */}
            <h2 className="text-center mb-3">Students Queries</h2>
            <Table striped bordered hover>
              <thead style={{ backgroundColor: '#092c77', color: 'white' }}>
                <tr>
                  <th>Full Name</th>
                  <th>Topic</th>
                  <th>Question</th>
                  <th>Reply</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <tr key={q._id}>
                    <td>{q.fullName}</td>
                    <td>{q.topic}</td>
                    <td>{q.question}</td>
                    <td>{q.reply || "No reply yet"}</td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => handleReply(q._id)}>
                        Reply
                      </Button>{' '}
                      
                      <Button variant="danger" size="sm" onClick={() => handleDelete(q._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Studentform;
