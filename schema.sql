CREATE DATABASE IF NOT EXISTS GestorTareas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE GestorTareas;

CREATE TABLE IF NOT EXISTS usuarios (
  id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(100)    NOT NULL,
  email      VARCHAR(150)    NOT NULL,
  password   VARCHAR(255)    NOT NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email)
)
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Tareas (
  id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  id_usuario  INT UNSIGNED    NOT NULL,
  nombre     VARCHAR(100)    NOT NULL,
  descripcion TEXT            NOT NULL,
  tipo       VARCHAR(50)     NOT NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE KEY uq_nombre (nombre)
)
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;