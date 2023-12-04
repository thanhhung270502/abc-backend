const pool = require('../../config/db');

class ProjectUsersController {
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
    async getByUserID(req, res, next) {
        try {
            const id = parseInt(req.params.project_id);
            const response = await pool.query(
                `select *
                from project p 
                join project_user pu on pu.project_id = p.id
                where pu.user_id = $1`,
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

            if (!project_id || !user_id) {
                return res.status(400).json('Missing project_id or user_id');
            }

            // handle existed application
            const resProjectUser = await pool.query(
                'select * from project_user where project_id = $1 and user_id = $2',
                [project_id, user_id],
            );

            if (resProjectUser.rows.length > 0) {
                return res.status(400).json({ message: 'Request is existed!' });
            }

            // insert new application
            const response = await pool.query(
                'INSERT INTO project_user (project_id, user_id, is_checked) VALUES ($1, $2, $3)',
                [project_id, user_id, null],
            );

            const getCurrentProjectUser = await pool.query(
                'SELECT * FROM project_user WHERE project_id = $1 AND user_id = $2',
                [project_id, user_id],
            );

            return res.status(200).json({
                message: 'Request created successfully',
                code: '200',
                body: getCurrentProjectUser.rows[getCurrentProjectUser.rows.length - 1],
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
                return res.status(400).json({
                    message: 'is_checked is not valid',
                    code: 400,
                });
            }

            // handle not existed application
            const checkProjectUser = await pool.query(
                'SELECT * FROM project_user WHERE project_id = $1 AND user_id = $2',
                [project_id, user_id],
            );

            if (checkProjectUser.rows.length === 0) {
                return res
                    .status(404)
                    .json(`ProjectUsers with project_id = ${project_id} and user_id = ${user_id} is not available`);
            }

            // update application status 
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
            return res.status(500).json('Internal Server Error');
        }
    }

    // [DELETE]
    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);

            const checkAbility = await pool.query('SELECT * FROM project_user WHERE id = $1', [id]);

            if (checkAbility.rows.length === 0) {
                return res.status(400).json(`ProjectUser with id = ${id} is not available`);
            }

            const deleteProjectQuery = `
                DELETE FROM project_user
                WHERE id = $1
            `;
            const response = await pool.query(deleteProjectQuery, [id]);
            return res.status(200).json({
                message: 'Delete project_user successfully!',
            });
        } catch (error) {}
    }
}

module.exports = new ProjectUsersController();
