const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = schema({
    username: { type: String, required: [true, "Username required"], unique: true },
    local: {
        email: { type: String, required: [true, "Email required"], unique: true },
        password: { type: String, required: [true, "Password required"] }
    },
    avatar: {
        type: String, default: "assets/img/homme.jpg"
    }
})

// Méthode directement sur le modèle
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 12);
}

// Méthode directement sur les instances du modèle
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.local.password)
}

const User = mongoose.model("user", userSchema);

module.exports = User;