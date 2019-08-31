DROP TABLE if exists documents;
DROP TABLE if exists languages;
DROP TABLE if exists users;

DROP TYPE if exists user_role;
DROP Type if exists document_status;
DROP TYPE if exists format_types;


create type user_role as enum ('Interpreter', 'User');
create type document_status as enum ('Waiting', 'Processing', 'Reviewing','Completed');
create type format_types as enum ('Word','Text', 'PDF','Image');

create EXTENSION if not exists "uuid-ossp";

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
  name               VARCHAR(60) NOT NULL,
  from_language_code   VARCHAR(6) REFERENCES languages(code) NOT NULL,
  to_language_code     VARCHAR(6) REFERENCES languages(code) NOT NULL,
  status           document_status NOT NULL DEFAULT 'Waiting',
  submission_date  DATE NOT NULL,
  due_date         DATE NOT NULL,
  owner_id         uuid REFERENCES users(id) NOT NULL,
  format           format_types,
  content          TEXT NOT NULL
);
