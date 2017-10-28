var express = require('express');
var router = express.Router();
var productsModule = require('../modules/products');
var cartFilesModule = require('../modules/cartFiles');
var userModule = require('../modules/usersFiles')

/* GET localhost:3000/login/ page
 ('/' in the get method refere to the second slash after the app.use('/login',login)) */
router.get('/', function (req, res, next) {
  var categories = productsModule.fetchAllCategories();
  var products = productsModule.fetchAllproducts();
  res.render('main', { categories: categories, products: products });
});


router.get('/:mainCategory/:subCategory', function (req, res, next) {
  var products = productsModule.fetchSubCategoryProducts(req.params.mainCategory, req.params.subCategory);
  var categories = productsModule.fetchAllCategories();
  var collapse = req.params.mainCategory;
  res.render('main', { categories: categories, products: products, collapse: collapse });
});

router.get('/:mainCategory/:subCategory/:id', function (req, res, next) {
  var product = productsModule.fetchProductById(req.params.mainCategory,
    req.params.subCategory,
    req.params.id);
  var categories = productsModule.fetchAllCategories();
  res.render('singleProduct', { categories: categories, product: product });
});


router.get('/cart', function (req, res, next) {
  var cookie = req.session.id;
  cartFilesModule.fetchCartItems(cookie, function (cartItems) {
    var categories = productsModule.fetchAllCategories();
    res.render('cart', { categories: categories, cartItems: cartItems, cookie: cookie });
  });
});



router.get('/addProductToCart', function (req, res, next) {
  var cookie = req.session.id;
  var path = req.query.path;
  var data = path.split('/');
  var product = productsModule.fetchProductById(data[0], data[1], data[2]);
  cartFilesModule.updateFile(cookie, product);
});

router.get('/newVisitor', function (req, res, next) {
  var cookieId = req.session.id;
  cartFilesModule.loadFile(cookieId);

});

router.get('/updateExistingCart', function (req, res, next) {
  var updateParams = req.query.cartContent;
  if (updateParams !== undefined) {
    var items = [];
    for (var i = 0; i < updateParams.length; i++) {
      var item = productsModule.fetchProductById(updateParams[i]['category'],
        updateParams[i]['subcategory'],
        updateParams[i]['id']);
      item['quantity'] = updateParams[i]['quantity'];
      items.push(item);
    }
    cartFilesModule.updateExistingCart(req.query.cartId, items);
  } else {
    cartFilesModule.createFile(req.query.cartId);
  }
});




router.post('/login', function (req, res, next) {
  userModule.validationLoginData(req.body.email, req.body.password, function (userName) {
    if (userName !== undefined) {
      req.session.isLogged = true;
      console.log(req.session);
      res.send(userName);
    }
  });


});


router.post('/registerNewUser', function (req, res, next) {
  req.body.cart = req.session.id;
  userModule.addNewUser(req.body, function (message) {
    res.send(message);
  });
})

module.exports = router;
