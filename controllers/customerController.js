module.exports={
    index: function(req, res){
        res.render('landlords/index', {layout:'landlordlayout.handlebars'});
          console.log('Admin Index create success!');
    },
};