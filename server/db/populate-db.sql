-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. This is very bad from security point of view. We will have a task to encrypt the passwords
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


INSERT INTO documents (from_language_code, to_language_code, status, submission_date, due_date, owner_id, format) values ('ar','en', 'Waiting', '20-01-2019','20-02-2019','db5b2e53-acd2-4af0-bd91-8554d9dc09ef','string');
INSERT INTO documents (from_language_code, to_language_code, status, submission_date, due_date, owner_id, format) values ('zh-cn','en', 'Processing', '20-07-2019','2-08-2019', 'a2deeae9-1d8c-44ef-a187-a85dfa56fee8', 'string');
