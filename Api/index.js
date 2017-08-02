/* eslint-disable */
'use strict';
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const memberColumns = ["idMembre", "prenom", "nom", "nomUtilisateur", "courriel", "lienPhotoProfil", "dateInscription", "admin"];
const jwtKey = "hobbyCarteLog530-11fwbjfaeb";

/**
 * Create a connection for the database and call handleDisconnection to it
 * @returns Object - {Connection}
 */
function createConnection(){
  let con = mysql.createConnection({
    host     : 'log530lab3.cordr3bcsrcd.us-east-2.rds.amazonaws.com',
    user     : 'log530lab3admin',
    password : 'log530lab3pass',
    database : 'HobbyCartes'
  });
  handleDisconnection(con);
  return con;
}

/**
 * Reconnect if we have a connection error
 * @param con - Database connection
 */
function handleDisconnection (con) {
  con.on("error", function (error) {
    if (error instanceof Error) {
      if (error.code === "PROTOCOL_CONNECTION_LOST") connection = createConnection();
    }
  });
}

let connection = createConnection();

/**
 * End a connection and recreate it if we want to avoid having to reconnect each time and still avoid connection error
 */
function endConnection(){
  connection.end();
  connection = createConnection();
}

/**
 * Use appropriate callback with the right response type base on if there is an error
 * @param requestData - (context: {}, event: {}, callback: function())
 * @param error - Request error
 * @param results - Request results
 */
function handleResponse(requestData, error, results){
  if(error) requestData.callback(null, createResponse(false, 500, {}, JSON.stringify(Object.assign({}, {error}, requestData))));
  else requestData.callback(null, createResponse(false, 200, {},  JSON.stringify(results)));
}

/**
 * Extract first value of a result if it existe
 * @param results
 * @returns {{}}
 */
function extractFirstResult(results){
  return results && results.length ? results[0] : {}
}

/**
 * Extract keys of an item and join them like : name, lastName, username
 * @param item
 * @returns {string}
 */
function getFields(item){
  return Object.keys(item).join(", ");
}
function getValues(item){
  return [...Object.keys(item).map(key => item[key])];
}

/**
 * Returns something like ?, ?, ?,?
 * @param values
 * @returns {string}
 */
function getValuesToSwap(values){
  return values.map(() => "?").join(", ");
}

/**
 * Extract key and value like: key1 = value1 key2 = value2, key3 = value3
 * @param item
 * @returns {string}
 */
function getEntries(item){
  return [...Object.keys(item).map(key => key + "= ?")].join(", ")
}

/**
 * Creates a response accordingly to the out format of a lambda function for
 * proxy integration.
 *
 * @param {any} isBase64Encoded Is the body is encoded or not.
 * @param {any} statusCode The status code of the response.
 * @param {any} headers The headers to add.
 * @param {any} body The body of the response.
 * @returns (object) An object that satisfies the out format.
 * @see http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html#api-gateway-simple-proxy-for-lambda-output-format
 */
function createResponse(isBase64Encoded, statusCode, headers, body) {
  return {isBase64Encoded, statusCode, headers, body};
}

/**
 * Select a list from a table
 * @param requestData -{event, config, callback}
 * @param tableName ex: "users"
 * @param columns that we want on the list, by default it's *
 */
const getList = (requestData, tableName, columns = ["*"]) =>{
  connection.query('SELECT '+ columns.join(", ") +' FROM ' + tableName, (error, results) => {
    handleResponse(requestData, error, results);
  });
  endConnection();
};

/**
 * Get an item from a table
 * @param requestData - {event, config, callback}
 * @param tableName ex: "users"
 * @param columns that we want on the item, by default it's *
 */
const getItem = (requestData, tableName, columns = ["*"]) =>{
  const event = requestData.event;
  const id = requestData.insertId || (event && event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null);

  connection.query('SELECT '+ columns.join(", ") +' FROM ' + tableName + ' WHERE id' + tableName + ' = ?', [id], (error, results) => {
    const resultsIsEmpty = !(results && results.length);
    if(resultsIsEmpty) error = error || "Cet élément n'a pas été trouvé.";
    handleResponse(requestData, error, extractFirstResult(results));
  });
  endConnection();
};

/**
 * Insert an item in the database, then returns the result
 * @param requestData {event, config, callback}
 * @param tableName ex: "users"
 * @param item - {key: value, key2: value,...}
 * @param columns that we want on the item on select at the end, by default it's *
 */
