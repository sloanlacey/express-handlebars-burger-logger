const connection = require('./connection');

function questionMarks(num) {
    const qArr = [];

    for (let i = 0; i < num; i++) {
        qArr.push('?');
    }

    return qArr.toString();
}

function objSql(ob) {
    const obArr = [];

    for (var key in ob) {
        const value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            obArr.push(`${key} = ${value}`);
        }
    }

    return obArr.toString();
}

const orm = {
    selectAll: function(table, cb) {
        const queryString = `SELECT * FROM ${table};`;
        console.log('orm.js console', queryString);
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },

    insertOne: function(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;
        
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(vals.length);
        queryString += ") ";

        console.log('orm.js console', queryString);
        
        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },

    updateOne: function(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`;

        queryString += " SET ";
        queryString += objSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log('orm.js console', queryString);

        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    }
}

module.exports = orm;