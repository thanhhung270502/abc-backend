const pool = require('../src/config/db');

const insertUsers = async () => {
    try {
        await pool.query(`

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2020',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2020',
            'Dĩ An, Bình Dương',
            789,  
            '2020-06-15',
            '2020-08-17',
            25
        );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2021',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2021',
            'Dĩ An, Bình Dương',
            789,  
            '2021-06-15',
            '2021-08-17',
            25
        );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2022',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2022',
            'Dĩ An, Bình Dương',
            789,  
            '2022-06-15',
            '2022-08-17',
            25
        );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2023',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2023',
            'Dĩ An, Bình Dương',
            789,  
            '2023-06-15',
            '2023-08-17',
            25
        );
        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) VALUES (    
            'Hội thảo Bảo vệ Môi trường Mùa hè xanh',
            'Hội thảo thường niên về bảo vệ môi trường và sử dụng bền vững tại vùng Đông Nam Á.',
            'Công viên Cây xanh, Thành phố X',
            789,  
            '2023-06-15',
            '2023-06-17',
            25
        );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) VALUES (
            'Khám phá Thiên nhiên trong Mùa hè xanh',
            'Chuyến thám hiểm thiên nhiên tại khu vực dã ngoại.',
            'Khu rừng quốc gia ABC, Thành phố Y',
            456,
            '2023-07-10',
            '2023-07-15',
            150
            );
            
            
            INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity) VALUES (
            'Khám phá Thiên nhiên trong Mùa hè xanh',
            'Chuyến thám hiểm thiên nhiên tại khu vực dã ngoại.',
            'Khu rừng quốc gia ABC, Thành phố Y',
            456,
            '2023-07-10',
            '2023-07-15',
            150
            );

        `);
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