const createItem = (requestData, tableName, item, columns) => {
  const fields = Object.keys(item).join(", ");
  const values = [...Object.keys(item).map(key => item[key])];
  const valuesToSwap = values.map(() => "?").join(", ");
  let createError;
  let insertId;

  connection.query('INSERT INTO ' + tableName + ' (' + fields +') VALUES(' + valuesToSwap + ')', values, (error, results) => {
    if(error){
      createError = error;
      handleResponse(requestData, error, results);
    }
    else insertId = results.insertId;
  });
  connection.commit(() =>{
    getItem(Object.assign({}, requestData, {insertId}), tableName, columns);
  });
  endConnection();
};


// Get an array of a resource
exports.getMembers = (event, context, callback) => getList({event, context, callback}, "membre", memberColumns);
exports.getAddresses = (event, context, callback) => getList({event, context, callback}, "adresse");
exports.getCollections = (event, context, callback) => getList({event, context, callback}, "collection");
exports.getComments = (event, context, callback) => getList({event, context, callback}, "commentaire");
exports.getEditors = (event, context, callback) => getList({event, context, callback}, "editeur");
exports.getTeams = (event, context, callback) => getList({event, context, callback}, "equipe");
exports.getCardIndexes = (event, context, callback) => getList({event, context, callback}, "fiche");
exports.getPlayers = (event, context, callback) => getList({event, context, callback}, "joueur");
exports.getMessages = (event, context, callback) => getList({event, context, callback}, "message");
exports.getSeasons = (event, context, callback) => getList({event, context, callback}, "saison");

// Get a resource
exports.getMember = (event, context, callback) => getItem({event, context, callback}, "membre", memberColumns);
exports.getAddress = (event, context, callback) => getItem({event, context, callback}, "adresse");
exports.getCollection = (event, context, callback) => getItem({event, context, callback}, "collection");
exports.getComment = (event, context, callback) => getItem({event, context, callback}, "commentaire");
exports.getEditor = (event, context, callback) => getItem({event, context, callback}, "editeur");
exports.getTeam = (event, context, callback) => getItem({event, context, callback}, "equipe");
exports.getCardIndex = (event, context, callback) => getItem({event, context, callback}, "fiche");
exports.getPlayer = (event, context, callback) => getItem({event, context, callback}, "joueur");
exports.getMessage = (event, context, callback) => getItem({event, context, callback}, "message");
exports.getSeason = (event, context, callback) => getItem({event, context, callback}, "saison");

/**
 * Return something like {user{...}, token: string}. The token is encoded using jwt.
 * @param event
 * @param context
 * @param callback
 */
exports.login = (event, context, callback) => {
  const body = event.body ? JSON.parse(event.body) : event;
  const {username, password, email} = body;

  connection.query('SELECT ' + memberColumns + ' FROM membre WHERE (nomUtilisateur = ? OR courriel = ?) AND motDePasse = ?', [username, email, password], (error, results) => {
    const resultsIsEmpty = !(results && results.length);
    if(resultsIsEmpty) error = error || "La combinaison de ce nom d'utilisateur ou courriel, ainsi que ce mot de passe est invalide.";
    else results = {user: results[0], token: jwt.sign(results[0], jwtKey)};
    handleResponse({event, context, callback}, error, results);
  });
  endConnection();
};

/**
 * Insert in the table a member and return the resulting member
 * @param event
 * @param context
 * @param callback
 */
exports.createMember = (event, context, callback) => {
  const body = event.body ? JSON.parse(event.body) : event;
  const {nomUtilisateur, motDePasse, courriel, prenom, nom, lienPhotoProfil} = body || event;
  createItem({event, context, callback}, "membre", {nomUtilisateur, motDePasse, courriel, prenom, nom, lienPhotoProfil}, memberColumns);
};

/**
 * List cardIndexes by category ordered by most recent to oldest
 * @param event
 * @param context
 * @param callback
 */
exports.getCardIndexesByCategory = (event, context, callback) => {
  const category = event && event.queryStringParameters && event.queryStringParameters.category ? event.queryStringParameters.category: null;
  connection.query("SELECT fiche.*, joueur.*, equipe.nom equipe, editeur.nom editeur, year(annee) annee, numeroJoueur, position, estRecrue " +
  "FROM fiche, joueur, saison, editeur, equipe, collection WHERE collection.type = ? AND collection.idCollection = fiche.idCollection " +
  "AND fiche.idEditeur = editeur.idEditeur AND fiche.idSaison = saison.idSaison AND saison.idEquipe = equipe.idEquipe " +
  "AND saison.idJoueur = joueur.idJoueur ORDER BY datePublication DESC", [category], (error, results) => {
    handleResponse({event, context, callback}, error, results);
  });
  endConnection();
};

