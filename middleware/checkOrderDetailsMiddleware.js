const ApiError = require("../error/ApiError");

module.exports = function(orderObject, next){
    if('order' in orderObject && 'address' in orderObject){

    }
    else if(!'order' in orderObject){
        return next(ApiError.badRequest("Отсутсвует заказ!"));
    } else if(!'address' in orderObject){
        return next(ApiError.badRequest("Отсутсвует адрес"));
    }

}