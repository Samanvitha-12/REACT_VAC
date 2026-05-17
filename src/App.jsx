import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
<<<<<<< HEAD
=======
import "./App.css";

>>>>>>> 98b61db860aef6fec0d1d0efa820812256dfe6be
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
<<<<<<< HEAD
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
=======
import Badge from "react-bootstrap/Badge";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      priority: "Medium",
      filter: "all",
      list: [],
      editingId: null,
      editDraft: "",
      editPriority: "Medium",
    };
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  updatePriority(value) {
    this.setState({
      priority: value,
    });
  }

  setFilter(filter) {
    this.setState({
      filter,
    });
  }

  addItem() {
    const trimmed = this.state.userInput.trim();

    if (trimmed === "") return;

    const userInput = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random(),

      value: trimmed,
      priority: this.state.priority,
      completed: false,
    };

    this.setState({
      list: [...this.state.list, userInput],
      userInput: "",
      priority: "Medium",
    });
  }

  deleteItem(key) {
    this.setState({
      list: this.state.list.filter((item) => item.id !== key),
    });
  }

  toggleComplete(id) {
    const updatedList = this.state.list.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    this.setState({
      list: updatedList,
    });
  }

  clearCompleted = () => {
    this.setState({
      list: this.state.list.filter((item) => !item.completed),
    });
  };

  toggleAll = () => {
    const allDone = this.state.list.every((item) => item.completed);

    this.setState({
      list: this.state.list.map((item) => ({
        ...item,
        completed: !allDone,
      })),
    });
  };

  startEdit = (item) => {
    this.setState({
      editingId: item.id,
      editDraft: item.value,
    });
  };

  cancelEdit = () => {
    this.setState({
      editingId: null,
      editDraft: "",
    });
  };

  updateEditDraft = (value) => {
    this.setState({
      editDraft: value,
    });
  };

  saveEdit = () => {
    const trimmed = this.state.editDraft.trim();

    if (trimmed === "") return;

    const list = this.state.list.map((item) =>
      item.id === this.state.editingId
        ? {
            ...item,
            value: trimmed,
            priority: this.state.editPriority,
          }
        : item
    );

    this.setState({
      list,
      editingId: null,
      editDraft: "",
      editPriority: "Medium",
    });
  };

  render() {
    const { editingId, editDraft } = this.state;

    const completedTasks = this.state.list.filter(
      (item) => item.completed
    ).length;

    return (
      <div className="todo-page">
        <Container className="todo-container">
          <Card className="todo-card shadow-lg">
            <Card.Body className="todo-card-body">
              <Row className="mb-4 text-center">
                <Col>
                  <h1 className="todo-title">Todo List</h1>

                  <Badge className="todo-badge px-3 py-2">
                    {completedTasks} / {this.state.list.length} Completed
                  </Badge>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <InputGroup size="lg">
                    <Form.Control
                      className="todo-input"
                      placeholder="Enter task..."
                      value={this.state.userInput}
                      onChange={(e) =>
                        this.updateInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          this.addItem();
                        }
                      }}
                    />

                    <Button
                      variant="light"
                      className="todo-button"
                      onClick={() => this.addItem()}
                    >
                      Add
                    </Button>
                  </InputGroup>
                </Col>
              </Row>

              {this.state.list.length > 0 && (
                <div className="text-end mb-3">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={this.clearAll}
                  >
                    Clear All
                  </Button>
                </div>
              )}

              <ListGroup variant="flush">
                {this.state.list.length === 0 ? (
                  <p
                    className="text-center"
                    style={{ color: "#cbd5e1" }}
                  >
                    No tasks available
                  </p>
                ) : (
                  this.state.list.map((item) => {
                    const isEditing =
                      editingId === item.id;

                    return (
                      <ListGroup.Item
                        key={item.id}
                        className="todo-list-item"
                      >
                        {isEditing ? (
                          <>
                            <Form.Control
                              value={editDraft}
                              autoFocus
                              onChange={(e) =>
                                this.updateEditDraft(
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  this.saveEdit();

                                if (e.key === "Escape")
                                  this.cancelEdit();
                              }}
                              className="todo-edit-input mb-2"
                            />

                            <div className="d-flex gap-2 justify-content-end">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={this.cancelEdit}
                              >
                                Cancel
                              </Button>

                              <Button
                                size="sm"
                                variant="success"
                                onClick={this.saveEdit}
                              >
                                Save
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div className="d-flex align-items-center gap-3 flex-grow-1">
                              <Form.Check
                                type="checkbox"
                                checked={item.completed}
                                onChange={() =>
                                  this.toggleComplete(
                                    item.id
                                  )
                                }
                              />

                              <span
                                className={`todo-text ${
                                  item.completed ? "completed" : ""
                                }`}
                              >
                                {item.value}
                              </span>
                            </div>

                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-light"
                                size="sm"
                                onClick={() =>
                                  this.startEdit(item)
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  this.deleteItem(item.id)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                      </ListGroup.Item>
                    );
                  })
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

>>>>>>> 98b61db860aef6fec0d1d0efa820812256dfe6be
export default App;