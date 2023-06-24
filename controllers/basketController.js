const { Basket, User } = require("../models/models");
const jwt = require("jsonwebtoken");

const getUserByJwt = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({ where: { email: decoded.email } });
  return user
}

class basketController {
  async getBasket(req, res) {
    const user = await getUserByJwt(req)
    const basket = await Basket.findAll({ where: { userId: user.id } })
    return res.json({ basket });
  }
  async getAllBaskets(req, res) {
    let baskets = await Basket.findAll();
    return res.json(baskets);
  }
  async sendBasket(req, res) {
    const user = await getUserByJwt(req)
    const basket = Basket.create({ userId: user.id });
    return res.json({basket})
  }
  async changeBasketStatus() {}
  async deleteBasket() {}
}

module.exports = new basketController();
