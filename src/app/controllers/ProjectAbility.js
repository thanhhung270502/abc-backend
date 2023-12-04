const pool = require('../../config/db');

class AbilityController {
    // [GET]
    async index(req, res) {
        try {
            const query = 'SELECT * FROM project_ability join ability on ability.id = project_ability.project_ability';
            const response = await pool.query(query);
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
    // [GET]
    async getByProjectID(req, res, next) {
        try {
            const id = parseInt(req.params.project_id);
            const response = await pool.query(
                `select *
                from users u 
                join project_user pu on pu.user_id = u.id
                where pu.project_id = $1 and pu.is_checked = true`,
                [id],
            );
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
    // [POST]
    async create(req, res) {
        try {
            const { project_id, ability_id } = req.body;
            const response = await pool.query('INSERT INTO project_user (project_id, ability_id) VALUES ($1, $2)', [
                project_id,
                ability_id,
            ]);

            return res.status(200).json({
                message: 'User created successfully',
                code: '200',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new AbilityController();
