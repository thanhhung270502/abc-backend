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
            const { project_id } = req.body;

            const user_id = req.userID;

            if (!project_id || !user_id) {
                return res.status(400).json('Missing project_id or user_id');
            }

            const resProject = await pool.query('select * from project where id = $1', [project_id]);
            if (resProject.rows[0].length === 0) {
                return res.status(404).json({ message: 'Project is not found.' });
            }
            if (resProject.rows[0].is_checked !== true) {
                return res.status(401).json({ message: 'This projects has not been approved.' });
            }

            const resProjectUser = await pool.query(
                'select * from project_user where project_id = $1 and user_id = $2',
                [project_id, user_id],
            );

            if (resProjectUser.rows.length > 0) {
                return res.status(409).json({ message: 'Request is existed!' });
            }

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
                body: getCurrentProjectUser.rows[0],
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

            const projectRes = await pool.query('SELECT * from project where id = $1', [project_id]);

            if (projectRes.rows.length === 0) {
                return res.status(404).json({ message: 'project not found' });
            }

            if (projectRes.rows[0].user_id !== req.userID) {
                return res.status(400).json({ message: "That project wasn't created by you." });
            }

            const checkProjectUser = await pool.query(
                'SELECT * FROM project_user WHERE project_id = $1 AND user_id = $2',
                [project_id, user_id],
            );

            if (checkProjectUser.rows.length === 0) {
                return res.status(404).json({ message: `User with id = ${user_id} hasn't been apply this project.` });
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
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }

    // [DELETE]
    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);

            const projectUserRes = await pool.query('SELECT * FROM project_user WHERE id = $1', [id]);

            if (projectUserRes.rows.length === 0) {
                return res.status(400).json(`ProjectUser with id = ${id} is not available`);
            }

            if (projectUserRes.rows[0].user_id !== req.userID) {
                return res.status(400).json('That request wasnt created by you.');
            }

            const deleteProjectQuery = `
                DELETE FROM project_user
                WHERE id = $1
            `;

            const response = await pool.query(deleteProjectQuery, [id]);
            return res.status(200).json({
                message: 'Delete project_user successfully!',
            });
        } catch (error) {
            return res.status(500).json('Error');
        }
    }
}

module.exports = new AbilityController();
