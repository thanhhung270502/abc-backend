const pool = require('../../config/db');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');


class UsersController {
    // [GET] /
    async index(req, res, next) {
        try {
            const query = 'SELECT * FROM users';
            const response = await pool.query(query);
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    async show(req, res, next) {
        try {
            const id = parseInt(req.params.slug);
            const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
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

    async create(req, res) {
        try {
            const { email, password, name, role, uni_id, avatar } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            if (uni_id) {
                const resUni = await pool.query('select * from university WHERE id = $1', [uni_id])
    
                if (resUni.rows.length === 0) {
                    return res.status(400).json({message: 'University not found'});
                }
            }

            if ((role === 0 || role === 2) && uni_id === null) {
                return res.status(400).json({message: "University is compulsory for student and admin"})
            }

            // Check if the user already exists
            const query = 'SELECT * FROM users WHERE email = $1';
            var getUser = await pool.query(query, [email]);
            
            if (getUser.rows.length > 0) {
                res.status(200).json({
                    message: 'This email is existed',
                    code: 409,
                    body: '',
                });
            } else {
                const response = await pool.query(
                    'INSERT INTO users (email, password, name, role, avatar, uni_id) VALUES ($1, $2, $3, $4, $5, $6)',
                    [email, password, name, role, avatar, uni_id],
                );

                getUser = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
                console.log(getUser.rows[0])
                return res.status(200).json({
                    id: getUser.rows[0].id,
                    role: getUser.rows[0].role,
                    email: getUser.rows[0].email,
                    name: getUser.rows[0].name,
                    avatar: getUser.rows[0].avatar,
                    uni_id: getUser.rows[0].uni_id,
                    accessToken: generateToken(getUser.rows[0].id, getUser.rows[0].role),
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    async authUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.stats(400).json({ message: 'Invalid email or password.' });
        }
        const response = await pool.query('select * from users where email = $1 and password = $2', [email, password]);

        if (response.rows.length === 0) {
            return res.status(400).json({ message: "User doesn't exist." });
        }

        if (password === response.rows[0].password) {
            res.status(201).json({
                id: response.rows[0].id,
                role: response.rows[0].role,
                email: response.rows[0].email,
                name: response.rows[0].name,
                avatar: response.rows[0].avatar,
                uni_id: response.rows[0].uni_id,
                accessToken: generateToken(response.rows[0].id, response.rows[0].role),
            });
        }
    }
}

module.exports = new UsersController();
