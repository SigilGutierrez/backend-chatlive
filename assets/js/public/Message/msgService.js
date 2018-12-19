app.factory('msgService', function($http) {
  return {

	createMsgChatGroup: function (data) {
			var oPromise = $http.post('/ChatGroup',data).then(function (response) {
				return response.data;
		});
		return oPromise;
	  },
	
	listMsgGroup: function () {
			var oPromise = $http.get('/ChatGroup').then(function (response) {
				return response.data;
		});
		return oPromise;

	  },
	  
	createMsgChatPrivate: function (data) {
			var oPromise = $http.post('/ChatPrivate',data).then(function (response) {
				return response.data;
		});
		return oPromise;
	  },
	
	listMsgChatPrivateUser: function (data) {
			var oPromise = $http.post('/ChatPrivateUser',data).then(function (response) {
				return response.data;
		});
		return oPromise;

	  }  
  };
});

