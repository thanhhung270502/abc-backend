const pool = require('../../config/db');

class SessionsController {
    // [POST] /
    async create(req, res) {
        try {
            const { email, password } = req.body;
            console.log(`email = ${email}, password = ${password}`);
            const query = 'SELECT * FROM users WHERE email = $1 and password = $2';
            const response = await pool.query(query, [email, password]);

            if (response.rows.length > 0) {
                console.log(response.rows[0]);
                return res.status(200).json({
                    message: 'Login successfully completed',
                    code: 200,
                    body: {
                        user: response.rows[0],
                    },
                });
            } else {
                return res.status(401).json({
                    message: 'Account not found',
                    code: 401,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new SessionsController();
