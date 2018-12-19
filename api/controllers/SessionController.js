/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	create: function(req, res) {
 		var userObj ={
	 			Nombre: req.param('Nombre'),
	 			Apellido: req.param('Apellido'),
	 			Usuario: req.param('Usuario'),
	 			Correo: req.param('Correo')
 		    }

	Session.create(userObj, function(err, user){
 			if(err) {
 				console.log("aqui esta err "+err);
 			}else{
			req.session.authenticated = true;
   			req.session.User = userObj;
 		         res.send(userObj);	

 			}
 		});

 	}
};
