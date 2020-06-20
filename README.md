# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`AwsContactFormBackendStack`)
which contains a lambda function, API GW and necessary resources for it.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

### Misc Info

In the `lambda` directory, we have the lambda function code written in Golang, along with the binary file.
The binary file is used in the CDK APP to deploy it to AWS.

In the `contact-form-code` directory, we have an example of how the frontend is setting up a contact form, dealing with the fields, sending the data to API GW, and acting upon the response.