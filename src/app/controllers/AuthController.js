const pool = require('../../config/db');

class AuthController {
    async create_or_update(req, res) {
        if (req.user) {
            try {
                const getUser = await pool.query('SELECT * FROM users WHERE email = $1', [req.user._json.email]);
                if (getUser.rows.length === 0) {
                    const addUser = await pool.query(
                        'INSERT INTO users (email, password, name, provider, role, avatar) VALUES ($1, $2, $3, $4, $5, $6)',
                        [req.user._json.email, '', req.user._json.name, req.user.provider, 0, req.user._json.picture],
                    );

                    const getCurrentUser = await pool.query('SELECT * FROM users WHERE email = $1', [
                        req.user._json.email,
                    ]);
                    return res.status(200).json({
                        error: false,
                        message: 'Successfully Logged In',
                        body: {
                            user: getCurrentUser.rows[0],
                        },
                    });
                } else {
                    return res.status(200).json({
                        error: false,
                        message: 'Successfully Logged In',
                        body: {
                            user: getUser.rows[0],
                        },
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json('Internal Server Error');
            }
        } else {
            return res.status(403).json({ error: true, message: 'Not Authorized' });
        }
    }
}

module.exports = new AuthController();
