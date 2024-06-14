const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = schema({
    username: { type: String, required: [true, "Username required"] },
    local: {
        email: { type: String, required: [true, "Email required"] },
        password: { type: String, required: [true, "Password required"] }
    }
})

// Méthode directement sur le modèle
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 12);
}

// Méthode directement sur les instances du modèle
userSchema.methods.comparePassword = function (password) {
    console.log(this.local.password);
    return bcrypt.compare(password, this.local.password)
}

const User = mongoose.model("user", userSchema);

module.exports = User;