import React from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./contactform.css";

export default class ContactForm extends React.Component {

    state = {
        name: "",
        email: "",
        message: ""
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
        })
    }

    handleInputSubmit = event => {
        event.preventDefault()

        let req = new XMLHttpRequest();
        var that = this;

        req.onreadystatechange = function() {
            console.log("Inside readystate function")
            if (this.readyState === 4) {

                console.log("Inside readystate==4 function")
                const resp = JSON.parse(this.responseText)

                if (resp.message === "OK") {
                    console.log("Inside OK loop")
                    alert("Thanks! I will get back to you asap!")

                    that.setState({
                        name: '',
                        email: '',
                        message: ''
                    });

                } else {
                    console.log("Inside OK else loop")
                    alert("Something went wrong! Please re-try after some time")
                }
            }
        };

        req.open('POST', 'ReplacethistextWithAPIGWendpoint');
        req.send(JSON.stringify(
            {
                name:`${this.state.name}`, 
                email:`${this.state.email}`, 
                message:`${this.state.message}`
            }
        ));


    }



    render() {
        return (
            <div className="contact-form">
        
                <p id="contact">Contact</p>
        
                <Form onSubmit={this.handleInputSubmit} className="form-border">
        
                    <Form.Group controlId="Name">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control onChange={this.handleInputChange} required type="text" name="name" value={this.state.name} placeholder="What should I call you?" />
                    </Form.Group>
        
                    <Form.Group controlId="Email">
                        <Form.Label>Email address *</Form.Label>
                        <Form.Control onChange={this.handleInputChange} required type="email" name="email" value={this.state.email} placeholder="I need this, so I can get back to you." />
                    </Form.Group>
        
                    <Form.Group controlId="Message">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control onChange={this.handleInputChange} required as="textarea" rows="3" type="text" name="message" value={this.state.message} placeholder="How can I help you?" />
                    </Form.Group>
        
                    <br/>
        
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
        
                </Form>
        
            </div> 
        );
    };
}