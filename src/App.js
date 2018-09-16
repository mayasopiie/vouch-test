import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const request = axios.create({
  baseURL: 'https://vouch-test-backend.herokuapp.com/',
  timeout: 10000
}) 


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: '',
      ticket: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    const category = event.target.value
    this.setState({categories: category}, () =>{
      console.log(this.state.categories)
    })
  }

  handleSubmit(event){
    axios.get(`https://vouch-test-backend.herokuapp.com/tickets/`)
      .then(response => {
        console.log(response.data.tickets)
        this.setState({
          ticket: response.data.tickets
        })
      })
      .catch(error => {
        console.log(error)
      })
      // console.log(this.state.ticket)
    event.preventDefault()
  }
  

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <h2>My Ticket App</h2>
              <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="category">Select Ticket Category</Label>
                <Input type="select" name="category" id="category" onChange={this.handleChange}>
                  <option value='all'>All</option>
                  <option value='open'>Open</option>
                  <option value='active'>Active</option>
                  <option value='failed'>Failed</option>
                  <option value='closed'>Closed</option>
                </Input>
              </FormGroup>
              <Button type="submit">Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
