const pool = require('../src/config/db');

const insertUsers = async () => {
    try {
        await pool.query(`
        INSERT INTO public.users("id", email, "password", name, avatar, provider, role)
        VALUES(1, 'kane.ly@digibank.vn', '123456', 'Thanh Hùng', 'https://kenh14cdn.com/203336854389633024/2023/8/9/photo-6-1691581011481133485486.jpg', 'manual', 0)`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// const insertLanguages = async () => {
//     try {
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// };

(async () => {
    try {
        // Insert testcases into database
        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
        await insertUsers();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
