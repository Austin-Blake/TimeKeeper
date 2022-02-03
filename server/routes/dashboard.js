const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
    try {
        //Get user information
        const user = await pool.query(`SELECT user_id FROM sys_user WHERE user_id = $1`, [req.user]);

        res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.json({ status: 500, message: "ERROR", request: req });
    }
})