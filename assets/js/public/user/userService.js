app.factory('userService', function($http) {
  return {

	createUser: function (dataInf) {
			var oPromise = $http.post('/user',dataInf).then(function (response) {
				return response.data;
		});
		return oPromise;
	  },

	  listUser: function () {
			var oPromise = $http.get('/user').then(function (response) {
				return response.data;
		});
		return oPromise;

	  } 
  };
});


app.factory('sessionService', function($http) {
  return {

	createSession: function (data) {
			var oPromise = $http.post('/session',data).then(function (response) {
				return response.data;
		});
		return oPromise;
	  } 
  };
});

app.factory('chatGroupService', function($http) {
  return {

	createMsgChatGroup: function (data) {
			var oPromise = $http.post('/session',data).then(function (response) {
				console.log(JSON.stringify('services o promise '+ oPromise));
				return response.data;
		});
		return oPromise;
	  } 
  };
});
