const { Strategy } = require('passport-local');
const { app } = require('../app');
const passeport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { findUserPerEmail, findUserPerId } = require("../queries/users.queries");

passeport.serializeUser((user, done) => {
    done(null, user._id);
})

passeport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserPerId(id);
        done(null, user)
    } catch (error) {
        done(e);
    }
})

app.use(passeport.initialize());
app.use(passeport.session());

passeport.use("local", new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        const user = await findUserPerEmail(email);
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                done(null, user);
            } else {
                done(null, false, { message: "Wrong password" });
            }
        } else {
            done(null, false, { message: "User not found" });
        }
    } catch (e) {
        done(e);
    }
}))
