const router = require("express").Router();
const pool = require('../db');
const bcrypt = require('bcrypt');


//register
router.post('/register', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let user = await pool.query(`SELECT * FROM sys_user WHERE email = $1`, [email]);

        if (user.rows.length > 0) {
            return res.status(403).send("User already Exists!");
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
        for (let i = 1; i < keys.length+1; i++){
            i == keys.length ? params += '$' + i : params += '$' + i + ',';
            } 
        
        const newUser = await pool.query(
            `INSERT INTO sys_user (${keys.join()}) VALUES(${params}) RETURNING *`, values
        )
        res.json({status: 200, message: `Created New User`, record: newUser.rows});
        console.log(`Created New User Successful`)
     
    } catch (err) {
        console.log(err.message);
        res.json({ status: 500, message: "ERROR", request: req });
    }
})

module.exports = router;