const sqlite = require('sqlite')
const sqlite3 = require("sqlite3");

async function setup(){
    const db = await sqlite.open({
        filename: "./mydb.sqlite",
        driver: sqlite3.Database,
    });

    await db.migrate({ force: "last" });
    const users = await db.all("SELECT * FROM user");
    console.log(JSON.stringify(users, null, 4));
    const vehicle = await db.all("SELECT * FROM vehicle");
    console.log(JSON.stringify(vehicle, null, 4));
}

setup();