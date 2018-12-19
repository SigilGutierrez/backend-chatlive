/* global User */

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
 
create: function(req, res) {
	    var io = sails.io;
 		var userObj ={
	 			Nombre: req.param('Nombre'),
	 			Apellido: req.param('Apellido'),
	 			Usuario: req.param('Usuario'),
	 			Correo: req.param('Correo')
 		};
 		User.create(userObj, function(err, user){
 			if(err) {
 				req.session.flash={
 					err: err
 				}
 				return res.send(false);
 			}
                        else{
                                    req.session.flash= user;
                                    io.sockets.emit('userCreated',userObj);
                                    return res.send(userObj);
                                }
               

 		});
 	},

index: function(req, res){
		User.find(function(err, users){
			if (!err) 
				res.send(users);
			else 
			res.send(false);
		});
	},

destroy: function (req, res,next) {
	    User.destroy(req.param('id'), function userDestroyed(err){
	    	if(err){
	    		connsole.log(err);
	    		return res.send(false);
	    	}
	    	return res.send(true);
	    });
	// body...
}


}