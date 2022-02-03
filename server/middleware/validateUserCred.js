module.exports = (req, res, next) => {
    const email = req.body.email;
    const userId = req.body.user_id;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;


    function validateEmail(email) {
        const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        return regex.test(email);
    }

    if (req.path === "/register") {
        //check for empty values
        if (![email, userId, firstName, lastName].every(Boolean)) {
            return res.json({ status: 401, message: "All fields must be completed. No empty fields allowed." });
            //validate email format
        } else if (!validateEmail(email)) {
            return res.json({ status: 401, message: "Invalid Email" });
        }
    } else if (req.path === '/login') {
        //check for empty values
        if (![email, userId].every(Boolean)) {
            return res.json({ status: 401, message: "All fields must be completed. No empty fields allowed." });
            //validate email format
        } else if (!validateEmail(email)) {
            return res.json({ status: 401, message: "Invalid Email" });
        }
    }
    next();
}