CREATE DATABASE colection;

CREATE TABLE users(
    user_id INT(12) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE consolas(
    consola_id INT(12) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(12) NOT NULL, 
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE accesorios(
    acceso_id INT(12) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(12) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE juegos(
    juego_id INT(12) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(12) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    formato VARCHAR(20) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);