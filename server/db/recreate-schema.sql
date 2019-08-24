DROP TABLE if exists documents;
DROP TABLE if exists languages;
DROP TABLE if exists users;

create type user_role as enum ('Translator', 'User');
create type document_status as enum ('Waiting', 'Processing', 'Reviewing','Completed');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name     VARCHAR(30) NOT NULL,
  email    VARCHAR(30) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role     user_role
);

CREATE TABLE languages (
  code  VARCHAR(6) PRIMARY KEY ,
  name  VARCHAR (30) NOT NULL
);

CREATE TABLE documents (
  id               SERIAL PRIMARY KEY,
  from_language_code   VARCHAR(6) REFERENCES languages(code) NOT NULL,
  to_language_code      VARCHAR(6) REFERENCES languages(code) NOT NULL,
  status           document_status,
  submission_date  DATE NOT NULL,
  due_date         DATE NOT NULL,
  owner_id         uuid REFERENCES users(id) NOT NULL,
  format           VARCHAR(30) NOT NULL
);
