const pool = require('../../config/db');

class AbilityController {
    // [GET]
    async index(req, res) {
        try {
            const query = 'SELECT * FROM project_user';
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
                where pu.project_id = $1`,
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
            const { project_id, user_id } = req.body;
            
            const resProjectUser = await pool.query('select * from project_user where project_id = $1 and user_id = $2', [project_id, user_id]);
            if (resProjectUser.rows.length > 0) {
                return res.status(400).json({message: "Request is existed!"})
            }
            console.log(resProjectUser.rows.length)

            const response = await pool.query(
                'INSERT INTO project_user (project_id, user_id, is_checked) VALUES ($1, $2, $3)',
                [project_id, user_id, null],
            );

            return res.status(200).json({
                message: 'Request created successfully',
                code: '200',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    async updateIsChecked(req, res) {
        try {
            const { project_id, user_id, is_checked } = req.body;

            if (is_checked !== false && is_checked !== true) {
                return res.status(404).json({
                    message: 'is_checked is not valid',
                    code: 400,
                });
            }

            const resProject = await pool.query('SELECT * FROM project WHERE id = $1', [project_id]);
            
            if (resProject.rows.length === 0) {
                return res.status(404).json({
                    message: 'Project not found',
                    code: 404,
                });
            }

            const resUser = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
            if (resUser.rows.length === 0) {
                return res.status(404).json({
                    message: 'User not found',
                    code: 404,
                });
            }


            const response = await pool.query(
                'UPDATE project_user SET is_checked = $1 WHERE project_id = $2 and user_id = $3',
                [is_checked, project_id, user_id],
            );

            return res.status(200).json({
                message: is_checked ? 'Accept student successfully' : 'Reject student successfully',
                data: {
                    project_id,
                    user_id,
                    is_checked,
                },
            });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new AbilityController();
