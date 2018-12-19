/**
 * ChatPrivateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


		index: function(req, res){
		ChatPrivate.find(function(err, ChatPrivate){

			if (!err) 
				res.send(ChatPrivate);
			else 
			res.send(false);
		  })
	    },

	  	create: function(req, res) {
	  		var io = sails.io;
 		var msgPrivate ={
	 			msg: req.param('msg'),
	 			idEm: req.param('idEm'),
	 			NombreEm: req.param('NombreEm'),
	 			idRcp: req.param('idRcp'),
	 			NombreRcp: req.param('NombreRcp')
 		};

 		ChatPrivate.create(msgPrivate, function(err, msgsPrivate){
 			if(err) {
 				req.session.flash={
 					err: err
 				}
 				return res.send(false);
 			}
 			io.sockets.emit('MsgPrivateCreated',msgPrivate);
 		    res.send(msgPrivate);	

 		});
 	},

 		chatUsuario: function(req, res) {
	 			var idEmisor= req.param('idEm');
	 			var idRecptor= req.param('idRcp');
 				ChatPrivate.find(function(err, ChatPriv){
				if (!err) {
					var chatUsers= [];
					for (var i = 0; i < ChatPriv.length;i++) {
						var msg = ChatPriv[i];
						if ((msg.idEm == idEmisor && msg.idRcp == idRecptor) || (msg.idEm == idRecptor && msg.idRcp == idEmisor)) {
						chatUsers.push(msg);
						}
					}
					return res.send(chatUsers);
				}
				else 
				return res.send(false);
			  });
 	    },
  

};

