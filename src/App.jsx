import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
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

export default App;