module.exports = function (orderObject){
    let orderCorrect = 'ok!'
    if('order' in orderObject && 'address' in orderObject){
        orderObject.order.map((item) => {
            if (!item.hasOwnProperty('id') || !item.hasOwnProperty('name') || !item.hasOwnProperty('brand') || !item.hasOwnProperty('sizes')){
                orderCorrect = 'Отсутсвуют необходимые данные в заказе'
            }  
        })
        let result = orderObject.order.reduce(function (acc, obj) { return acc + +obj.price; }, 0);
        if(result!== +orderObject.sum){
            orderCorrect = 'Сумма недействительна!'
        }
    }
    else if(!orderObject.hasOwnProperty('order')){
        orderCorrect = "Отсутсвует заказ!";
    } else if(!orderObject.hasOwnProperty('address')){
        orderCorrect = "Отсутсвует адрес";
    }
    else if(!orderObject.hasOwnProperty('sum')){
        orderCorrect = "Отсутсвует сумма";
    }
    
    return orderCorrect
}