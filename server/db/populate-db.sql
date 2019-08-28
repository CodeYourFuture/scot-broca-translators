-- Users seed data

INSERT INTO users (id, name,email, password, role) values ('db5b2e53-acd2-4af0-bd91-8554d9dc09ef', 'Daniel','admin@cyf.org', 'admin_password','Interpreter');
INSERT INTO users (id, name,email, password, role) values ('a2deeae9-1d8c-44ef-a187-a85dfa56fee8', 'Nada','user@cyf.org', 'user_password', 'User');

INSERT INTO languages (code, name) VALUES ('zh-cn','Mandarin Chinese');
INSERT INTO languages (code, name) VALUES ('ar','Arabic');
INSERT INTO languages (code, name) VALUES ('es','Spanish');
INSERT INTO languages (code, name) VALUES ('ml','Malaysian');
INSERT INTO languages (code, name) VALUES ('en','English');
INSERT INTO languages (code, name) VALUES ('ru','Russian');
INSERT INTO languages (code, name) VALUES ('be','Bengali');
INSERT INTO languages (code, name) VALUES ('fr','French');


INSERT INTO documents (from_language_code, to_language_code, status, submission_date, due_date, owner_id, format) values ('ar','en', 'Waiting', '2019-01-20','2019-02-20','db5b2e53-acd2-4af0-bd91-8554d9dc09ef','Text');
INSERT INTO documents (from_language_code, to_language_code, status, submission_date, due_date, owner_id, format) values ('zh-cn','en', 'Processing', '2019-07-20','2019-08-02', 'a2deeae9-1d8c-44ef-a187-a85dfa56fee8', 'Text');
