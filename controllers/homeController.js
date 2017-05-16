var Models = require('../models');
var request = require('request');
var fs = require('fs');
module.exports = {
    testdata: function (req, res, next) {

        // request('http://localhost:51668/api/Products/getcity', function (err, response, body) {
        //     //var data1 = fs.readFileSync("models/data.json");
        //     var data = JSON.parse(body);
        //     //console.log(data);
        //     //console.log(body);
        //     for (var i = 0; i < data.length; i++) {
        //         var item = new Models.Area();
        //         item.id_province = data[i].maTP;
        //         item.province = data[i].tinhThanhPho;
        //         item.id_dictrict = data[i].maQH;
        //         item.dictrict = data[i].quanHuyen;
        //         item.id_ward = data[i].maPX;
        //         item.ward = data[i].phuongXa;
        //         item.rank = data[i].cap;
        //         item.save(function (err) {
        //             if (err) throw err;
        //         });
        //         // console.log(data[i].maTP);
        //     }
        // });




        Models.Area.find({ province: 'Thành phố Hồ Chí Minh' }, function (err, doc) {
            if (err) throw err;
           var results=[];
           doc.forEach(function(item){
               results.push(
                   {
                       id_ward: item.id_ward,
                       ward: item.ward,
                       dictrict: item.dictrict,
                       rank : item.rank,
                       province: item.province,
                       id_province: item.id_province
                   }
               )
           })

            //var value = parseFloat("554,21".replace(',', '.'));
           // console.log(value);
            return res.status(200).json(results);
        })
        res.status(404);

    },
    index:function(req, res){
        res.render('users/index', {layout:'userlayout.handlebars'});
          console.log('Home index create success!');
    },
}

