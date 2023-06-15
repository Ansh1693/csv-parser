const User = require("../models/User");

exports.getUsers = async (req, res) => {
    const params = req.query;
    // console.log(params);
    const page = parseInt(params.page) || 1;
    try {
        const users = await User.find({}).skip((page - 1) * 10).limit(10);

        const totalUsers = await User.countDocuments({});

        res.json({ message: "success",count: totalUsers , users: users });
    } catch (err) {
        res.status(400).json({ message: "failure", error: err });
    }

}