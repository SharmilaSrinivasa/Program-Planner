import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

class UpdateEvent extends Component {
  constructor(props) {
    super(props);
    this.onChangeEventTitle = this.onChangeEventTitle.bind(this);
    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeEventTime = this.onChangeEventTime.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      event_title: "",
      event_date: "",
      event_time: "",
      location: "",
      description: "",
      redirect: false,
    };
  }

  componentDidMount() {
    console.log("mounted", this.props.params);
    axios
      .get(
        "http://localhost:8080/react-php/api/getById.php?id=" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          event_title: response.data.title,
          event_date: response.data.event_date,
          event_time: response.data.event_time,
          location: response.data.location,
          description: response.data.description,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeEventTitle(e) {
    this.setState({
      event_title: e.target.value,
    });
  }

  onChangeEventDate(e) {
    this.setState({
      event_date: e.target.value,
    });
  }

  onChangeEventTime(e) {
    this.setState({
      event_time: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      event_title: this.state.event_title,
      event_date: this.state.event_date,
      event_time: this.state.event_time,
      location: this.state.location,
      description: this.state.description,
    };
    axios
      .post(
        "http://localhost:8080/react-php/api/update.php?id=" +
          this.props.match.params.id,
        obj
      )
      // .then((res) => console.log(res.data), this.setState({ redirect: true }));
      .then((res) => {
        if (res.status) {
          this.setState({ redirect: true });
        }
      });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="row">
        <div className="column bodypart">
          <h1>Update Event</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEvent">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.event_title}
                  onChange={this.onChangeEventTitle}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridStartDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.event_date}
                  onChange={this.onChangeEventDate}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEndtDate">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={this.state.event_time}
                  onChange={this.onChangeEventTime}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.location}
                  onChange={this.onChangeLocation}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default UpdateEvent;