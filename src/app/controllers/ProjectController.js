const pool = require('../../config/db');

class ProjectController {
    async create(req, res) {
        try {
            const { name, description, location, user_id, start_date, end_date } = req.body;
            const query =
                'INSERT INTO project (name, description, location, user_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6)';

            const response = await pool.query(query, [name, description, location, user_id, start_date, end_date]);

            return res.status(200).json({
                message: 'Project created successfully',
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req, res) {
        try {
            const query = 'SELECT * FROM project';
            const data = await pool.query(query);
            return res.status(200).json(data.rows);
        } catch (error) {
            console.log(error);
        }
    }

    async get(req, res) {
        try {
            const { id } = req.body;
            const response = await pool.query('SELECT * FROM project WHERE id = $1', [id]);
            if (response.rows.length > 0) {
                return res.status(200).json({
                    message: 'Found project successfully',
                    code: 200,
                    body: {
                        project: response.rows[0],
                    },
                });
            } else {
                return res.status(404).json({
                    message: 'Project not found',
                    code: 404,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            const { id, name, description, location, user_id, start_date, end_date } = req.body;
            const query = `
                UPDATE projects 
                SET name = $2, description = $3, location = $4, user_id = $5, start_date = $6, end_date = $7)
                WHERE id = $7
            `;
            const values = [name, description, location, user_id, start_date, end_date, projectId];
            const response = await pool.query(query, [name, description, location, user_id, start_date, end_date]);

            return res.status.json({
                message: 'Update Project successfully!',
            });
        } catch (err) {
            console.log(err);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.body;
            const deleteProjectQuery = `
              DELETE FROM projects
              WHERE id = $1
            `;
            const response = await pool.query(deleteProjectQuery, [id]);
            return res.status.json({
                message: 'Delete Project successfully!',
            });
        } catch (error) {}
    }
}

module.exports = new ProjectController();
