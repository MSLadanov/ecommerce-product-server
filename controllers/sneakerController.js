const uuid = require("uuid");
const path = require("path");
const { Sneakers } = require("../models/models");
const ApiError = require("../error/ApiError");

class SneakerController {
  async createSneaker(req, res, next) {
    try {
      const { name, brand, sex, description, price, discount, sizes } =
        req.body;
      const sneaker = {
        name,
        brand,
        sex,
        description,
        price,
        discount,
        sizes
      };
      const { img1, img2, img3, img4 } = req.files;
      const imageArray = [img1, img2, img3, img4];
      imageArray.forEach((image, index) => {
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName));
        sneaker[`img${index + 1}`] = fileName;
      });
      const sneakers = await Sneakers.create({ ...sneaker });
      return res.json(sneakers);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAllSneakers(req, res) {
    let sneakers = await Sneakers.findAll();
    return res.json(sneakers);
  }
  async getSneakerById(req, res) {
    const { id } = req.params;
    const sneaker = await Sneakers.findOne({
      where: { id },
    });
    return res.json(sneaker);
  }

  async changeSneaker (req, res, next){
    const {id, data} = req.body;
    const newData = data;
    if(Object.keys(newData).length > 1){
      return next(ApiError.badRequest("Невозможно изменить более одного параметра!"));
    }
    if (!id || !data || isNaN(+id)) {
      return next(
        ApiError.badRequest(
          "Идентификатор товара или новые данные не корректны!"
        )
      );
    }
    const editingSneaker= await Sneakers.findOne({
      where: { id },
    });
    if (!editingSneaker) {
      return next(ApiError.badRequest("Данного товара не существует!"));
    }
    const sneaker = await Sneakers.update(
      { ...newData },
      {
        where: { id },
      }
    );
    if(!sneaker[0]){
      return next(ApiError.badRequest("Название параметра не корректно!"));
    }
    return res.json({ message: 'Данные успешно обновлены!'});
  }

  async deleteSneaker(req, res, next) {
    const { id } = req.params;
    if (!id || isNaN(+id)) {
      return next(ApiError.badRequest("Ошибка запроса!"));
    }
    const removingSneaker = await Sneakers.findOne({
      where: { id },
    });
    if (!removingSneaker) {
      return next(ApiError.badRequest("Идентификатор товара не корректен!"));
    }
    const baskets = await Sneakers.destroy({
      where: { id },
    });
    return res.json({ message: `Товар ${id} удален!` });
  }
}

module.exports = new SneakerController();
