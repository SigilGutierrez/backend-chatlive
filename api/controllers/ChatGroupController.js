/**
 * ChatGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   
	create: function(req, res) {
		var io = sails.io;
 		var MsgObj ={
	 			msgGroup: req.param('msgGroup'),
	 			idEm: req.param('idEm'),
	 			NombreEm: req.param('NombreEm')

 		}
 		ChatGroup.create(MsgObj, function(err, data){
 			if(err) {
 				req.session.flash={
 					err: err
 				}
 				return res.send(false);
 			}
 			io.sockets.emit('ChatGroupCreated',MsgObj);
 		    res.send(MsgObj);	

 		});
 	    },


   index: function(req, res){
		User.find(function(err, users){
			if (!err) 
				res.send(users);
			else 
			res.send(false);
		})
	}

};

