import { NextApiRequest, NextApiResponse } from "next";
var sqlite = require('sqlite')
var sqlite3 = require('sqlite3');

export default async function getAllVehicles(req = NextApiRequest, res = NextApiResponse){
    const db = await sqlite.open({
        filename: "./mydb.sqlite",
        driver: sqlite3.Database,
    });
    const vehicles = await db.all('select * from vehicle');
    res.json(vehicles)
}