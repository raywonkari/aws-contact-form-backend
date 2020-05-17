#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AwsContactFormBackendStack } from '../lib/aws-contact-form-backend-stack';

const app = new cdk.App();
new AwsContactFormBackendStack(app, 'AwsContactFormBackendStack');
