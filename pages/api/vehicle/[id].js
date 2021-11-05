import { NextApiRequest, NextApiResponse } from "next";
var sqlite = require('sqlite')
var sqlite3 = require('sqlite3');

export default async function getVehicleById(req = NextApiRequest, res = NextApiResponse){
    const db = await sqlite.open({
        filename: "./mydb.sqlite",
        driver: sqlite3.Database,
    });

    if (req.method === "PUT"){
        
        await db.run(
            'UPDATE vehicle SET brand = ?, model = ?, picture = ? where id = ?',
            req.body.brand,
            req.body.model,
            req.body.picture,
            req.query.id
        );
    }

    const vehicle = await db.get('select * from vehicle where id = ?', [req.query.id])
    res.json(vehicle)
}