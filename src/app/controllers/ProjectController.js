const pool = require('../../config/db');

class ProjectController {
    async create(req, res) {
        try {
            const { name, description, location, user_id, start_date, end_date, quantity, uni_ids } = req.body;
            console.log(req.body);

            const query = `INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id
                `;

            const response = await pool.query(query, [
                name,
                description,
                location,
                user_id,
                start_date,
                end_date,
                quantity,
            ]);

            const projectUniQuery = `INSERT INTO project_uni (project_id, uni_id, is_checked) VALUES ($1, $2, $3)`;
            uni_ids.map(async (uni_id) => {
                try {
                    const createProjectUni = await pool.query(projectUniQuery, [response.rows[0].id, uni_id, false]);
                    console.log('ek');
                } catch (error) {
                    console.log(error);
                }
            });

            return res.status(200).json({
                message: 'Project created successfully',
                data: {
                    name,
                    description,
                    location,
                    user_id,
                    start_date,
                    end_date,
                    quantity,
                },
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
            const id = parseInt(req.params.slug);
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
            const { id, name, description, location, user_id, start_date, end_date, quantity } = req.body;
            const query = `
                UPDATE project
                SET name = $1, description = $2, location = $3, user_id = $4, start_date = $5, end_date = $6, quantity = $7)
                WHERE id = $8
            `;
            const values = [name, description, location, user_id, start_date, end_date, quantity, id];
            const response = await pool.query(query, values);

            return res.status(200).json({
                message: 'Update Project successfully!',
                data: response,
            });
        } catch (err) {
            console.log(err);
        }
    }

    async updateIsChecked(req, res) {
        try {
            const id = parseInt(req.params.slug);
            const { isChecked } = req.body;
            const query = `
                UPDATE project SET isChecked = $1 WHERE id = $2
            `;
            const values = [isChecked, id];
            const response = await pool.query(query, values);

            return res.status(200).json({
                message: 'Update Project successfully!',
                data: response,
            });
        } catch (err) {
            console.log(err);
        }
    }

    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);
            const { project_id } = parseInt(req.body);
            console.log(id);
            const deleteProjectQuery = `
                DELETE FROM project
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

module.exports = new ProjectController();
