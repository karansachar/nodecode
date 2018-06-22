var express = require('express');
var app = module.exports = express();
var sql = require('mysql');
var ejs = require('ejs');
var http = require('http');
var url = require('url');
var routes = require('routes');
var moment = require('moment');
var dateTime = require('node.date-time');
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var flash_ = require('express-flash');
var flash_ = require('express-flash');
var expressValidator = require("express-validator");

global.__root   = __dirname + '/'; 
var sess;
var app = module.exports = express();
app.use(flash());
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ cookie:{ maxAge: 3600000 },secret: 'woot',rolling: true,resave: false,saveUninitialized: false}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));
app.use(expressValidator());

var loginpage = require('./modules/login.js');
var api = require('./api/login.js');
var adminuser = require('./modules/admin/users.js');
var adminplan = require('./modules/admin/plans.js');
var profile = require('./modules/profile.js');
var register = require('./modules/register.js');

var gymOwner = require('./modules/gymOwner/register.js');
var gymOwnerPlan = require('./modules/gymOwner/plans.js');

app.get('/', loginpage.list);
app.get('/logout', loginpage.logout);
app.post('/myaccount', loginpage.myaccount);
app.get('/account', loginpage.account);
app.get('/profile', profile.edit);
app.get('/cpass', profile.cpass);
app.post('/checkUser', register.checkUser);
app.post('/checkPhone', register.checkPhone);
app.post('/checkemail', register.checkemail);
app.post('/forgotPass', profile.forgotPass);
app.get('/forgot', profile.forgot);
app.post('/update', profile.update);
app.get('/signup', register.signup);
app.post('/register', register.register);
app.post('/passwordReset', register.passwordReset);

//SUPERADMIN FUNCTIONS
app.get('/gymOwner', adminuser.gymOwner);
app.post('/updateGym', adminuser.updateGym);
app.get('/edit/:userId', adminuser.userid);
app.get('/delete/:userId', adminuser.delete);
app.get('/vplans', adminplan.get);
app.get('/cplans', adminplan.create);
app.post('/plan/create', adminplan.createplan);
app.get('/vplans/edit/:planId', adminplan.editPlan);
app.post('/vplans/edit', adminplan.update);

//GYMOWNER FUNCTIONS
app.get('/rProfile', gymOwner.create);
app.post('/create/register', gymOwner.register);
app.get('/allusers', gymOwner.allusers);
app.post('/user/checkUser', gymOwner.checkUser);
app.post('/user/checkPhone', gymOwner.checkPhone);
app.post('/user/checkemail', gymOwner.checkemail);
app.get('/viewplans', gymOwnerPlan.get);
app.get('/addtocart/:pid', gymOwnerPlan.cart);
app.post('/checkout/', gymOwnerPlan.checkout);
app.get('/about/', gymOwnerPlan.aboutView);
app.post('/about/', gymOwnerPlan.aboutCreate);

//API Users FUNCTIONS
app.post('/api/login', api.login);
app.get('/api/logout', api.logout);
app.get('/api/myaccount', api.myaccount);



app.get('/nopermission', function(req, res){
	res.send('You have not access to Use this Page');
});
if(!module.parent){
	app.listen(8000, "0.0.0.0", function() {
		console.log("Listening on Port 8000");
	});
}