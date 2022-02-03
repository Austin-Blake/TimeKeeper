const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

const port = 5000;

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//register & login
app.use("/auth", require("./routes/jwtAuth"))

//Create User
app.post("/users", async(req, res) => {
    try {
        const user = req.body;

        let values = [], keys = [];
        
        //extract columns and values from payload
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
        res.json({ status: 500, message: err.message, request: req });
        console.log(err.message);
    }
});

//Get all Users
app.get("/users", async(req, res) => {
    try {
        const user = req.body;
        const allUsers = await pool.query(
            `SELECT * FROM sys_user`
        );
        res.json({ status: 200, message: `All Users Retrieved`, records: allUsers.rows });
        console.log("All Users Retrieved");
        
    } catch (err) {
        res.json({ status: 500, message: err.message, request: req });
        console.log(err.message);
    }
});

//Get User
app.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const allUsers = await pool.query(
            `SELECT * FROM sys_user WHERE sys_id = $1`, [id]
        );
        res.json({status: 200, message: "Users retrieved", records: allUsers.rows[0]});
        
    } catch (err) {
        res.json({ status: 500, message: err.message, request: req });
        console.log(err.message);
    }
});

//Update User
app.put("/users/:id", async(req, res) => {
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
        res.json({ status: 200, message: `Update successful for ID: ${id}`, record: allUsers.rows });
            console.log(`Update successful for ID: ${id}`);
        
    } catch (err) {
        res.json({ status: 500, message: err.message, request: req });
        console.log(err.message);
    }
});

//Delete User
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query(`DELETE FROM sys_user WHERE sys_id = $1 RETURNING *`, [id]);
        res.json({ status: 200, message:`User with ID: ${id} was Deleted! `, record: deleteUser.rows });
    } catch (err) {
        res.json({ status: 500, message: err.message, request: req });
        console.log(err.message);
    }
});



app.listen(port, () => {
        console.log("Server running on port: " + port);
});
