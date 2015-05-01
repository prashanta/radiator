/*
 * Some Global Settings
 * 
 * */
define({
	mode: 0, /* 0: Development; 1: Production */		
	devUrl: "http://localhost:8080",
	proUrl: "http://192.168.74.250",
		
	getBaseUrl: function(){
		if(this.mode == 0)
			return this.devUrl;
		else if(this.mode == 1)
			return this.proUrl;		
	}	
});