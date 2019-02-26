const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Order_Detail = require('../models/Order_Detail');
const Shipping = require('../models/Shipping');
const Person = require('../models/Person');

const stripe = require('stripe')("sk_test_jEhCrdJOmNYIuF4LDmq0v2ga");

const CartController = {};
/**
 * @api {get} / Permite obtener una ordem
 * @apiName getOrder
 * @apiGroup CartController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * @apiSuccess {orders} Devuelve una orden
 */
CartController.getOrder = (req, res) => {
    Order.findAll({
        include: [
            { model: Person }
        ]
    })
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}
/**
 * @api {get} / Permite obtener una ordem
 * @apiName getOrder
 * @apiGroup CartController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * @apiSuccess {orders} Devuelve una orden
 */

CartController.getCart = (req, res) => {
    res.status(200).json(req.session.cart);
}
/**
 * @api {post} / Permite agregar un item
 * @apiName addItem
 * @apiGroup CartController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * 
 */
CartController.addItem = (req, res) => {
    const ext = req.params.ext;
    Product.findOne({ where: { external_id: ext }, include: { model: Category } })
        .then(product => {
            var pos = verificar(req.session.cart, ext);
            if (pos == -1) {
                var data = { external: ext, name: product.name, category: product.Category.name, cant: 1, pu: product.price, pt: product.price, id: product.id_product };
                req.session.cart.push(data);
                console.log(req.session.cart);
            } else {
                var data = req.session.cart[pos];
                data.cant = data.cant + 1;
                data.pt = data.cant * data.pu;
                req.session.cart[pos] = data;
            }
            res.status(200).json(req.session.cart);
        }).catch((err) => {
            console.log(err)
            res.status(500).json();
        });
};
/**
 * @api {get} / Permite verificar un minusitem
 * @apiName minusItem
 * @apiGroup CartController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * @apiSuccess {minusItem} un minusItem
 */
CartController.minusItem = (req, res) => {
    const ext = req.params.ext;
    var pos = verificar(req.session.cart, ext);
    var data = req.session.cart[pos];
    if(data.cant > 1){
        data.cant = data.cant - 1;
        data.pt = data.cant * data.pu;
        req.session.cart[pos] = data;
    }else{
        req.session.cart.splice(pos, 1);
    }
    res.status(200).json(req.session.cart);
};
/**
 * @api {get} / Permite verfificar un plusitem
 * @apiName plusItem
 * @apiGroup CartController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * 
 */
CartController.plusItem = (req, res) =>{
    const ext = req.params.ext;
    var pos = verificar(req.session.cart, ext);
    var data = req.session.cart[pos];
    data.cant = data.cant + 1;
    data.pt = data.cant * data.pu;
    req.session.cart[pos] = data;
    res.status(200).json(req.session.cart);
};

CartController.processing = async (req, res) =>{
    console.log(req.body);  
    if(req.body.isCard){  
        stripe.charges.create({
                amount: 999,
                currency: 'usd',
                description: 'Pago de productos en QuokkaShop.com',
                source: req.body.token,
            }).then(result => {
                if(result.paid){
                    Order.create({
                        tax: req.body.tax,
                        total: req.body.total,
                        id_person: req.user.Person.id_person
                    }).then(order => {
                        var data = [];
                        req.session.cart.forEach(element => {
                            data.push({ id_order: order.id_order, quantity: element.cant, id_product: element.id });
                        });
                        Order_Detail.bulkCreate(data)
                            .then(() => {
                                if(!req.body.hasShip){
                                    req.session.cart = [];
                                    res.status(200).json({ res: result.paid });
                                }else{
                                    Shipping.create({
                                        id_order: order.id_order,
                                        address: req.body.ship.address,
                                        city: req.body.ship.city
                                    }).then(ship => {
                                        req.session.cart = [];
                                        res.status(200).json({ res: result.paid });
                                    }).catch(err => {
                                        console.log('ERR -> ', err);
                                        res.status(500).send();
                                    });
                                }                                
                            }).catch(err => {
                                console.log('ERR -> ', err);
                                res.status(500).send();
                            });
                    }).catch(err => {
                        console.log('ERR -> ', err);
                        res.status(500).send();
                    });
                }            
            }).catch(err => {
                console.log('ERR -> ', err);
                res.status(500).send();
            });
    }else{
        Order.create({
            tax: req.body.tax,
            total: req.body.total,
            id_person: req.user.Person.id_person
        }).then(order => {
            var data = [];
            req.session.cart.forEach(element => {
                data.push({ id_order: order.id_order, quantity: element.cant, id_product: element.id });
            });
            Order_Detail.bulkCreate(data)
                .then(() => {
                    if(!req.body.hasShip){
                        req.session.cart = [];
                        res.status(200).json({ res: true });
                    }else{
                        Shipping.create({
                            id_order: order.id_order,
                            address: req.body.ship.address,
                            city: req.body.ship.city
                        }).then(ship => {
                            req.session.cart = [];
                            res.status(200).json({ res: true });
                        }).catch(err => {
                            console.log('ERR -> ', err);
                            res.status(500).send();
                        });
                    }  
                }).catch(err => {
                    console.log('ERR -> ', err);
                    res.status(500).send();
                });
        }).catch(err => {
            console.log('ERR -> ', err);
            res.status(500).send();
        });
    }
}

function verificar(list, ext){
    var pos = -1;
    for (var i = 0; i < list.length; i++) {
        if (list[i].external == ext) {
            pos = i;
            break;
        }
    }
    return pos;
}

module.exports = CartController;