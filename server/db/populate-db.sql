-- Users seed data

INSERT INTO users (id, name,email, password, role) values ('db5b2e53-acd2-4af0-bd91-8554d9dc09ef', 'Mariama','admin@cyf.org', 'admin_password','Interpreter');
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



INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Birth Certificate', 'ar','en', 'Waiting', '2019-10-08',NOW() - INTERVAL '2 DAY','a2deeae9-1d8c-44ef-a187-a85dfa56fee8','Text', E'كان لايزال " لويس باستور" مدرسا للكيمياء في جامعة ستراسبورغ حين التقى بـ"ماري آن لوران" ابنة رئيس الجامعة التي غيرت حياته وليصبح زوجها  عالما أنقذ ملايين البشر وترك بصمة وأثراً كبيراً لدى البشرية.
ولد "باستور" في 27 كانون الاول / ديسمبر 1822 بمدينة دول في فرنسا، حصل على درجة بكالوريوس آداب سنة 1840، وحصل على الدكتوراه سنة 1847، ثم أصبح أستاذ للكيمياء في جامعة ستراسبورغ، بعد أن قضى فترة وجيزة كأستاذ فيزياء في ثانوية ديجون عام 1848.
باستور  مع زوجته
التقى بـ "ماري آن لوران" ابنة رئيس الجامعة التي تزوجها عام 1849 وأنجب منها خمسة أطفال، نجا منهم اثنان فقط بسبب المرض، مما دفعه لدراسة الجراثيم، محاولاً إيجاد علاجٍ لهذه الأمراض التي فتكت بأطفاله.
فهمت لوران زوجها منذ بداية حياتهما الزوجية، وفعلت كل ما في استطاعتها لتجنبه صعوبات الحياة وهموم المنزل لكي يتفرغ تماما للبحوث التي أجراها، بل وكانت تساعده بكتابة مايمليه عليها مساء بعد انهاء عملها المنزلي، فكانت لزوجها أحسن من رفيق وأكثر من معاون.');
INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('University Transcript','zh-cn','en', 'Processing', '2019-10-02',NOW() + INTERVAL '10 DAY', 'a2deeae9-1d8c-44ef-a187-a85dfa56fee8', 'Text', E'战国时期，靠近北部边城，住着一个老人，名叫塞翁。塞翁养了许多马，一天，
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

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('High School Diploma', 'es','en', 'Waiting', '2019-08-08',NOW() + INTERVAL '19 DAY','a2deeae9-1d8c-44ef-a187-a85dfa56fee8','Text', E'Hola, este es mi diploma por favor ayúdame a traducir y te daré un fuerte abrazo.
De todas las numerosas palabras que figuran en dicha comunicación,
tan sólo un párrafo breve está dedicado a esa cuestión,');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Bank Statement', 'es','fr', 'Waiting', '2019-10-08',NOW() + INTERVAL '40 DAY','a2deeae9-1d8c-44ef-a187-a85dfa56fee8','Text', E'Wikipedia define un extracto bancario como "un resumen de las transacciones financieras que tienen
ocurrió durante un período determinado en una cuenta bancaria en poder de una persona o estado de cuenta comercial con una institución financiera. ”Consiste en transacciones como débito y crédito, retiros y depósitos. Los extractos bancarios generalmente se envían por correo en su formato tradicional de papel. Algunas personas aún eligen este método para que puedan verificar y ver literalmente qué actividades se han realizado a través de sus cuentas bancarias. Sin embargo, debido a la aparición de nuevas tecnologías, los extractos bancarios han evolucionado hasta convertirse en documentos que ahora se envían por correo electrónico y otros métodos digitales para enviarlos.
El dinero es un factor importante en nuestras actividades cotidianas. Compra la comida que comemos, nos lleva a transportar de un lugar a otro y obtiene las cosas que podrían hacernos felices. Sin embargo, cuando ocurren estos problemas, lo mejor que puede hacer es comunicarse con su banco. Puede ir a su sucursal más cercana o llamar a su línea directa de atención al cliente y solicitar algunas aclaraciones y explicaciones de tales eventos.
Té
');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Tax Form', 'en','es', 'Waiting', '2019-09-15',NOW() - INTERVAL '1 DAY','a2deeae9-1d8c-44ef-a187-a85dfa56fee8','Text', E'Filling out a tax form is about as much fun as owing taxes to Uncle Sam. The complexity of the task intensifies as your tax life becomes more complicated.
That’s why you should use the simplest tax return form you can, especially if you’re still filling out your forms by hand.

But choose carefully. There are three personal income tax forms — 1040, 1040A and 1040EZ — with each designed to get the appropriate amount of your money to the IRS. Differences in the forms, however, could cost you if you’re not paying attention.

The EZ is the shortest and simplest form, Form 1040A is a bit more complex and the long Form 1040 is the most detailed and potentially difficult. But even if your tax life is simple and straightforward, it might be worthwhile to investigate the other two forms. Why? Generally, the longer the form, the more opportunities for tax breaks.

RATE SEARCH: Shopping for a mortgage? Compare mortgage rates today at Bankrate.com.');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Bank Statement', 'es','fr', 'Waiting', '2019-09-15',NOW() + INTERVAL '16 DAY','a2deeae8-1d8c-44ef-a187-a86dfa56fee9','Text', E'Wikipedia define un extracto bancario como "un resumen de las transacciones financieras que tienen
ocurrió durante un período determinado en una cuenta bancaria en poder de una persona o estado de cuenta comercial con una institución financiera. ”Consiste en transacciones como débito y crédito, retiros y depósitos. Los extractos bancarios generalmente se envían por correo en su formato tradicional de papel. Algunas personas aún eligen este método para que puedan verificar y ver literalmente qué actividades se han realizado a través de sus cuentas bancarias. Sin embargo, debido a la aparición de nuevas tecnologías, los extractos bancarios han evolucionado hasta convertirse en documentos que ahora se envían por correo electrónico y otros métodos digitales para enviarlos.
El dinero es un factor importante en nuestras actividades cotidianas. Compra la comida que comemos, nos lleva a transportar de un lugar a otro y obtiene las cosas que podrían hacernos felices. Sin embargo, cuando ocurren estos problemas, lo mejor que puede hacer es comunicarse con su banco. Puede ir a su sucursal más cercana o llamar a su línea directa de atención al cliente y solicitar algunas aclaraciones y explicaciones de tales eventos.
Té,');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Employment Contract', 'es','fr', 'Waiting', '2019-10-08',NOW() + INTERVAL '30 DAY','a2deeae8-1d8c-44ef-a187-a86dfa56fee9','Text', E'Por lo general, un contrato de trabajo se define como el "contrato de servicio". [2] Históricamente, un contrato de servicio se ha distinguido de un contrato para el suministro de servicios, la expresión modificada para implicar la línea divisoria entre una persona que está "empleada" y alguien que está "por cuenta propia". El propósito de la línea divisoria es atribuir derechos a algunos tipos de personas que trabajan para otros. Este podría ser el derecho a un salario mínimo, vacaciones, licencia por enfermedad, despido justo, [3] una declaración escrita del contrato, el derecho a organizarse en un sindicato, etc. La suposición es que las personas verdaderamente autónomas deberían poder ocuparse de sus propios asuntos y, por lo tanto, el trabajo que realizan para otros no debería conllevar la obligación de velar por estos derechos.

En la ley romana, la dicotomía equivalente era entre locatio conductio operarum (contrato de trabajo) y locatio conductio operis (contrato de servicios). [4] [5]

La terminología se complica por el uso de muchos otros tipos de contratos que involucran a una persona que trabaja para otra. En lugar de ser considerado un "empleado", el individuo podría ser considerado un "trabajador" (lo que podría significar menos protección de la legislación laboral) o tener una "relación laboral" (lo que podría significar protección en algún punto intermedio) o un "profesional" o un "empresario dependiente", y así sucesivamente. Diferentes países adoptarán enfoques más o menos sofisticados o complicados para la cuestión.
,');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Transcript', 'zh-cn','en', 'Waiting', '2019-10-01',NOW() + INTERVAL '25 DAY','a2deeae8-1d8c-44ef-a187-a86dfa56fee9','Text', E'如果您正在欧洲大学申请课程，大多数机构会要求您提供成绩单。但是，某些机构可能会要求您提供文凭补充。本文档包括学术成绩单，一份根据欧洲学分转移计划（ECTS）学分量化您的课程的声明以及描述高等教育系统的其他信息。

有两种学分制：英国大学采用的学分制；以及其他许多欧洲国家/地区使用的ECTS。根据英格兰高等教育学分框架，我们将每年的全日制本科学习等同于120学分和180学分的研究生学习。对于ECTS，这相当于本科学习60学分，研究生学习60-90学分。大学的课程不是模块化授课的，因此我们不会将学分权重应用于您课程的各个组成部分。

在订购文凭补充之前，请检查这是您申请的必要条件，并且我们能够为您提供奖励。如果我们无法为您的奖项出示成绩单，我们将无法为该奖项出示文凭补充。

如果');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Legal Statement', 'en','es', 'Waiting', '2019-10-08',NOW() + INTERVAL '3 DAY','a2deeae8-1d8c-44ef-a187-a86dfa56fee9','Text', E'Document comes from the Latin verb meaning "to teach," so a document instructs you with the information it contains. Legal documents such as contracts contain instructions on how the people signing it will act. With the onset of the Internet and electronic equipment such as the personal computers and cell-phones, legal instruments or formal legal documents have undergone a progressive change of dematerialisation. In this electronic age, document authentication can now be verified digitally using various software. All documents needing authentication can be processed as digital documents with all the necessary information such as date and time stamp imbedded. To prevent tampering or unauthorized changes to the original document, encryption is used.
In modern times, authentication is no longer limited to the type of paper used, the specialized seal, stamps, etc., as document authentication software helps secure the original context. The use of electronic legal documents is most prominent in the United States courts. Most American courts prefer the filing of electronic legal documents over paper. However, there is not yet a public law to unify the different standards of document authentication.
Therefore, one must know the courts requirement before filing court papers.

To address part of this concern, the United States Congress enacted the Electronic Signatures in Global and National Commerce Act in 2000 (P.L. 106-229 of 2000, 15 USCS sec. 7001) specifying that no court could thereafter fail to recognize a contract simply because it was digitally signed. The law is very permissive, making essentially any electronic character in a contract sufficient. It is also quite restrictive in that it does not force the recognition of some document types in electronic form, no matter what the electronic character might be. No restriction is made to signatures which are adequately cryptographically tied to both the document text (see message digest) and to a particular key whose use should be restricted to certain persons (e.g., the alleged sender). There is thus a gap between what the cryptographic engineering can provide and what the law assumes is both possible and meaningful.
Several states had already enacted laws on the subject of electronic legal documents and signatures before the U.S. Congress had acted, including Utah, Washington, and California to name only a few of the earliest. They vary considerably in intent, coverage, cryptographic understanding, and effect.
Several other nations and international bodies have also enacted statutes and regulations regarding the validity and binding nature of digital signatures.To date, the variety (and inadequacy) of the definitions used for digital signatures (or electronic signatures) have produced a legal and contractual minefield for those who may be considering relying on the legality and enforceability of digitally signed contracts in any of many jurisdictions. Adequate legislation adequately informed by cryptographic engineering technology remains an elusive goal. That it has been fully, or adequately, achieved (in any jurisdiction) is a claim which must be taken with considerable caution.Passports, driver’s licenses and birth certificates are all official documents. As a verb, document means "to record in detail," or "offer supporting evidence for." If you call a company to complain about something, make sure to document your phone calls by noting the date you called, who you spoke to and what was said,');

INSERT INTO documents (name, from_language_code, to_language_code, status, submission_date, due_date, owner_id, format, content) values ('Test Result', 'ru','ml', 'Waiting', '2019-09-28',NOW() + INTERVAL '2 DAY','a2deeae8-1d8c-44ef-a187-a86dfa56fee9','Text', E'Если вы ждете результатов лабораторных исследований или пытаетесь понять, что они означают, процесс и все эти медицинские термины и цифры могут сбивать с толку.

Есть тысячи лабораторных тестов, и их результаты могут означать разные вещи. Но несколько общих рекомендаций могут помочь пролить свет на некоторые вопросы.

Как врачи используют лабораторные анализы?

Никто не любит тыкать иглой или мочиться в чашку. Но лабораторные анализы являются важными инструментами, и врачи используют их несколькими различными способами:

Чтобы узнать, как вы в целом, как холестерин или сахар в крови,');

insert into translations (user_id, document_id, start_date) values ('db5b2e53-acd2-4af0-bd91-8554d9dc09ef', 2, '2019-07-20');
