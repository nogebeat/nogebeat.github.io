CREATE DATABASE IF NOT EXISTS lerondpoint;

USE lerondpoint;

CREATE TABLE IF NOT EXISTS user (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    confpass VARCHAR(255) NOT NULL,
    adress VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    sex ENUM('masculin', 'feminin', 'transgenre', 'autre') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);