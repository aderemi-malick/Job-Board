-- INSERT INTO Companies (name, "description", "place", "type_companies", "sector")
-- VALUES ('Orange Cyberdéfense', 'Très bon  salaire', 'Perpignan', 'Grande Entreprise', 'Cybersécurité');
Select * FROM Companies; --WHERE name='Orange Cyberdéfense';
Select * FROM People;-- WHERE lastname='Anadaol' ;
Select * FROM Ads ;
Select * FROM "Apply" ;
Select id_people, id_ads, apply_date  FROM Apply WHERE id_people = 2;
Select id_people, lastname, firstname, email, password, status FROM People WHERE email='A@a.a' AND password='QQ' ;
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'AND TABLE_CATALOG='Jobply'