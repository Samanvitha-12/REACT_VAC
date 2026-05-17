import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
class App extends Component {
constructor(props) {
  super(props);
  this.state = {
      userInput: "",
      list: [],
      editingId: null,
      editDraft: "",
  };
}
updateInput(value) {
  this.setState({ userInput: value });
}
addItem() {
  const trimmed = this.state.userInput.trim();
  if (trimmed === "") return;
  const userInput = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random(),
      value: trimmed,
  };
  this.setState({
      list: [...this.state.list, userInput],
      userInput: "",
  });
}
deleteItem(key) {
  this.setState({
      list: this.state.list.filter((item) => item.id !== key),
      editingId: this.state.editingId === key ? null : this.state.editingId,
      editDraft: this.state.editingId === key ? "" : this.state.editDraft,
  });
}
startEdit = (item) => {
  this.setState({
      editingId: item.id,
      editDraft: item.value,
  });
};
cancelEdit = () => {
  this.setState({ editingId: null, editDraft: "" });
};
updateEditDraft = (value) => {
  this.setState({ editDraft: value });
};
saveEdit = () => {
  const trimmed = this.state.editDraft.trim();
  if (trimmed === "") return;
  const { editingId } = this.state;
  const list = this.state.list.map((item) =>
      item.id === editingId ? { ...item, value: trimmed } : item
  );
  this.setState({
      list,
      editingId: null,
      editDraft: "",
  });
};
render() {
  const { editingId, editDraft } = this.state;
  return (
      <div
          style={{
              minHeight: "100vh",
              background: "linear-gradient(160deg, #0f172a 0%, #1e293b 45%, #312e81 100%)",
              padding: "2.5rem 1rem",
          }}
      >
          <Container style={{ maxWidth: 640 }}>
              <Card
                  className="border-0 shadow-lg"
                  style={{
                      borderRadius: "1rem",
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                  }}
              >
                  <Card.Body className="p-4 p-md-5">
                      <Row className="text-center mb-2">
                          <Col>
                              <h1
                                  className="mb-1 text-white"
                                  style={{
                                      fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                                      fontWeight: 700,
                                      letterSpacing: "-0.02em",
                                  }}
                              >
                                  Todo list
                              </h1>
                              <p className="small mb-0" style={{ color: "rgba(248, 250, 252, 0.65)" }}>
                              </p>
                          </Col>
                      </Row>
                      <hr className="border-secondary opacity-25 my-4" />
                      <Row className="mb-4">
                          <Col>
                              <InputGroup size="lg">
                                  <Form.Control
                                      placeholder="What needs to be done?"
                                      value={this.state.userInput}
                                      onChange={(e) => this.updateInput(e.target.value)}
                                      onKeyDown={(e) => {
                                          if (e.key === "Enter") this.addItem();
                                      }}
                                      aria-label="New todo"
                                      style={{
                                          borderRadius: "0.5rem 0 0 0.5rem",
                                          border: "none",
                                          background: "rgba(15,23,42,0.5)",
                                          color: "#f8fafc",
                                      }}
                                  />
                                  <Button
                                      variant="light"
                                      onClick={() => this.addItem()}
                                      style={{
                                          borderRadius: "0 0.5rem 0.5rem 0",
                                          fontWeight: 600,
                                          minWidth: "5rem",
                                      }}
                                  >
                                      Add
                                  </Button>
                              </InputGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                              {this.state.list.length === 0 ? (
                                  <p className="text-center small mb-0 py-4" style={{ color: "rgba(248, 250, 252, 0.65)" }}>
                                      No tasks yet. Add one above.
                                  </p>
                              ) : (
                                  <ListGroup variant="flush">
                                      {this.state.list.map((item) => {
                                          const isEditing = editingId === item.id;
                                          return (
                                              <ListGroup.Item
                                                  key={item.id}
                                                  className="px-0 py-3 border-secondary border-opacity-25"
                                                  style={{
                                                      background: "transparent",
                                                      color: "#f8fafc",
                                                  }}
                                              >
                                                  {isEditing ? (
                                                      <div className="d-flex flex-column gap-2">
                                                          <Form.Control
                                                              autoFocus
                                                              value={editDraft}
                                                              onChange={(e) =>
                                                                  this.updateEditDraft(e.target.value)
                                                              }
                                                              onKeyDown={(e) => {
                                                                  if (e.key === "Enter") this.saveEdit();
                                                                  if (e.key === "Escape") this.cancelEdit();
                                                              }}
                                                              aria-label="Edit todo text"
                                                              style={{
                                                                  borderRadius: "0.5rem",
                                                                  border: "1px solid rgba(148,163,184,0.35)",
                                                                  background: "rgba(15,23,42,0.6)",
                                                                  color: "#f8fafc",
                                                              }}
                                                          />
                                                          <div className="d-flex gap-2 justify-content-end">
                                                              <Button
                                                                  variant="outline-light"
                                                                  size="sm"
                                                                  onClick={this.cancelEdit}
                                                              >
                                                                  Cancel
                                                              </Button>
                                                              <Button
                                                                  variant="light"
                                                                  size="sm"
                                                                  onClick={() => this.saveEdit()}
                                                                  disabled={editDraft.trim() === ""}
                                                              >
                                                                  Save
                                                              </Button>
                                                          </div>
                                                      </div>
                                                  ) : (
                                                      <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                                          <span
                                                              className="flex-grow-1"
                                                              style={{ wordBreak: "break-word" }}
                                                          >
                                                              {item.value}
                                                          </span>
                                                          <span className="d-flex gap-2 flex-shrink-0">
                                                              <Button
                                                                  variant="outline-light"
                                                                  size="sm"
                                                                  onClick={() => this.startEdit(item)}
                                                              >
                                                                  Edit
                                                              </Button>
                                                              <Button
                                                                  variant="outline-danger"
                                                                  size="sm"
                                                                  onClick={() => this.deleteItem(item.id)}
                                                              >
                                                                  Delete
                                                              </Button>
                                                          </span>
                                                      </div>
                                                  )}
                                              </ListGroup.Item>
                                          );
                                      })}
                                  </ListGroup>
                              )}
                          </Col>
                      </Row>
                  </Card.Body>
              </Card>
          </Container>
      </div>
  );
}
}
export default App;