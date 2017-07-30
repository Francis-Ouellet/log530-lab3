/**
 * Based on : https://github.com/auth0-samples/jwt-rsa-aws-custom-authorizer/blob/master/lib.js
 */
'use strict';

const jwt = require('jsonwebtoken');
const jwtKey = "hobbyCarteLog530-11fwbjfaeb";

function getPolicyDocument(effect, resource) {
  const policyDocument = {}, statementOne = {};
  policyDocument.Version = '2012-10-17';
  policyDocument.Statement = [];
  statementOne.Action = 'execute-api:Invoke';
  statementOne.Effect = effect;
  statementOne.Resource = resource;
  policyDocument.Statement[0] = statementOne;
  return policyDocument;
}


// extract and return the Bearer Token from the Lambda event parameters
function getToken(event) {
  const tokenString = event.authorizationToken || "";

  const match = tokenString.match(/^Bearer (.*)$/);
  if (match && match.length >= 2) {
    return match[1];
  }
}

exports.authenticate = function (event, context, callback) {
  const token = getToken(event);
  if(token)
    jwt.verify(token, jwtKey, function (err, decoded) {
      if (err) callback(err);
      else {
        callback(null, {
          principalId: decoded.userId,
          policyDocument: getPolicyDocument('Allow', event.methodArn),
          context: {
            scope: decoded.scope
          }
        });
      }
    });
  else callback("Vous n'avez pas la permission")
};
