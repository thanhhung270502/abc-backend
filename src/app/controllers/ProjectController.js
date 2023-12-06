const pool = require('../../config/db');

class ProjectController {
    async create(req, res) {
        try {
            const { name, description, location, start_date, end_date, quantity, uni_id } = req.body;

            const user_id = req.userID;

            if (!name) {
                return res.status(400).json('Invalid Project');
            }

            const query = `INSERT INTO project (name, description, location,start_date, end_date, quantity, uni_id,  user_id) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING id
            `;

            // const projectUniQuery = `INSERT INTO project_uni (project_id, uni_id, is_checked) VALUES ($1, $2, $3)`;

            try {
                const resUni = await pool.query('SELECT * from university where id = $1', [uni_id]);
                if (resUni.rows.length === 0) {
                    return res.status(404).json({ message: `Univeristy with id = ${uni_id} is not existed.` });
                }
            } catch (error) {
                return res.status(404).json({ message: `Error with uni_id = ${uni_id}` });
            }

            const response = await pool.query(query, [
                name,
                description,
                location,
                start_date,
                end_date,
                quantity,
                uni_id,
                user_id,
            ]);

            return res.status(201).json({
                message: 'Project created successfully',
                data: {
                    id: response.rows[0].id,
                    name,
                    description,
                    location,
                    start_date,
                    end_date,
                    quantity,
                    uni_id,
                    user_id,
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
            const response = await pool.query(
                'SELECT project.*, university.name as uni_name FROM project, university WHERE project.id = $1 and project.uni_id = university.id',
                [id],
            );
            if (response.rows.length > 0) {
                return res.status(200).json({
                    project: response.rows[0],
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
            let { id, name, description, location, user_id, start_date, end_date, quantity } = req.body;

            const prevProject = await pool.query('select * from project where id = $1', [id]);

            if (prevProject.rows.length === 0) return res.status(404).send({ message: 'Project not found' });

            if (prevProject.rows[0].user_id !== req.userID)
                return res.status(404).send({ message: "That project wasn't created by you." });

            const query = `
                UPDATE project
                SET name = $1, description = $2, location = $3, start_date = $4, end_date = $5, quantity = $6
                WHERE id = $7
            `;

            if (!name) name = prevProject.rows[0].name;
            if (!description) description = prevProject.rows[0].description;
            if (!location) location = prevProject.rows[0].location;
            if (!user_id) user_id = prevProject.rows[0].user_id;
            if (!start_date) start_date = prevProject.rows[0].start_date;
            if (!end_date) end_date = prevProject.rows[0].end_date;
            if (!quantity) quantity = prevProject.rows[0].quantity;
            if (!id) id = prevProject.rows[0].id;

            const values = [name, description, location, start_date, end_date, quantity, id];
            const response = await pool.query(query, values);

            return res.status(200).json({
                message: 'Update Project successfully!',
                data: { id, name, description, location, user_id, start_date, end_date, quantity },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    async updateIsChecked(req, res) {
        try {
            const id = parseInt(req.params.slug);
            const isChecked = req.body.isChecked;
            const resProject = await pool.query('SELECT * from project WHERE id = $1', [id]);

            if (resProject.rows.length === 0) {
                return res.status(404).json({ message: 'Project not found!' });
            }

            if (resProject.rows[0].is_checked !== null) {
                return res.status(400).json({ message: 'The project has been handle' });
            }

            const userUniId = (await pool.query('SELECT * from users WHERE id = $1', [req.userID])).rows[0].uni_id;

            if (userUniId !== resProject.rows[0].uni_id) {
                return res.status(400).json({ message: "That project wasn't created for you." });
            }

            const query = `
                UPDATE project SET is_checked = $1 WHERE id = $2
            `;

            const values = [isChecked, id];
            const response = await pool.query(query, values);

            return res.status(200).json({
                message: 'Update Project successfully!',
                data: { ...resProject.rows[0], is_checked: req.body.isChecked },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);

            const resProject = await pool.query('SELECT * from project where id = $1', [id]);

            if (resProject.rows.length === 0) return res.status(404).send({ message: 'Project not found' });

            if (resProject.rows.length === 0) {
                return res.status(400).json({ message: 'Project not found' });
            }

            if (resProject.rows[0].user_id !== req.userID) {
                return res.status(404).send({ message: "That project wasn't created by you." });
            }

            const deleteProjectQuery = `
                DELETE FROM project
                WHERE id = $1
            `;
            const response = await pool.query(deleteProjectQuery, [id]);

            return res.status(200).json({
                message: 'Delete Project successfully!',
                data: {
                    project_id: id,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }

    async getProjectUnis(req, res) {
        try {
            const response = await pool.query(
                `SELECT project_uni.id, 
                        project.id as project_id, 
                        project.name as project_name, 
                        project.description as project_description, 
                        project.location as project_location,
                        project.start_date as project_start_date,
                        project.end_date as project_end_date,
                        project.quantity as project_quantity,
                        project.is_checked as project_is_checked,
                        university.name as uni_name,
                        university.id as uni_id
                        FROM project_uni
                JOIN project ON project_uni.project_id = project.id
                JOIN university ON project_uni.uni_id = university.id`,
            );
            return res.status(200).json({
                data: response.rows,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }

    async getMyProject(req, res) {
        // Student
        try {
            if (req.userRole === 0) {
                const response = await pool.query(
                    ` 
                    SELECT   project_user.*, project.*,
                            project_user.is_checked AS user_is_checked,
                            project.is_checked AS project_is_checked
                    FROM project_user  
                    JOIN project ON project_user.project_id = project.id
                    WHERE project_user.user_id = $1
                `,
                    [req.userID],
                );

                return res.status(200).json({
                    data: response.rows,
                });
            } else if (req.userRole === 1) {
                const response = await pool.query(`SELECT * from project where project.user_id = $1`, [req.userID]);
                return res.status(200).json({
                    data: response.rows,
                });
            } else {
                const user = (await pool.query(`SELECT * from users where id = $1`, [req.userID])).rows[0];

                const response = await pool.query(`SELECT * from project where project.uni_id = $1`, [user.uni_id]);

                return res.status(200).json({
                    data: response.rows,
                });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error' });
        }
    }

    async getProjectApproved(req, res) {
        try {
            const query = 'SELECT * FROM project WHERE is_checked = true';
            const data = await pool.query(query);
            return res.status(200).json(data.rows);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new ProjectController();
