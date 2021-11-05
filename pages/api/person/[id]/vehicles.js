import { NextApiRequest, NextApiResponse } from "next";
var sqlite = require('sqlite')
var sqlite3 = require('sqlite3');

export default async function getAllVehiclesByPersonId(req = NextApiRequest,res =  NextApiResponse){
    const db = await sqlite.open({
        filename: "./mydb.sqlite",
        driver: sqlite3.Database,
    });

    const allVehicles = await db.all('select * from vehicle where ownerId = ?', [req.query.id])
    res.json(allVehicles)
}