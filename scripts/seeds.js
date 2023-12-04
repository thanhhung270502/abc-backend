const pool = require('../src/config/db');

const insertProject = async () => {
    try {
        await pool.query(`

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity, uni_id) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2020',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2020',
            'Dĩ An, Bình Dương',
            789,  
            '2020-06-15',
            '2020-08-17',
            25,
            1
            );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity, uni_id) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2021',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2021',
            'Dĩ An, Bình Dương',
            789,  
            '2021-06-15',
            '2021-08-17',
            25,
            1
            );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity, uni_id) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2022',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2022',
            'Dĩ An, Bình Dương',
            789,  
            '2022-06-15',
            '2022-08-17',
            25,
            1
            );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity, uni_id) VALUES (    
            'Mùa hè xanh Chúng Ta Cùng Tiến 2023',
            'Mùa hè xanh Chúng Ta Cùng Tiến 2023',
            'Dĩ An, Bình Dương',
            789,  
            '2023-06-15',
            '2023-08-17',
            25,
            1
            );
        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity, uni_id) VALUES (    
            'Hội thảo Bảo vệ Môi trường Mùa hè xanh',
            'Hội thảo thường niên về bảo vệ môi trường và sử dụng bền vững tại vùng Đông Nam Á.',
            'Công viên Cây xanh, Thành phố X',
            789,  
            '2023-06-15',
            '2023-06-17',
            25,
            1
            );

        INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity, uni_id) VALUES (
            'Khám phá Thiên nhiên trong Mùa hè xanh',
            'Chuyến thám hiểm thiên nhiên tại khu vực dã ngoại.',
            'Khu rừng quốc gia ABC, Thành phố Y',
            456,
            '2023-07-10',
            '2023-07-15',
            150,
            1
            );
            
            
            INSERT INTO project (name, description, location, user_id, start_date, end_date, quantity, uni_id) VALUES (
            'Khám phá Thiên nhiên trong Mùa hè xanh',
            'Chuyến thám hiểm thiên nhiên tại khu vực dã ngoại.',
            'Khu rừng quốc gia ABC, Thành phố Y',
            456,
            '2023-07-10',
            '2023-07-15',
            150,
            1
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
            'Trường Đại học Bách Khoa - ĐHQG TP.HCM'
        );


        INSERT INTO university (name) VALUES (    
            'Trường Đại học Khoa học Tự nhiên - ĐHQG TPHCM'
        );


        INSERT INTO university (name) VALUES (    
            'Trường Đại học Khoa học xã hội và Nhân văn - ĐHQG TP.HCM'
        );

        INSERT INTO university (name) VALUES (    
            'Trường Đại học Khoa học xã hội và Nhân văn - ĐHQG TP.HCM'
        );

        INSERT INTO university (name) VALUES (    
            'Học viện Công nghệ Bưu chính Viễn thông – Cơ sở TP.HCM'
        );


        INSERT INTO university (name) VALUES (    
            'Trường Đại học Công nghiệp TP.HCM'
        );

        INSERT INTO university (name) VALUES (    
            'Trường Đại học Ngoại thương – Cơ sở phía Nam'
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

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'qwe@gmail.com',
            '123',
            'ahaha',
            'tatat',
            0,
            '1'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'nonono@gmail.com',
            'yesyesyes',
            'yesorno',
            'nooooo',
            0,
            '2'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'tuilaai@gmail.com',
            'ailatui',
            'latuiai',
            'latuilatui',
            0,
            '3'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'tuilauser@gmail.com',
            'userlatui',
            'username',
            'avatarcuauser',
            0,
            '4'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'ohnouser@gmail.com',
            'khongco',
            'vodanh',
            'noanh',
            0,
            '5'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'no6@gmail.com',
            'weas',
            'kakakaka',
            'meme',
            0,
            '6'
        );


        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'tutituitui@gmail.com',
            'iiiiiaaaa',
            'addmin',
            'earth',
            0,
            '7'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'leeeee@gmail.com',
            'eeeel',
            'leeminho',
            'lominhe',
            1,
            '1'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'leadiii@gmail.com',
            'eeeehh',
            'leader',
            'avatarleader',
            1,
            '2'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'tuitretrau@gmail.com',
            'tuicontre',
            'tuimuonchill',
            'avatarlagi',
            1,
            '3'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'bobietbay123@gmail.com',
            'boanco',
            'bayaby',
            'conbo',
            1,
            '4'
        );


        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'tuilaso6@gmail.com',
            'tuigonham',
            'tentuila5',
            'tuikoco',
            1,
            '5'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'sixsix@gmail.com',
            'xisxis',
            'sixxxx',
            'sisisisi',
            1,
            '6'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'ahoiahoi@gmail.com',
            'heheheaa',
            'heyaaa',
            'nananono',
            1,
            '7'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'aaa@gmail.com',
            'aaa',
            'aaa',
            'aaa',
            2,
            '1'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'student@gmail.com',
            'abcxyz',
            'imstudent',
            'heishe',
            2,
            '2'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'believeme@gmail.com',
            'tuikotin',
            'tintui',
            'tuilaavatar',
            2,
            '3'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'tuilasinhvien@gmail.com',
            'sinhvien',
            'sinhvien',
            'anhsinhvien',
            2,
            '4'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'sinhviengmail@gmail.com',
            'ggmali',
            'ggeznoob',
            'anhsinhvien',
            2,
            '5'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'toolate@gmail.com',
            'lateee',
            'imlate',
            'rolee',
            2,
            '6'
        );

        INSERT INTO users (email, password, name, avatar, role, uni_id) VALUES (    
            'fatedate@gmail.com',
            'fatedate',
            'fateee',
            'cohaehhh',
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
