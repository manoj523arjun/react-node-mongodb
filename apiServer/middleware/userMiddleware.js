

module.exports = {
	userMiddleware: function(req, res, next) {
		console.log("middleware");
		/*res.setHeader("Access-Control-Allow-Origin", "*");
  		res.setHeader("Access-Control-Allow-Headers", "access-control-allow-origin,content-type");
  		//res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");*/
		return next();
	}
}