const router = require("express").Router();
const pool = require('../db');
const bcrypt = require("bcrypt");
const jwtGenerator = require('../utils/jwtGenerator.js');
const validation = require('../middleware/validateUserCred');
const authorization = require('../middleware/authorization');

//register
router.post('/register', validation, async (req, res) => {
    try {
        const userId = req.body.user_id;
        const password = req.body.password;
        let user = await pool.query(`SELECT * FROM sys_user WHERE user_id = $1`, [userId]);

        if (user.rows.length > 0) {
            return res.status(403).json("User already Exists!");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPass = await bcrypt.hash(password, salt);

        user = req.body;
        user.password = bcryptPass;
        user.name = user.first_name + " " + user.last_name;
        user.created_by = user.user_id;

        //Create User
        let values = [], keys = [];
        
        //extract columns and values from payload
        console.log(user)
        for (const [key, value] of Object.entries(user)) {
            keys.push(key);
            values.push(value);
        }
        //Set param values based on how many keys;
        let params = '';
        for (let i = 1; i < keys.length + 1; i++) {
            i == keys.length ? params += '$' + i : params += '$' + i + ',';
        }
        
        const newUser = await pool.query(
            `INSERT INTO sys_user (${keys.join()}) VALUES(${params}) RETURNING *`, values
        );
        user =newUser.rows[0]
        const token = jwtGenerator(user.user_id);
        const userObj = {
            sys_id: user.sys_id,
            user_id: user.user_id,
            token: token
        };

        res.status(200).json({ status: 200, message: `Created New User`, sys_user: userObj });
        console.log(`Created New User Successful`)
     
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, message: "ERROR", request: req });
    }
});

//Login Route
router.post('/login', validation, async (req, res) => {
    try {
        const userId = req.body.user_id;
        const password = req.body.password;

        const user = await pool.query(`SELECT * FROM sys_user WHERE user_id = $1`, [userId]);

        //check if user exists
        if (user.rows.length == 0) {
            return res.status(401).json('User name and password don\'t match!');
        }
        //check password
        const validatePass = await bcrypt.compare(password, user.rows[0].password);
        if (!validatePass) {
            return res.status(401).json('User name and password don\'t match!');
        }

        //if password is valid
        //send token
        const token = jwtGenerator(user.rows[0].user_id);
        const userObj = {
            sys_id: user.rows[0].sys_id,
            user_id: user.rows[0].user_id,
            token: token
        };

        res.status(200).json({ status: 200, message: `Access Allowed`, sys_user: userObj });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, message: "ERROR"});
    }
});

//Update User Data
router.put("/register/update-user/:id", async (req, res) => {
    console.log(req.params)
    try {
        const {id} = req.params;
        const user = req.body;
        
        let string ="";
        for (const [key, value] of Object.entries(user)) {
            let keyArr = Object.keys(user);
            user[keyArr[keyArr.length - 1]] == value ? string += `${key} = '${value}'` : string += `${key} = '${value}',`  
        }
        
        const allUsers = await pool.query(
            `UPDATE sys_user SET ${string} WHERE sys_id = $1 RETURNING *`,[id]
            );
        res.status(200).json({ status: 200, message: `Update successful for ID: ${id}`, record: allUsers.rows });
            console.log(`Update successful for ID: ${id}`);
        
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message, request: req });
        console.log(err.message);
    }
});

//verify Authentication Token
router.get('/is-verifed', authorization, async (req, res) => {
    try {
        res.status(200).json(true);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, message: "ERROR", request: req });
    }
});

module.exports = router;