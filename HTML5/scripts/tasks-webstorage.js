storageEngine = function(){
	var initialized = false;
	var initializedObjectStores = {};
	return{
		init:function(successCallback,errorCallback){
			if(window.localStorage){
				initialized=true;
				successCallback(null);
			}
			else{
				errorCallback('storage_api_not_supported','El API de almacenamiento no está soportado');
			}
		},

		initObjectStore:function(type,successCallback,errorCallback){
			if(!initialized){
				errorCallback('storage_api_not_initialized','El motor de almacenamiento no está inicializado');
			}
			else if(!localStorage.getItem(type)){
				localStorage.setItem(type,JSON.stringify({}));
			}
			else{
				initializedObjectStores[type]=true;
				successCallback(null);
			}
		},

		save:function(type,obj,successCallback,errorCallback){

		},

		findAll:function(type,successCallback,errorCallback){

		},

		delete:function(type,id,successCallback,errorCallback){

		},

		findByProperty:function(type,propertyName,propertyValue,successCallback,errorCallback){

		},

		findById:function(type,id,successCallback,errorCallback){

		}
	}
}();