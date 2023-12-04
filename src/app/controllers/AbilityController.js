const pool = require('../../config/db');

class AbilityController {
    // [GET]
    async index(req, res) {
        try {
            const query = 'SELECT * FROM ability';
            const response = await pool.query(query);
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
    // [GET]
    async show(req, res, next) {
        try {
            const id = parseInt(req.params.slug);
            const response = await pool.query('SELECT * FROM ability WHERE id = $1', [id]);
            if (response.rows.length > 0) {
                return res.status(200).json({
                    message: 'Found user successfully',
                    code: 200,
                    body: {
                        user: response.rows[0],
                    },
                });
            } else {
                return res.status(404).json({
                    message: 'User not found',
                    code: 404,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
    // [POST]
    async create(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json('Invalid Ability');
            }

            const response = await pool.query('INSERT INTO ability (name) VALUES ($1)', [name]);

            const getCurrentAbility = await pool.query('SELECT * FROM ability WHERE name = $1', [name]);

            return res.status(200).json({
                message: 'User created successfully',
                code: '200',
                body: getCurrentAbility.rows[getCurrentAbility.rows.length - 1],
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
            console.log(id, name);

            const checkAbility = await pool.query('SELECT * FROM ability WHERE id = $1', [id]);

            if (checkAbility.rows.length === 0) {
                return res.status(400).json(`Ability with id = ${id} is not available`);
            }

            const query = `
                UPDATE ability SET name = $1 WHERE id = $2
            `;
            const values = [name, id];
            const response = await pool.query(query, values);

            return res.status(200).json({
                message: 'Update Project successfully!',
                // data: response,
            });
        } catch (err) {
            console.log(err);
        }
    }

    // [DELETE]
    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);

            const checkAbility = await pool.query('SELECT * FROM ability WHERE id = $1', [id]);

            if (checkAbility.rows.length === 0) {
                return res.status(400).json(`Ability with id = ${id} is not available`);
            }

            const deleteProjectQuery = `
                DELETE FROM ability
                WHERE id = $1
            `;
            const response = await pool.query(deleteProjectQuery, [id]);
            return res.status(200).json({
                message: 'Delete Project successfully!',
                data: response,
            });
        } catch (error) {}
    }
}

module.exports = new AbilityController();
