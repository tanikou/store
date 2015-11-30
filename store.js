/*
	auther : {
		name   : victan
		email  : victan@qq.com
		github : https://github.com/tanikou/store
	}
*/
(function () {
	var Store = function () {
		constructor : Store
	};
	if (!Array.isArray) {
		// FIX 4 IE8
		Array.isArray = function(arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}

	Store.prototype.set = function( key, value ){
		if ( 'object' === typeof(value) || Array.isArray(value) ) { value = JSON.stringify( value ); };
		return this._set( key, value );
	}
	Store.prototype.get = function( key ){
		var o = this._get( key );
		try { o = JSON.parse( o || '{}' ); } catch (err) {}
		return o;
	}
	/************************这应该写成内部方法 开始**************************/
	Store.prototype._set = function( key, value ){
		sessionStorage.setItem( key , value );
		return this._get( key );
	}
	Store.prototype._get = function( key ){
		return sessionStorage.getItem(key);
	}
	/************************这应该写成内部方法 结束**************************/
	Store.prototype.decode = function( str, separate ){
		var o = {};
		var ueach = str.split(separate || '&');
		for(var idx in ueach){
			if(!ueach[idx]){ continue; }
			var kv = ueach[idx].split("=");
			o[kv[0]] = kv[1];
		}
		return o;
	}

	Store.prototype.url = function( key ){
		var all = this.decode(window.location.search.substr(1));
		return (undefined === key ? all : all[key]);
	}
	Store.prototype.hash = function( key ){
		var all = this.decode(window.location.hash.substr(1));
		return (undefined === key ? all : all[key]);
	}
	
	Store.prototype.cookie = function( key ){
		var all = this.decode(document.cookie, /; ?/);
		return (undefined === key ? all : all[key]);
	}

	window.store = new Store();
})();