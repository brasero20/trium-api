const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const cors = require("cors");
const config = require( 'config'); 
const backLoginLink = process?.env?.backLoginLink ||  config.get('backLoginLink');


try{
	const app = express();
	const server = require('http').createServer(app);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cors());

	app.post('/useForHandle',async(req,res)=>{
		const reqData = {
			method: 'get',
			url: `${process?.env?.backLoginLink}`,
			// headers: {}, 
			data: {
				...req.body,
			}
		  };
		const response = await axios(reqData);
		res.send(response.data)
	});

	app.post('/verify',async(req,res)=>{
		const reqData = {
			method: 'post',
			url: `${backLoginLink}triumphLog`,
			// headers: {}, 
			data: {
				...req.body,
			}
		  };
		const response = await axios(reqData);
		res.send(response.data)
	});

	server.listen(process.env.PORT || 4000, () => {
		console.log("Sever is listening on port 4000")
	});
}catch(error){
	console.log(error,'errorrr')
}
