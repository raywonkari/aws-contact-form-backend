package main

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

//MyEvent struct which has input body
type MyEvent struct {
	Body string `json:"body"`
}

//Data has the input types
type Data struct {
	Name    string
	Email   string
	Message string
}

//Response has the request response
type Response struct {
	Message string `json:"message"`
}

const (
	//Email used to send and receive
	Email = "its@raywonkari.com"

	//Charset for HTML content
	Charset = "Utf-8"
)

func sendEmail(name, email, message string) error {

	subject := "New message from " + name
	emailBody := "<p>Email: " + email + "</p>" +
		"<p>" + message + "</p>"

	// Init AWS Client
	awsClient, err := session.NewSession()

	if err != nil {
		fmt.Println(err)
		return errors.New("ERROR")
	}

	// Init SES Session
	sesSession := ses.New(awsClient)

	// Init Email Data
	emailData := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: []*string{
				aws.String(Email),
			},
		},

		Message: &ses.Message{
			Body: &ses.Body{
				Html: &ses.Content{
					Charset: aws.String(Charset),
					Data:    aws.String(emailBody),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String(Charset),
				Data:    aws.String(subject),
			},
		},

		Source: aws.String(Email),
	}

	_, err = sesSession.SendEmail(emailData)

	if err != nil {
		fmt.Println(err)
		return errors.New("ERROR")
	}
	fmt.Println("Email sent")

	return nil
}

//HandleRequest function
func HandleRequest(input MyEvent) (Response, error) {

	inputJSON := []byte(input.Body)

	var body Data
	fmt.Println("Unmarshall input")
	err := json.Unmarshal(inputJSON, &body)

	if err != nil {
		fmt.Println(err)
		return Response{Message: "ERROR"}, nil
	}

	fmt.Println("Triggering sendEmail Function")
	err = sendEmail(body.Name, body.Email, body.Message)

	if err != nil {
		fmt.Println(err)
		return Response{Message: "ERROR"}, nil
	}

	return Response{Message: "OK"}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
