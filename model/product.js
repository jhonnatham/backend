const client = require('../config/database.js')
const database = require('../config/database.js')

const getAll = async () => {
    try {
        rows = database.query(`
            SELECT *
            FROM inventory
            ORDER BY id;
        `)
        .then( response => {
            return response.rows
        })
        .catch(err => {
            console.log(err)
            return []
        })
    } catch (error) {
        rows =  []
    }
    return rows
}

const get = async (id) => {
    try {
        product = database.query(`
            SELECT *
            FROM inventory
            WHERE id = ${id};
        `)
        .then( response => {
            if (response.rowCount == 0) {
                false
            }
            return response.rows[0]
        })
        .catch(err => {
            console.log(err)
            return false
        })
    } catch (error) {
        product = false
    }
    return product
}

const create = async ({name, available}) => {
    let res = false
    try {
        await database.query('BEGIN')
        const queryText = `INSERT INTO inventory(name, available) VALUES($1, $2) RETURNING id`
        res = await database.query(queryText, [name, available])
        await database.query('COMMIT')
    } catch (e) {
        await database.query('ROLLBACK')
        throw e
    } 

    if (res == false) {
        return false
    }
    return res.rows[0].id
}

const update = async ({id, name, available}) => {
    let res = false
    try {
        await database.query('BEGIN')
        const queryText = `UPDATE inventory SET name=$1, available=$2 WHERE id = $3 RETURNING id`
        res = await database.query(queryText, [name, available, id])
        await database.query('COMMIT')
    } catch (e) {
        await database.query('ROLLBACK')
        throw e
    } 

    if (res == false) {
        return false
    }
    return res.rows[0].id
}

const deleteOne = async ({id}) => {
    let res = false
    try {
        await database.query('BEGIN')
        const queryText = `DELETE FROM public.inventory WHERE id = $1`
        res = await database.query(queryText, [id])
        await database.query('COMMIT')
    } catch (e) {
        await database.query('ROLLBACK')
        throw e
    } 

    if (res == false) {
        return false
    }
    return true
}

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteOne
}
