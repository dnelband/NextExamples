import { NextApiRequest, NextApiResponse } from "next";
var sqlite = require('sqlite')
var sqlite3 = require('sqlite3');

export default async function getPersonById(req = NextApiRequest, res = NextApiResponse){

    const db = await sqlite.open({
        filename: "./mydb.sqlite",
        driver: sqlite3.Database,
    });

    if (req.method === "PUT"){
        await db.run(
            'UPDATE person SET name = ?, email = ? where id = ?',
            req.body.name,
            req.body.email,
            req.query.id
        );
    }

    if (req.method === "DELETE"){
        await db.run(
            'DELETE from PERSON where id = ?',
            req.query.id
        );
    }


    const person = await db.get('select * from person where id = ?', [req.query.id])
    res.json(person)
}