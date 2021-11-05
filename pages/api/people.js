import { NextApiRequest, NextApiResponse } from "next";
import { getDb } from './../../config/db'

export default async function getPeople(req = NextApiRequest, res = NextApiResponse){
    const { db } = await getDb()
    if (req.method === "POST"){
        await db.run(
            'INSERT INTO person(name,email) VALUES (?,?)',
            req.body.name,
            req.body.email
        );
    }

    let people = await db.all('select * from person');
    res.json(people)
}