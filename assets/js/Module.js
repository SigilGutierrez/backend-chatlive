// Create a new module
var app = angular.module('userModule', []);
var session = false;
var userLogin ={};
app.controller('userController',[ '$scope','userService','sessionService','msgService',function ($scope, userService,sessionService,msgService) {

// Proceso para registrar e ingresar un Usuario
$scope.users = [];
		$scope.formNewUserSubmit = function () {
			 var data ={
			 		Nombre: $scope.user.Nombre,
			 		Apellido: $scope.user.Apellido,
			 		Usuario: $scope.user.Usuario,
			 		Correo: $scope.user.Correo
			   		};

			   userService.createUser(data).then(function (dataUser) {
				   	if (dataUser) {
				   		inciarSession($scope,dataUser,sessionService);
				   		$scope.nombreUsurioLogin = dataUser.Nombre;
				   		userLogin = dataUser;
				   		userService.listUser().then(function (dataUsers) {
			   			   $scope.users = dataUsers;
				   		}).catch(function (err) {
						   	  console.log(JSON.stringify(err));
						   });
						
					$scope.session = true;
					}
			   }).catch(function (err) {
			   	  console.log(JSON.stringify(err));
			   })
			 
	};

// end proccess formNewUserSubmit
io.socket.on('userCreated', function (dataU){
	$scope.users.push(dataU);
});

}]);



app.controller('chatController', ['$scope','msgService', function ($scope,msgService) {
			//	$scope.nombreUsurioLogin = sesion.Nombre;
		$scope.chatsPrivate=[];
$scope.formNewMsgGroup = function () {
			 var data = {
			 		msgGroup: $scope.msgGroup,
			 		idEm: userLogin.id,
			 		NombreEm: userLogin.Nombre
			   		};

			    msgService.createMsgChatGroup(data).then(function (dataMsg) {
			    	if (dataMsg) {
						msgService.listMsgGroup().then(function (dataChatGroup) {
			   			     $scope.chatGroups = dataChatGroup;
			   			     $scope.msgGroup ='';
				   		}).catch(function (err) {
						   	  console.log(JSON.stringify(err));
						   });
			    	}
			   	
				   		
			   }).catch(function (err) {
			   	  console.log(JSON.stringify(err));
			   })
			 
	},

	$scope.formNewMsgPrivate = function () {
			 var dataChatPrivado = {
			 		msg: $scope.msgChatPrivado,
			 		idEm: userLogin.id,
			 		NombreEm: userLogin.Nombre,
			 		idRcp: $scope.idRec,
			 		NombreRcp: $scope.habloCon
			   		};
			   		
			    msgService.createMsgChatPrivate(dataChatPrivado).then(function (dataMsgPrivate) {
			        $scope.msgChatPrivado = null;
					if (dataMsgPrivate) {
			       }
			    }).catch(function (err) {
			   	  console.log(JSON.stringify(err));
			   })
			 
	};
	
	$scope.chatPrivado = function(idRec,NombreRec){
		$scope.chatActive = true;
		$scope.idRec = idRec;
		$scope.habloCon = NombreRec;
		var idNot = '#ntf'+NombreRec;
		$(idNot).css("display", "none");
        $scope.chatsPrivate=[];
		var data = {
			idEm: userLogin.id,
			idRcp: idRec
		}
 			msgService.listMsgChatPrivateUser(data).then(function (dataChatPrivate) {
			   			    for (var i = 0; i < dataChatPrivate.length;i++) {
								$scope.chatsPrivate.push(dataChatPrivate[i]);
							}
				   		}).catch(function (err) {
						   	  console.log(JSON.stringify(err));
						   });

	}

io.socket.on('ChatGroupCreated', function (dataChat){
	if (dataChat.NombreEm === userLogin.Nombre) 
		$('#ChatGroup').append("<p style='text-align: right;'>"+dataChat.msgGroup+"</p>");
	else
		$('#ChatGroup').append("<p><strong>"+dataChat.NombreEm+": </strong>"+dataChat.msgGroup+"</p>");
	
});

io.socket.on('MsgPrivateCreated', function (dataChat){
	
	if (userLogin.Nombre ===dataChat.NombreRcp){
		var idNot = '#ntf'+dataChat.NombreEm;
        $(idNot).empty();
        $(idNot).append("1");
		$(idNot).css("display", "block");
	}
	$scope.chatsPrivate.push(dataChat);
});


	
}]);


function inciarSession($scope,data, sessionService) {
	 sessionService.createSession(data).then(function (dataSession) {
			   	if(dataSession) {
			   	}else{
			   		alert('Error Session');
			   	}
			   	 
			   }).catch(function (err) {
			   	  console.log(err);
			   });
};

function ActivarChatPrivate($scope,data, sessionService) {
	 sessionService.createSession(data).then(function (dataSession) {
			   	if(dataSession) {
			   	}else{
			   		alert('Error Session');
			   	}
			   	 
			   }).catch(function (err) {
			   	  console.log(err);
			   });
};


