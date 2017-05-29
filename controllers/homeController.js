var Models = require('../models');
var request = require('request');
var fs = require('fs');
module.exports = {
    testdata: function (req, res, next) {

        //request('http://localhost:51668/api/Products/getcity', function (err, response, body) {
            var data1 = fs.readFileSync("models/ward.json");
            var data = JSON.parse(data1);
            //console.log(data);
            //console.log(body);
            for (var i = 0; i < data.length; i++) {
                var item = new Models.Ward();
                item.id = data[i].id;
                item.name=data[i].name;
                item.rank = data[i].rank;
                item.id_district=data[i].id_district;
                item.save(function (err) {
                    if (err) throw err;
                });
                // console.log(data[i].maTP);
            }
            return res.json('Success!');
        






    },
    index:function(req, res){
        res.render('users/index', {layout:'userlayout.handlebars'});
          console.log('Home index create success!');
    },
}

