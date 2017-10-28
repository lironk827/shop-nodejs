
module.exports = (function () {

    var fs = require('fs');
    var file;
    fs.readFile('./database/products.json', 'utf8', function (err, data) {
        file = JSON.parse(data);
    });


    function fetchAllproducts() {
        var data = [];
        for (var cat in file) {
            var mainCategory = file[cat];
            for (var subCategory in mainCategory) {
                for (var i = 0; i < mainCategory[subCategory].length; i++) {
                    data.push(mainCategory[subCategory][i]);
                }
            }
        }
        return data;
    }

    function fetchAllCategories() {
        var data = {};
        for (var cat in file) {
            var mainCategory = file[cat];
            var subCatData = [];
            for (var subCategory in mainCategory) {
                    subCatData.push(subCategory);  
            }
            data[cat] = subCatData;
        }
        return data;
    }

    function fetchSubCategoryProducts(mainCategory,subCategory) {
        var data = [];
        var products = file[mainCategory][subCategory];
        if (products){
            for (var i=0; i<products.length; i++){
                data.push(products[i]);
            }
        }
        return data;
    }

    function fetchProductById(mainCategory,subCategory,id) {
        var product = file[mainCategory][subCategory];
        if (product){
          for (var i=0; i<product.length; i++){
              if (product[i]['id'] === id) {
                  return product[i];
              }
          }
        }
        return new Error("NOT FOUND");
    }

    return {
        fetchAllproducts: fetchAllproducts,
        fetchAllCategories: fetchAllCategories,
        fetchSubCategoryProducts: fetchSubCategoryProducts,
        fetchProductById:fetchProductById,
    };

})();
