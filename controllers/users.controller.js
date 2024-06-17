const { createUser } = require("../queries/users.queries");
const path = require("path");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/assets/img'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()} - ${file.originalname}`);
        },
    })
})

exports.signupForm = (req, res, next) => {
    res.render('users/user-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}

exports.signup = async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const user = await createUser(body);
        res.redirect('/');
    } catch (e) {
        res.render("users/user-form", { errors: [e.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user })
    }
}

exports.uploadImage = [
    upload.single("avatar"),
    async (req, res, next) => {
        try {
            const user = req.user;
            user.avatar = `/assets/img/${req.file.filename}`;
            await user.save();
            res.redirect("/");
        } catch (e) {
            next(e);
        }
    }]