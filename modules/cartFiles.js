
module.exports = (function () {
    var fs = require('fs');
    var productsData = [];

    function loadFile(fileName) {
        fs.readFile('database/carts/' + fileName + '.json', function (err, data) {
            if (err) {
                createFile(fileName);
            }
        });
    }

    function createFile(fileName) {
        fs.writeFile('database/carts/' + fileName + '.json', '', function (err) {
            console.log(fileName + " :file created");
        });
    }

    function updateFile(fileName, product) {
        defaultOptions(product);
        productsData.length = 0;
        productsData.push(product);
        fs.readFile('database/carts/' + fileName + '.json', 'utf-8', function (err, data) {
            if (!err) {
                if (data.length === 0) {
                    fs.writeFile('database/carts/' + fileName + '.json', JSON.stringify(productsData), function (err) {
                    });
                } else {
                    var isExist = false;
                    productsData = (JSON.parse(data));
                    for (var i = 0; i < productsData.length; i++) {
                        var isExist = compareTwoProducts(productsData[i], product);
                        if (isExist) {
                            var qty = parseInt(productsData[i]['quantity']) + 1;
                            productsData[i]['quantity'] = qty.toString();
                            fs.writeFile('database/carts/' + fileName + '.json', JSON.stringify(productsData), function (err) {
                            });
                            break;
                        }
                    }
                    if (!isExist) {
                        productsData.push(product);
                        fs.writeFile('database/carts/' + fileName + '.json', JSON.stringify(productsData), function (err) {
                        });
                    }
                }
            }
        });
    }

    function defaultOptions(product) {
        var options = product['options'];
        for (var opt in options) {
            product['options'][opt] = options[opt][0];
        }
    }

    function updateExistingCart(fileName, newProducts) {
        fs.writeFile('database/carts/' + fileName + '.json', JSON.stringify(newProducts), function (err) {
        });
    }

    function fetchCartItems(fileName, callback) {
        fs.readFile('database/carts/' + fileName + '.json', function (err, data) {
            if (!err) {
                if (data.length !== 0) {
                    productsData = JSON.parse(data) || 0;
                } else {
                    productsData.length = 0;
                }
                callback(productsData);
            }
        });
    }

    function compareTwoProducts(existProduct, newProduct) {
        var isEqual = false;
        var existProductOptions = existProduct['options'];
        var newProductOptions = newProduct['options'];
        isEqual = (existProduct['id'] === newProduct['id']) &&
            (existProduct[JSON.stringify(existProductOptions)] === newProduct[JSON.stringify(newProductOptions)]);
        return isEqual;
    }




    return {
        createFile: createFile,
        loadFile: loadFile,
        updateFile: updateFile,
        fetchCartItems: fetchCartItems,
        updateExistingCart:updateExistingCart,
    };

})();