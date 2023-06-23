const {Basket} = require('../models/models')

class basketController{
    async getBasket(){

    }
    async getAllBaskets(req, res){
        let baskets = await Basket.findAll();
        return res.json(baskets);
    }
    async sendBasket(){

    }
    async changeBasketStatus(){

    }
    async deleteBasket(){

    }
}

module.exports = new basketController()