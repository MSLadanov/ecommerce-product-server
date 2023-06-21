const uuid = require("uuid");
const path = require("path");
const { Sneakers } = require("../models/models");
const ApiError = require("../error/ApiError")

class SneakerController {
  async createSneaker(req, res, next) {
    try {
      const { name, brand, sex, description, price, discount, stock } =
        req.body;
      const sneaker = {
        name,
        brand,
        sex,
        description,
        price,
        discount,
        stock,
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
        next(ApiError.badRequest(error.message))
    }
  }
  async getAllSneakers() {}
  async getSneakerById() {}
  async deleteSneaker() {}
}

module.exports = new SneakerController();
