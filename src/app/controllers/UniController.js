const pool = require('../../config/db');

class UniController {
    // [GET] /
    async index(req, res, next) {
        try {
            const query = 'SELECT * FROM university';
            const response = await pool.query(query);
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            res.status(500).json('Internal Server Error');
        }
    }
    // [GET]
    async show(req, res, next) {
        try {
            const id = parseInt(req.params.slug);
            const response = await pool.query('SELECT * FROM university WHERE id = $1', [id]);
            if (response.rows.length > 0) {
                return res.status(200).json({
                    message: 'Found univeristy successfully',
                    code: 200,
                    body: {
                        user: response.rows[0],
                    },
                });
            } else {
                return res.status(400).json({
                    message: 'University not found',
                    code: 400,
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Internal Server Error');
        }
    }
    // [POST]
    async create(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json('Invalid university');
            }

            const response = await pool.query('INSERT INTO university (name ) VALUES ($1)', [name]);

            const getUni = await pool.query('SELECT * FROM  university WHERE name = $1', [name]);

            return res.status(200).json({
                message: 'Uni created successfully',
                code: 200,
                body: getUni.rows[getUni.rows.length - 1],
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    // [PUT]
    async update(req, res) {
        try {
            const { name } = req.body;
            const id = parseInt(req.params.slug);

            const checkUni = await pool.query('SELECT * FROM university WHERE id = $1', [id]);

            if (checkUni.rows.length === 0) {
                return res.status(400).json(`University with id = ${id} is not exist`);
            }

            const query = `
                UPDATE university SET name = $1 WHERE id = $2
            `;
            const values = [name, id];
            const response = await pool.query(query, values);

            const getUni = await pool.query('SELECT * FROM  university WHERE id = $1', [id]);

            return res.status(200).json({
                message: 'update Uni successfully',
                body: {
                    uni: getUni.rows[0],
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    // [DELETE]
    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);

            const checkUni = await pool.query('SELECT * FROM university WHERE id = $1', [id]);

            if (checkUni.rows.length === 0) {
                return res.status(400).json(`University with id = ${id} is not exist`);
            }

            const deleteUniversity = `
                DELETE FROM university
                WHERE id = $1
            `;

            const response = await pool.query(deleteUniversity, [id]);
            return res.status(200).json({
                message: 'Delete Uni successfully!',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new UniController();
