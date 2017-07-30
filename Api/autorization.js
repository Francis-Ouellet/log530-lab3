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
  const methodArn = event.methodArn;
  if(token && methodArn) {
    let memberId;
    const dependsOnMember = methodArn.match(/(\/members\/[0-9]+(\/|$))/i);
    const isGet = methodArn.match(/GET/);
    if (dependsOnMember && !isGet) memberId = +dependsOnMember[0].split("/")[2];
    jwt.verify(token, jwtKey, function (err, decoded) {
      if (err) callback(null, err);
      else {
        if(!memberId || (memberId && memberId === decoded.idMembre)) {
          callback(null, {
            principalId: decoded.idMembre,
            policyDocument: getPolicyDocument('Allow', event.methodArn),
            context: {
              scope: decoded.scope
            }
          });
        }
        else callback("Vous n'avez pas la permission");
      }
    });
  }
  else callback("Vous n'avez pas la permission")
};
