var testservice = require('../services/test-service');
var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = {

    list: function (req, res, callback) {
        var viewModel = {
            banggias: []
        };
        // 
        return Models.banggia.find(function (err, doc) {
            viewModel.banggias = doc;
            console.log(doc);
            res.render('test/list', { viewModel, layout: 'testlayout.handlebars' });
        });


    },
    detail: function (req, res, callback) {
        var _id = req.params.id;
        if (ObjectId.isValid(_id)) {

            return Models.banggia.findById(_id, function (err, doc) {
                if (err) { throw err; }
                else {
                    console.log(doc);
                    res.render('test/details', { doc, layout: 'testlayout.handlebars' });
                }
            });

        } else {
            return callback('Invalid Obj');
        }

    },
    createtest: function (req, res, callback) {
        testservice.insertitem(req.body);
        console.log(req.body);
        console.log('create success!');
        res.redirect('/test');
    },
    get_edit: function (req, res, callback) {
        var _id = req.params.id;
        if (ObjectId.isValid(_id)) {

            Models.banggia.findById(_id, function (err, doc) {
                if (err) { throw err; }
                else {
                    console.log(doc);
                    res.render('test/edit', { doc, layout: 'testlayout.handlebars' });
                }
            });

        } else {
            return callback('Invalid Obj');
        }
    },
    update_post: function (req, res, callback) {
        var _id = req.params.id;
        if (ObjectId.isValid(_id)) {

            Models.banggia.findById(_id, function (err, doc) {
                if (err) { throw err; }
                else {
                    //console.log(result);
                    doc.motacackhoangiakhac = req.body.motacackhoangiakhac;
                    doc.gianuoc = req.body.gianuoc;
                    doc.giadien = req.body.giadien;
                    doc.giaphong = req.body.giaphong;
                    doc.save();
                    console.log(doc);
                    //res.render('test/edit', { doc, layout: 'testlayout.handlebars' });
                    res.redirect('/test/' + _id);
                }
            });


        } else {
            return callback('Invalid Obj');
        }
    }
    ,
    index: function (req, res, callback) {
        res.render('test/index', { layout: 'testlayout.handlebars' });
    },

    insert_data_demo: function (req, res, callback) {
        var item = new Models.User(
            {
                name: 'Nguyễn Thanh An',
                username: 'NguyenQuocNinh',
                email: 'ninhnguyenquoc@gmail.com',
                password: '012345678910',
                address: 'So 1 Vo Van Ngan, Thu Duc, HCM City',
                phone: '01657768971',
                gender: true,
                birthday: Date.now(),
                image: 'imageprofile.png',
                id_facebook: '01234567890123456789',
                create_date: Date.now(),
                status: true,
                role: 'landlord'
            }

            
        );
        item.save(function (err, result) {
            if (err) { throw err }
            else
                console.log('Save success!');
            res.send('Save success!');
            callback();
        })
    }
};