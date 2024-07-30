aide moi a corriger ceci :
create database if not exists lerondpoint;

use lerondpoint;

CREATE TABLE if NOT EXISTS user (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    confpass VARCHAR(255) NOT NULL,
    adress VARCHAR(255) NOT NULL,
    birthday DATETIME DATEFORMAT(JJ/MM/AAAA) NOT NULL,
    created_ad DATETIME DEFAULT CURRENT_TIMESTAMP
);

et ajoute moi aussi une colone pour le sexes qui peut etre masculin, feminin, transgenre , ou autre !!!
