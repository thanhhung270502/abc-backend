const pool = require('../../config/db');

class ProjectController {
    async create(req, res) {
        try {
            const { name, description, location, user_id, start_date, end_date, quantity, uni_ids } = req.body;
            if (!name) {
                return res.status(400).json('Invalid Project')
            }

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
                } catch (error) {
                    console.log(error);
                    return res.status(500).json('Internal Server Error');
                }
            });

            return res.status(201).json({
                message: 'Project created successfully',
                data: {
                    name,
                    description,
                    location,
                    user_id,
                    start_date,
                    end_date,
                    quantity,
                    id: response.rows[0].id
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }

    async getAll(req, res) {
        try {
            const query = 'SELECT * FROM project';
            console.log('alo')
            const data = await pool.query(query);
            return res.status(200).json(data.rows);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
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
                        project: response,
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
            return res.status(500).json('Internal Server Error');

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
            return res.status(500).json('Internal Server Error');
        }
    }

    async updateIsChecked(req, res) {
        try {
            const id = parseInt(req.params.slug);
            const { isChecked } = req.body;
  

            const query = `
                UPDATE project SET is_checked = $1 WHERE id = $2
            `;
            
            const values = [isChecked, id];
            const response = await pool.query(query, values);

            const resProject = (await pool.query('SELECT * from project WHERE id = $1', [id]))
            if (resProject.rows.length === 0) {
                return res.status(400).json({message: 'Project not found!'});
            }       

            return res.status(200).json({
                message: 'Update Project successfully!',
                data: resProject.rows[0],
            });
        } catch (err) {
            return res.status(500).json('Internal Server Error');
        }
    }

    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);

            const resProject = await pool.query('SELECT * from project where id = $1', [id])

            if (resProject.rows.length === 0) {
                return res.status(400).json({message: 'Project not found'})
            }

            const deleteProjectQuery = `
                DELETE FROM project
                WHERE id = $1
            `;
            const response = await pool.query(deleteProjectQuery, [id]);
            return res.status(200).json({
                message: 'Delete Project successfully!',
                data: {
                    project_id: id
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new ProjectController();
