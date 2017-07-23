DROP TABLE IF EXISTS commentaire;
DROP TABLE IF EXISTS fiche;
DROP TABLE IF EXISTS saison;
DROP TABLE IF EXISTS equipe;
DROP TABLE IF EXISTS joueur;
DROP TABLE IF EXISTS editeur;
DROP TABLE IF EXISTS collection;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS adresse;
DROP TABLE IF EXISTS membre;

CREATE TABLE membre(
    idMembre        INTEGER PRIMARY KEY AUTO_INCREMENT,
    prenom          VARCHAR(50) NOT NULL,
    nom             VARCHAR(50) NOT NULL,
    nomUtilisateur  VARCHAR(100) NOT NULL,
    courriel        VARCHAR(100) NOT NULL,
    motDePasse      VARCHAR(100) NOT NULL,
    lienPhotoProfil VARCHAR(300),
    dateInscription DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    admin           BOOLEAN DEFAULT FALSE,
    CONSTRAINT UC_membre UNIQUE (nomUtilisateur, courriel)
);

CREATE TABLE adresse(
    idMembre        INTEGER PRIMARY KEY,
    numero          VARCHAR(10),
    rue             VARCHAR(100),
    appartement     VARCHAR(10),
    ville           VARCHAR(100),
    codePostal      CHAR(6),
    province        VARCHAR(50),
    pays            VARCHAR(50),
    FOREIGN KEY (idMembre) REFERENCES membre(idMembre) ON DELETE CASCADE
);

CREATE TABLE message(
    idCommentaire   INTEGER PRIMARY KEY AUTO_INCREMENT,
    idDestinateur   INTEGER NOT NULL,
    idDestinataire  INTEGER NOT NULL,
    objet           VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    estCommunique   BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idDestinateur) REFERENCES membre(idMembre) ON DELETE CASCADE,
    FOREIGN KEY (idDestinataire) REFERENCES membre(idMembre) ON DELETE CASCADE
);

CREATE TABLE collection(
    idCollection    INTEGER PRIMARY KEY AUTO_INCREMENT,
    idMembre        INTEGER NOT NULL,
    type            ENUM('hockey', 'football', 'baseball', 'basketball'),
    FOREIGN KEY (idMembre) REFERENCES membre(idMembre) ON DELETE CASCADE
);

CREATE TABLE editeur(
    idEditeur       INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom             VARCHAR(100) NOT NULL
);

CREATE TABLE joueur(
    idJoueur        INTEGER PRIMARY KEY AUTO_INCREMENT,
    prenom          VARCHAR(50) NOT NULL,
    nom             VARCHAR(50) NOT NULL
);

CREATE TABLE equipe(
    idEquipe        INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom             VARCHAR(100) NOT NULL
);

CREATE TABLE saison(
    idSaison        INTEGER PRIMARY KEY AUTO_INCREMENT,
    idJoueur        INTEGER NOT NULL,
    idEquipe        INTEGER NOT NULL,
    annee           DATE,
    numeroJoueur    INTEGER NOT NULL,
    position        VARCHAR(50),
    estRecrue       BOOLEAN NOT NULL,
    FOREIGN KEY (idJoueur) REFERENCES joueur(idJoueur) ON DELETE CASCADE,
    FOREIGN KEY (idEquipe) REFERENCES equipe(idEquipe) ON DELETE CASCADE
);

CREATE TABLE fiche(
    idFiche         INTEGER PRIMARY KEY AUTO_INCREMENT,
    idCollection    INTEGER NOT NULL,
    idEditeur       INTEGER NOT NULL,
    idSaison        INTEGER NOT NULL,
    datePublication DATE,
    valeur          FLOAT(15,2),
    etat            ENUM('impeccable', 'bonne', 'moyenne', 'passable', 'pietre'),
    lienImageDevant VARCHAR(300),
    lienImageDerriere   VARCHAR(300),
    FOREIGN KEY (idCollection) REFERENCES collection(idCollection) ON DELETE CASCADE,
    FOREIGN KEY (idEditeur) REFERENCES editeur(idEditeur) ON DELETE CASCADE,
    FOREIGN KEY (idSaison) REFERENCES saison(idSaison) ON DELETE CASCADE
);

CREATE TABLE commentaire(
    idCommentaire   INTEGER PRIMARY KEY AUTO_INCREMENT,
    idMembre        INTEGER NOT NULL,
    idFiche         INTEGER NOT NULL,
    message         TEXT NOT NULL,
    FOREIGN KEY (idMembre) REFERENCES membre(idMembre) ON DELETE CASCADE,
    FOREIGN KEY (idFiche) REFERENCES fiche(idFiche) ON DELETE CASCADE
);