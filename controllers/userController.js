const { User, Basket } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async register(req, res, next) {
    const { name, surname, email, password, role } = req.body;
    const { img } = req.files;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль!"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует!")
      );
    }
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      name,
      surname,
      email,
      role,
      password: hashPassword,
      img: fileName,
    });
    const basket = Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if(!user){
        return next(ApiError.internal('Пользователь не найден!'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword){
        return next(ApiError.internal('Указан неверный пароль!'))
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    res.json(id);
  }
}

module.exports = new UserController();
