exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.authenticated);
        next();
    } else {
        res.redirect("/auth/signin/form");
    }
}