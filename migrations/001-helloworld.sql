-- Up

CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

CREATE TABLE Vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    picture TEXT,
    ownerId INTEGER REFERENCES Person(id)
);

INSERT INTO Person (name,email) values ('bruno','bbbb@asfasfsa.com');
INSERT INTO Person (name,email) values ('daavid','d@b.com');
INSERT INTO Vehicle (brand,model,picture,ownerId) values ('audi','galaxy','uploads/1.jpg',1);
INSERT INTO Vehicle (brand,model,picture,ownerId) values ('audi','R BIF GICK','uploads/1.jpg',1);
INSERT INTO Vehicle (brand,model,picture,ownerId) values ('merzedez','benz','uploads/1.jpg',2);

-- Down
DROP TABLE Person;
DROP TABLE Vehicle;