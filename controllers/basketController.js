const { Basket, User } = require("../models/models");
const jwt = require("jsonwebtoken");

class basketController {
  async getBasket(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { email: decoded.email } });
    const basket = await Basket.findOne({ where: { userId: user.id } })
    return res.json({ message: "ALL is GOOD!", basket });
  }
  async getAllBaskets(req, res) {
    let baskets = await Basket.findAll();
    return res.json(baskets);
  }
  async sendBasket() {}
  async changeBasketStatus() {}
  async deleteBasket() {}
}

module.exports = new basketController();
