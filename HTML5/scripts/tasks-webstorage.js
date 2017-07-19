storageEngine = function(){
	var initialized = false;
	var initializedObjectStores = {};

	function getStorageObject(type){
		var item = localStorage.getItem(type);
		var parsedItem = JSON.parse(item);
		return parsedItem;
	}

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
			if(!initialized){
				errorCallback('storage_api_not_initialized','El motor de almacenamiento no está inicializado');
			}
			else if(!initializedObjectStores[type]){
				errorCallback('store_not_initialized','El almacenador de objetos '+type+' no ha sido inicializado');
			}

			if(!obj.id){
				obj.id = $.now();
			}

			var storageItem = getStorageObject(type);
			storageItem[obj.id] = obj;
			localStorage.setItem(type,JSON.stringify(storageItem));
			successCallback(obj);
		},

		findAll:function(type,successCallback,errorCallback){
			if(!initialized){
				errorCallback('storage_api_not_initialized','El motor de almacenamiento no está inicializado');
			}
			else if(!initializedObjectStores[type]){
				errorCallback('store_not_initialized','El almacenador de objetos '+type+' no ha sido inicializado');
			}

			var result = [];
			var storageItem = getStorageObject(type);
			$.each(storageItem,function(i,v){
				result.push(v);
			});

			successCallback(result);
		},

		delete:function(type,id,successCallback,errorCallback){
			if(!initialized){
				errorCallback('storage_api_not_initialized','El motor de almacenamiento no está inicializado');
			}
			else if(!initializedObjectStores[type]){
				errorCallback('store_not_initialized','El almacenador de objetos '+type+' no ha sido inicializado');
			}

			var storageItem = getStorageObject(type);
			if(storageItem[id]){
				delete storageItem[id];
				localStorage.setItem(type,JSON.stringify(storageItem));
				successCallback(id);
			}
			else{
				errorCallback('object_not_found','Objeto no encontrado');
			}
		},

		findByProperty:function(type,propertyName,propertyValue,successCallback,errorCallback){
			if(!initialized){
				errorCallback('storage_api_not_initialized','El motor de almacenamiento no está inicializado');
			}
			else if(!initializedObjectStores[type]){
				errorCallback('store_not_initialized','El almacenador de objetos '+type+' no ha sido inicializado');
			}

			var result = [];
			var storageItem = getStorageObject(type);
			$.each(storageItem,function(i,v){
				if(v[propertyName] === propertyValue){
					result.push(v);
				}
			});
			successCallback(result);
		},

		findById:function(type,id,successCallback,errorCallback){
			if(!initialized){
				errorCallback('storage_api_not_initialized','El motor de almacenamiento no está inicializado');
			}
			else if(!initializedObjectStores[type]){
				errorCallback('store_not_initialized','El almacenador de objetos '+type+' no ha sido inicializado');
			}

			var storageItem = getStorageObject(type);
			var result = storageItem[id];
			successCallback(result);	
		}
	}
}();