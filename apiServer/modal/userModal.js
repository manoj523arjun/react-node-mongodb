
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
	method: {
		type:String,
		enum: ["web", "google"],
		required:true
	},
	web: {
		firstName: {
			type:String
		},
		lastName: {
			type:String
		},
		email: {
			type:String
		},
		password: {
			type:String
		}
	},
	google: {
		firstName: {
			type:String
		},
		lastName: {
			type:String
		},
		email: {
			type:String
		}
	}
});
/*userSchema.pre('save', function(next) {
	try {
		next();
	} catch(e) {
		next(e)
	}
})*/

const createUser = mongoose.model("User", userSchema);
const Products = mongoose.model("products", new Schema({
    "cat": String,
    "sku": String,
    "imgUrl": {
      "thumb": String,
      "main": String
    },
    "name": String,
    "price": Number,
    "quantity": String,
    "sizes": [
      {
        "size_name" : String,
        "size_val" : String,
        "size_qty": Number
      }
    ],
   "color":{
    "code":String,
    "name": String
   },
    "availability": String
  }));

const getProducts = async function() {
	let Product = await Products.find();
	//console.log(Product);
	return Product;
}

module.exports = {createUser, getProducts};