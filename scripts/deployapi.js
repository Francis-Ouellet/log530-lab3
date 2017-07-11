/* eslint-disable */
'use strict';
const exec = require('child_process').exec;
const awsdeploysettings = require('../awsdeploysettings.json');

const uploadToS3Command = `aws cloudformation package \\
--template-file Api/template.yaml \\
--s3-bucket ${awsdeploysettings.bucketname} \\
--output-template-file Api/packaged-template.yaml \\
--force-upload
`;

const deployCommand = `aws cloudformation deploy \\
--template-file Api/packaged-template.yaml \\
--stack-name hobbycartes-api \\
--capabilities CAPABILITY_IAM
`;

exec(uploadToS3Command, (error, stdout, stderr) => {
  if (error) {
    console.error(error);
    return;
  }

  exec(deployCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
    }
  });
});
