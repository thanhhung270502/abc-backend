const pool = require('../src/config/db');

const insertProject = async () => {
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

const insertUnivercity = async () => {
    try {
        await pool.query(`

        INSERT INTO university (name) VALUES (    
            'UEF'
        );


        INSERT INTO university (name) VALUES (    
            'VNU'
        );


        INSERT INTO university (name) VALUES (    
            'TMU'
        );

        INSERT INTO university (name) VALUES (    
            'HUST'
        );

        INSERT INTO university (name) VALUES (    
            'HUP'
        );


        INSERT INTO university (name) VALUES (    
            'HCMUT'
        );

        INSERT INTO university (name) VALUES (    
            'IUH'
        );

        `);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertProjectUser = async () => {
    try {
        await pool.query(`

        INSERT INTO project_user (project_id, user_id, is_checked) VALUES (    
            1, 1, true
        );


        INSERT INTO project_user (project_id, user_id, is_checked) VALUES (    
            1, 2, true
        );


        INSERT INTO project_user (project_id, user_id, is_checked) VALUES (    
            1, 3, true
        );

        INSERT INTO project_user (project_id, user_id, is_checked) VALUES (    
            2, 1, true
        );


        INSERT INTO project_user (project_id, user_id, is_checked) VALUES (    
            2, 2, true
        );


        INSERT INTO project_user (project_id, user_id, is_checked) VALUES (    
            2, 3, true
        );

        `);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertUsers = async () => {
    try {
        await pool.query(`

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'qwe@gmail.com',
            '123',
            'ahaha',
            'tatat',
            'manual',
            0,
            '1'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'nonono@gmail.com',
            'yesyesyes',
            'yesorno',
            'nooooo',
            'manual',
            0,
            '2'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'tuilaai@gmail.com',
            'ailatui',
            'latuiai',
            'latuilatui',
            'manual',
            0,
            '3'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'tuilauser@gmail.com',
            'userlatui',
            'username',
            'avatarcuauser',
            'manual',
            0,
            '4'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'ohnouser@gmail.com',
            'khongco',
            'vodanh',
            'noanh',
            'manual',
            0,
            '5'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'no6@gmail.com',
            'weas',
            'kakakaka',
            'meme',
            'manual',
            0,
            '6'
        );


        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'tutituitui@gmail.com',
            'iiiiiaaaa',
            'addmin',
            'earth',
            'manual',
            0,
            '7'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'leeeee@gmail.com',
            'eeeel',
            'leeminho',
            'lominhe',
            'manual',
            1,
            '1'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'leadiii@gmail.com',
            'eeeehh',
            'leader',
            'avatarleader',
            'manual',
            1,
            '2'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'tuitretrau@gmail.com',
            'tuicontre',
            'tuimuonchill',
            'avatarlagi',
            'manual',
            1,
            '3'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'bobietbay123@gmail.com',
            'boanco',
            'bayaby',
            'conbo',
            'manual',
            1,
            '4'
        );


        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'tuilaso6@gmail.com',
            'tuigonham',
            'tentuila5',
            'tuikoco',
            'manual',
            1,
            '5'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'sixsix@gmail.com',
            'xisxis',
            'sixxxx',
            'sisisisi',
            'manual',
            1,
            '6'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'ahoiahoi@gmail.com',
            'heheheaa',
            'heyaaa',
            'nananono',
            'manual',
            1,
            '7'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'aaa@gmail.com',
            'aaa',
            'aaa',
            'aaa',
            'manual',
            2,
            '1'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'student@gmail.com',
            'abcxyz',
            'imstudent',
            'heishe',
            'manual',
            2,
            '2'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'believeme@gmail.com',
            'tuikotin',
            'tintui',
            'tuilaavatar',
            'manual',
            2,
            '3'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'tuilasinhvien@gmail.com',
            'sinhvien',
            'sinhvien',
            'anhsinhvien',
            'manual',
            2,
            '4'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'sinhviengmail@gmail.com',
            'ggmali',
            'ggeznoob',
            'anhsinhvien',
            'manual',
            2,
            '5'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'toolate@gmail.com',
            'lateee',
            'imlate',
            'rolee',
            'manual',
            2,
            '6'
        );

        INSERT INTO users (email, password, name, avatar, provider, role, uni_id) VALUES (    
            'fatedate@gmail.com',
            'fatedate',
            'fateee',
            'cohaehhh',
            'manual',
            2,
            '7'
        );


        `);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

(async () => {
    try {
        // Insert testcases into database
        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
        await insertProject();
        await insertUnivercity();
        await insertUsers();
        await insertProjectUser();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
