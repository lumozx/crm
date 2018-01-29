//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
Mock.mock('/api/login', (req, res) => {
	let message = JSON.parse(req.body);
	let username = message.username;
	let password = message.password;
	if(username=='admin'&&password=="admin")
	{
		return {
        	'token': 'asdasfghh'
    	}
	}
});
Mock.mock('/api/token', (req, res) => {
	let message = JSON.parse(req.body);
	let token = message.token;
	if(token=='asdasfghh')
	{
		return {
        	'message':true
    	}
	}else{
		return {
        	'message':false
    	}
	}
})
Mock.mock('/api/s_goods', (req, res) => {
	var arr = Mock.mock({
  		'list|15-30': [{
            'id|+1' : 1,//自增
            'date' : '@DATETIME("yyyy-MM-dd")',
            'name':'@TITLE(1)',
            'address':'@TITLE(1)',
            'num|+1' : 1,//自增
        }]
	})
	return{
		table:	arr
	}
})
Mock.mock('/api/repassword', (req, res) => {
	let message = JSON.parse(req.body);
	let token = message.token;
	let pass1 = message.pass1;
	if(token=='asdasfghh'&&pass1=='admin')
	{
		return {
        	'message':true
    	}
	}else{
		return {
        	'message':false
    	}
	}
})
Mock.mock('/api/stock', (req, res) => {
	let message = JSON.parse(req.body);
	let token = message.token;
	var messages = Mock.mock({
  		'message|8-10': [{
  			'id|+1' : 1,//自增
            'name':'@TITLE(1)',
            'num|+1' : 1,//自增
        }]
	})
	if(token=='asdasfghh')
	{
		return {
        	'message':messages
    	}
	}
})
Mock.mock('/api/bei', (req, res) => {
	let message = JSON.parse(req.body);
	let token = message.token;
	var messages = Mock.mock({
  		'message|8-10': [{
  			'id|+1' : 1,//自增
            'name':'@TITLE(1)',
            'date' : '@DATETIME("yyyy-MM-dd")',
        }]
	})
	if(token=='asdasfghh')
	{
		return {
        	'message':messages
    	}
	}
})
Mock.mock('/api/go', (req, res) => {
	let message = JSON.parse(req.body);
	let token = message.token;
	if(token=='asdasfghh'){
		return {
        	'message':true
    	}
	}else{
		return {
        	'message':false
    	}
	}
})
Mock.mock('/api/back', (req, res) => {
	let message = JSON.parse(req.body);
	let token = message.token;
	if(token=='asdasfghh'){
		return {
        	'message':true
    	}
	}else{
		return {
        	'message':false
    	}
	}
})
Mock.mock('/api/delete', (req, res) => {
	let message = JSON.parse(req.body);
	let token = message.token;
	if(token=='asdasfghh'){
		return {
        	'message':true
    	}
	}else{
		return {
        	'message':false
    	}
	}
})