/**
 * Search a string in membre using prenom, nom, nomUtilisateur and in joueur using prenom, nom. Result = {membres: [], joueurs: [])
 * @param event
 * @param context
 * @param callback
 */
exports.search = (event, context, callback) => {
  const name = event && event.queryStringParameters && event.queryStringParameters.name ? JSON.parse(event.queryStringParameters.name) + "%" : null;
  let members;
  let memberError, error;

  connection.query("SELECT " + memberColumns + ", COUNT(idFiche) nombreDeCartes FROM membre NATURAL LEFT JOIN collection NATURAL LEFT JOIN fiche WHERE (nom LIKE ?) OR (prenom LIKE ?) OR (nomUtilisateur LIKE ?) GROUP BY membre.idMembre", [name, name, name], (error, results) => {
    memberError = error;
    members = results || [];
  });
  connection.query("SELECT fiche.*, joueur.*, equipe.nom equipe, editeur.nom editeur, year(annee) annee, numeroJoueur, position, estRecrue " +
    "FROM fiche, joueur, saison, editeur, equipe, collection WHERE ((joueur.nom LIKE ?) OR (joueur.prenom LIKE ?)) AND collection.idCollection = fiche.idCollection" +
    " AND fiche.idEditeur = editeur.idEditeur AND fiche.idSaison = saison.idSaison AND saison.idEquipe = equipe.idEquipe" +
    " AND saison.idJoueur = joueur.idJoueur ORDER BY datePublication DESC", [name, name], (playerError, players = []) => {
    if(memberError || playerError) error = {memberError, playerError};
    const results = {members, players};
    handleResponse({event, context, callback}, error, results);
  });
  endConnection();
};

/**
 * Edit a member and it's address. Also create the address if it doesn't exist
 * @param event
 * @param context
 * @param callback
 */
exports.editDetailedMember = (event, context, callback) =>{
  const requestData = {event, context, callback};
  const body = event.body ? JSON.parse(event.body) : event;
  const {idMembre, numero, rue, appartement, ville, codePostal, province, pays, prenom, nom, nomUtilisateur, courriel, lienPhotoProfil} = body;
  const addressItem = {numero, rue, appartement, ville, codePostal, province, pays};
  const addressItemWithId = Object.assign({}, addressItem, {idMembre});
  const addressItemWithIdValues = getValues(addressItemWithId);
  const request = "INSERT INTO adresse ( "+ getFields(addressItemWithId)+ " ) VALUES ("+ getValuesToSwap(addressItemWithIdValues)+") " +
    "ON DUPLICATE KEY UPDATE " + getEntries(addressItem);
  let addressError, membreError;
  const memberItem = {prenom, nom, nomUtilisateur, courriel, lienPhotoProfil};

  connection.query(request, [... addressItemWithIdValues, ...getValues(addressItem)], (error, results = []) => {
    if(error){
      addressError = error;
      handleResponse(requestData, error, results);
    }
  });
  connection.query("UPDATE membre SET " +  getEntries(memberItem) + " WHERE idMembre = ?", [...getValues(memberItem), idMembre], (error = [], results) => {
    if(error){
      membreError = error;
      handleResponse(requestData, error, results);
    }
  });

  connection.commit(() =>{
    getDetailedMember(event, context, callback);
  });
  endConnection();
};

/**
 * Get a member and it's address
 * @type {function(*=, *, *)}
 */
const getDetailedMember = exports.getDetailedMember = (event, context, callback) =>{
  const id = event && event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;

  connection.query("SELECT prenom, nomUtilisateur, courriel, lienPhotoProfil, dateInscription, admin, adresse.*  FROM membre LEFT JOIN adresse ON membre.idMembre = adresse.idMembre WHERE membre.idMembre = ?", [id], (error, results) => {
    const resultsIsEmpty = !(results && results.length);
    if(resultsIsEmpty) error = error || "Cet élément n'a pas été trouvé.";
    handleResponse({event, context, callback}, error, extractFirstResult(results));
  });
  endConnection();
};
