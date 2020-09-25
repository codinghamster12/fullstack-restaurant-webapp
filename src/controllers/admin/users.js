const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: `Admin already registered`,
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      role: 'admin',
      userName: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (data) {
        return res.status(201).json({
          message: `Admin added successfully`,
        });
      }
      if (error) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (!user) {
      return res.status(400).json({
        error: `Admin does not exist`,
      });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1hr",
          }
        );

        const { _id, firstName, lastName, email, role, fullName } = user;

        res.cookie("token", token, { expiresIn: "1h" });
        return res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          error: "Invalid credentials",
        });
      }
    } else {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully..",
  });
};
