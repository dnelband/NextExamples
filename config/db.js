const sqlite = require('sqlite');
const sqlite3 = require("sqlite3");

export const getDb = async () => {
    const db = await sqlite.open({
        filename: __dirname + "/mydb.sqlite",
        driver: sqlite3.Database,
    });
    return {
        db
    }
}
