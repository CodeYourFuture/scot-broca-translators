-- Users seed data

INSERT INTO users (id, name,email, password, role) values ('db5b2e53-acd2-4af0-bd91-8554d9dc09ef', 'Daniel','admin@cyf.org', 'admin_password','Interpreter');
INSERT INTO users (id, name,email, password, role) values ('a2deeae9-1d8c-44ef-a187-a85dfa56fee8', 'Vicky','user@cyf.org', 'user_password', 'User');
INSERT INTO users (id, name,email, password, role) values ('a2deeae8-1d8c-44ef-a187-a86dfa56fee9', 'Loic','user1@cyf.org', 'user1_password', 'User');

INSERT INTO languages (code, name) VALUES ('zh-cn','Mandarin Chinese');
INSERT INTO languages (code, name) VALUES ('ar','Arabic');
INSERT INTO languages (code, name) VALUES ('es','Spanish');
INSERT INTO languages (code, name) VALUES ('ml','Malaysian');
INSERT INTO languages (code, name) VALUES ('en','English');
INSERT INTO languages (code, name) VALUES ('ru','Russian');
INSERT INTO languages (code, name) VALUES ('be','Bengali');
INSERT INTO languages (code, name) VALUES ('fr','French');


INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Birth Certificate', 'ar','en', 'Waiting', '2019-10-09','2019-10-20','db5b2e53-acd2-4af0-bd91-8554d9dc09ef','Text', E'كان لايزال " لويس باستور" مدرسا للكيمياء في جامعة ستراسبورغ حين التقى بـ"ماري آن لوران" ابنة رئيس الجامعة التي غيرت حياته وليصبح زوجها  عالما أنقذ ملايين البشر وترك بصمة وأثراً كبيراً لدى البشرية.
ولد "باستور" في 27 كانون الاول / ديسمبر 1822 بمدينة دول في فرنسا، حصل على درجة بكالوريوس آداب سنة 1840، وحصل على الدكتوراه سنة 1847، ثم أصبح أستاذ للكيمياء في جامعة ستراسبورغ، بعد أن قضى فترة وجيزة كأستاذ فيزياء في ثانوية ديجون عام 1848.
باستور  مع زوجته
التقى بـ "ماري آن لوران" ابنة رئيس الجامعة التي تزوجها عام 1849 وأنجب منها خمسة أطفال، نجا منهم اثنان فقط بسبب المرض، مما دفعه لدراسة الجراثيم، محاولاً إيجاد علاجٍ لهذه الأمراض التي فتكت بأطفاله.
فهمت لوران زوجها منذ بداية حياتهما الزوجية، وفعلت كل ما في استطاعتها لتجنبه صعوبات الحياة وهموم المنزل لكي يتفرغ تماما للبحوث التي أجراها، بل وكانت تساعده بكتابة مايمليه عليها مساء بعد انهاء عملها المنزلي، فكانت لزوجها أحسن من رفيق وأكثر من معاون.');
INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('University Transcript','zh-cn','en', 'Processing', '2019-10-06','2019-10-25', 'a2deeae9-1d8c-44ef-a187-a85dfa56fee8', 'Text', E'战国时期，靠近北部边城，住着一个老人，名叫塞翁。塞翁养了许多马，一天，
他的马群中忽然有一匹走失了。邻居们听说这件事，跑来安慰，劝他不必太着急，年龄大了，多注意身体。
塞翁见有人劝慰，笑了笑说：丢了一匹马损失不大，没准会带来什么福气呢。
邻居听了塞翁的话，心里觉得很好笑。马丢了，明明是件坏事，他却认为也许是好事，显然是自我安慰而已。过了几天，
丢失的马不仅自动返回家，还带回一匹匈奴的骏马。邻居听说了，对塞翁的预见非常佩服，向塞翁道贺说：还是您有远见，马不仅没有丢，还带回一匹好马，真是福气呀。
塞翁听了邻人的祝贺，反而一点高兴的样子都没有，忧虑地说：白白得了一匹好马，不一定是什么福气，也许惹出什么麻烦来。
邻居们以为他故作姿态纯属老年人的狡猾。心里明明高兴，有意不说出来。
塞翁有个独生子，非常喜欢骑马。他发现带回来的那匹马顾盼生姿，身长蹄大，嘶鸣嘹亮，膘悍神骏，一看就知道是匹好马。他每天都骑马出游，心中洋洋得意。
一天，他高兴得有些过火，打马飞奔，一个趔趄，从马背上跌下来，摔断了腿。邻居听说，纷纷来慰问。
塞翁说：没什么，腿摔断了却保住性命，或许是福气呢。邻居们觉得他又在胡言乱语。他们想不出，摔断腿会带来什么福气。
不久，匈奴兵大举入侵，青年人被应征入伍，塞翁的儿子因为摔断了腿，不能去当兵。入伍的青年都战死了，唯有塞翁的儿子保全了性命。');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('High School Diploma', 'es','en', 'Waiting', '2019-12-20','2019-12-30','db5b2e53-acd2-4af0-bd91-8554d9dc09ef','Text', E'Hola, este es mi diploma por favor ayúdame a traducir y te daré un fuerte abrazo.
De todas las numerosas palabras que figuran en dicha comunicación,
tan sólo un párrafo breve está dedicado a esa cuestión,');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Bank Statement', 'es','fr', 'Waiting', '2019-10-05','2019-10-09','db5b2e53-acd2-4af0-bd91-8554d9dc09ef','Text', E'Wikipedia define un extracto bancario como "un resumen de las transacciones financieras que tienen
ocurrió durante un período determinado en una cuenta bancaria en poder de una persona o estado de cuenta comercial con una institución financiera. ”Consiste en transacciones como débito y crédito, retiros y depósitos. Los extractos bancarios generalmente se envían por correo en su formato tradicional de papel. Algunas personas aún eligen este método para que puedan verificar y ver literalmente qué actividades se han realizado a través de sus cuentas bancarias. Sin embargo, debido a la aparición de nuevas tecnologías, los extractos bancarios han evolucionado hasta convertirse en documentos que ahora se envían por correo electrónico y otros métodos digitales para enviarlos.
El dinero es un factor importante en nuestras actividades cotidianas. Compra la comida que comemos, nos lleva a transportar de un lugar a otro y obtiene las cosas que podrían hacernos felices. Sin embargo, cuando ocurren estos problemas, lo mejor que puede hacer es comunicarse con su banco. Puede ir a su sucursal más cercana o llamar a su línea directa de atención al cliente y solicitar algunas aclaraciones y explicaciones de tales eventos.
Té
');


INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Tax Form', 'en','es', 'Waiting', '2019-01-20','2019-02-20','db5b2e53-acd2-4af0-bd91-8554d9dc09ef','Text', E'Filling out a tax form is about as much fun as owing taxes to Uncle Sam. The complexity of the task intensifies as your tax life becomes more complicated.
That’s why you should use the simplest tax return form you can, especially if you’re still filling out your forms by hand.

But choose carefully. There are three personal income tax forms — 1040, 1040A and 1040EZ — with each designed to get the appropriate amount of your money to the IRS. Differences in the forms, however, could cost you if you’re not paying attention.

The EZ is the shortest and simplest form, Form 1040A is a bit more complex and the long Form 1040 is the most detailed and potentially difficult. But even if your tax life is simple and straightforward, it might be worthwhile to investigate the other two forms. Why? Generally, the longer the form, the more opportunities for tax breaks.

RATE SEARCH: Shopping for a mortgage? Compare mortgage rates today at Bankrate.com.');

insert into translations (user_id, document_id, start_date) values ('db5b2e53-acd2-4af0-bd91-8554d9dc09ef', 2, '2019-07-20');
