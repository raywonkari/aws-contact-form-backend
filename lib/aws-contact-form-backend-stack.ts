import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as iam from '@aws-cdk/aws-iam';
import { HttpMethod, LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2';

export class AwsContactFormBackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mylambda = new lambda.Function(this, 'ContactFormHandler', {
      runtime: lambda.Runtime.GO_1_X,
      code: lambda.Code.fromAsset('lambda'),
      functionName: 'AwsContactFormBackendLambda',
      handler: 'main',
      logRetention: 7,
      initialPolicy: [new iam.PolicyStatement({
        actions: [
          'ses:SendRawEmail',
          'ses:SendEmail',
        ],
        resources: ['*'],
      })]
    });

    const apigateway = new apigw.HttpApi(this, 'ContactFormApi', {
      corsPreflight: {
        allowOrigins: ['https://raywonkari.com'],
      }
    });

    const lambda_integration = new LambdaProxyIntegration({
      handler: mylambda
    });

    apigateway.addRoutes({
      path: '/send',
      methods: [ HttpMethod.POST ],
      integration: lambda_integration
    });
  }
}
