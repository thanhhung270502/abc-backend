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

            const projectUniQuery = `INSERT INTO project_uni (project_id, uni_id) VALUES ($1, $2)`;

            uni_ids.map(async (uni_id) => {
                try {
                    const createProjectUni = await pool.query(projectUniQuery, [response.rows[0].id, uni_id]);
                } catch (error) {
                    res.status(404).json({message: error.message});
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
            res.status(404).json({message: error.message});
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
            const { isChecked, uni_id } = req.body;
            console.log(isChecked, uni_id)
            const getProjectReponse = await pool.query('SELECT * FROM project WHERE id = $1', [id]);
            
            if (getProjectReponse.rows.length == 0) {
                return res.status(404).json({
                    message: 'Project not found',
                    code: 404,
                })
            };


            const getProjectUniResponse = await pool.query('UPDATE project_uni SET is_checked = $3 WHERE project_id=$1 AND uni_id=$2', [id, uni_id, isChecked])
            const query = `
                UPDATE project SET isChecked = $1 WHERE id = $2
            `;

            const values = [isChecked, id];

            const response = await pool.query(query, values);
            console.log(response)
            return res.status(200).json({
                message: 'Update Project successfully!',
                data: {
                    project_id: id,
                    uni_id: uni_id,
                    isChecked: isChecked
                },
            });
        } catch (err) {
            res.status(404).json({
                message: err.message
            })
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
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }

    async getAllProjectUni(req, res) {
        try {
            const getAllProjectUniQuery = `
                SELECT * FROM project_uni
            `;
            const response = await pool.query(getAllProjectUniQuery);
            console.log('alo')
            return res.status(200).json({
                data: response.rows,
            });
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
}

module.exports = new ProjectController();