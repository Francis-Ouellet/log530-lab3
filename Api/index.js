/* eslint-disable */
'use strict';
const mysql = require('mysql');
// TODO refactor when end is done and callback is sent

const connection = mysql.createConnection({
  host     : 'log530lab3.cordr3bcsrcd.us-east-2.rds.amazonaws.com',
  user     : 'log530lab3admin',
  password : 'log530lab3pass',
  database : 'HobbyCartes'
});

/**
 * Creates a response accordingly to the out format of a lambda function for
 * proxy integration.
 *
 * @param {any} isBase64Encoded Is the body is encoded or not.
 * @param {any} statusCode The status code of the response.
 * @param {any} headers The headers to add.
 * @param {any} body The body of the response.
 * @returns An object that satisfies the out format.
 * @see http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html#api-gateway-simple-proxy-for-lambda-output-format
 */
function createResponse(isBase64Encoded, statusCode, headers, body) {
  return {
    isBase64Encoded,
    statusCode,
    headers,
    body
  };
}

const getList = (tableName, callback) =>{
  connection.connect();

  connection.query('SELECT * FROM ' + tableName, (error, results) => {
    callback(null, createResponse(false, 200, {}, JSON.stringify(results)));
  });

  connection.end();
};

const getItem = (tableName, callback, event) =>{
  const id = event && event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;
  connection.connect();

  connection.query('SELECT * FROM ' + tableName + ' WHERE id' + tableName + ' = ?', [id], (error, results) => {
    callback(null, createResponse(false, 200, {},  JSON.stringify(results && results.length ? results[0] : null)));
  });

  connection.end();
};

// Get an array of a resource
exports.getMembers = (event, context, callback) => getList("membre", callback);
exports.getAddresses = (event, context, callback) => getList("adresse", callback);
exports.getCollections = (event, context, callback) => getList("collection", callback);
exports.getComments = (event, context, callback) => getList("commentaire", callback);
exports.getEditors = (event, context, callback) => getList("editeur", callback);
exports.getTeams = (event, context, callback) => getList("equipe", callback);
exports.getCardIndexes = (event, context, callback) => getList("fiche", callback);
exports.getPlayers = (event, context, callback) => getList("joueur", callback);
exports.getMessages = (event, context, callback) => getList("message", callback);
exports.getSeasons = (event, context, callback) => getList("saison", callback);

// Get a resource
exports.getMember = (event, context, callback) => getItem("membre", callback, event);
exports.getAddress = (event, context, callback) => getItem("adresse", callback, event);
exports.getCollection = (event, context, callback) => getItem("collection", callback, event);
exports.getComment = (event, context, callback) => getItem("commentaire", callback, event);
exports.getEditor = (event, context, callback) => getItem("editeur", callback, event);
exports.getTeam = (event, context, callback) => getItem("equipe", callback, event);
exports.getCardIndex = (event, context, callback) => getItem("fiche", callback, event);
exports.getPlayer = (event, context, callback) => getItem("joueur", callback, event);
exports.getMessage = (event, context, callback) => getItem("message", callback, event);
exports.getSeason = (event, context, callback) => getItem("saison", callback, event);

exports.login = (event, context, callback) => {
  const username = event && event.username ? event.username: null;
  const password = event && event.password ? event.password: null;
  connection.connect();

  connection.query('SELECT * FROM membre WHERE nomUtilisateur  = ? AND motDePasse = ?', [username, password], (error, results) => {
    // TODO Need to return error if no result
    callback(null, createResponse(false, 200, {},  JSON.stringify(results && results.length ? results[0] : null))); // TODO Authenticate user
  });

  connection.end();
};

exports.signUp = (event, context, callback) => {
  let username, password, email, firstName, lastName;
  if(event){
    username = event.username;
    password = event.password;
    email = event.email;
    firstName = event.firstName;
    lastName = event.lastName;
  }
  connection.connect();

  connection.query('INSERT INTO membre (prenom, nom, nomUtilisateur, courriel, motDePasse) VALUES(?, ?, ?, ?, ?)', [firstName, lastName, username, email, password], (error, results) => {
    // TODO Need to return error when doesn't create it
    callback(null, createResponse(false, 200, {},  JSON.stringify(results && results.length ? results[0] : null))); // TODO Return right payload
  });
  connection.commit();

  connection.end();
};
