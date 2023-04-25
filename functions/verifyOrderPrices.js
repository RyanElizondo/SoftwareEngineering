const { openMongoConnection } = require('./mongoNETLIFY');  //mongoCRUD.js

exports.handler = async (event, context) => { //handler function
    openMongoConnection();

    let status = 200;
    let bodyMessage;

    switch(event.httpMethod){
        case 'GET':{ //get Item Prices
            const itemPriceArray = JSON.parse(event.body);
            const itemPrices = await getItemPrices(itemPriceArray);
            bodyMessage = itemPrices;
            break;
            }
        case 'OPTIONS':{
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.BASE_URL}`,
                    'Access-Control-Allow-Methods': 'GET, PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400' // 24 hours
                },
                body: ''
            }
        }

    }
}

