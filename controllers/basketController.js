const { Basket, User } = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const checkRoleMiddleware = require("../middleware/checkOrderDetailsMiddleware");

const getUserByJwt = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({ where: { email: decoded.email } });
  return user;
};

class basketController {
  async getBaskets(req, res) {
    const user = await getUserByJwt(req);
    const baskets = await Basket.findAll({ where: { userId: user.id } });
    return res.json({ baskets });
  }
  async getAllBaskets(req, res) {
    let baskets = await Basket.findAll();
    return res.json(baskets);
  }
  async sendBasket(req, res, next) {
    const order = req.body.order;
    const address = req.body.address;
    const sum = req.body.sum;
    if (!order || !address || !sum) {
      return next(ApiError.badRequest("Ошибка запроса отправки корзины!"));
    }
    if (!order.length) {
      return next(ApiError.badRequest("Корзина пуста!"));
    }
    const orderCorrect = checkRoleMiddleware(req.body);
    if (orderCorrect === "ok!") {
      const user = await getUserByJwt(req);
      const currentBasket = await Basket.findAll({
        where: { userId: user.id, status: "current" },
      });
      const updateBaskets = await Basket.update(
        { status: "ordered", data: JSON.stringify(order), address, sum },
        {
          where: { id: currentBasket[0].id },
        }
      );
      const basket = Basket.create({ userId: user.id, status: "current" });
      return res.json({ message: "Заказ принят!" });
    } else {
      return next(ApiError.badRequest(orderCorrect));
    }
  }
  async changeBasketStatus(req, res, next) {
    const id = +req.body.id;
    const newStatus = req.body.status
    if (!id || !newStatus ) {
      return next(ApiError.badRequest("Идентификатор заказа или новый статус не корректны!"));
    }
    const currentBasket = await Basket.findOne({
      where: { id },
    });
    if(!currentBasket){
      return next(ApiError.badRequest("Данного заказа не существует!"));
    }
    const basket = await Basket.update(
       { status: newStatus},
       {
         where: { id },
      }
    );
    return res.json({message:`Статус заказа ${id} изменен на ${newStatus}`, basket:currentBasket});
  }
  async deleteBasket() {}
}

module.exports = new basketController();
