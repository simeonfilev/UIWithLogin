function updateUsername(oModel){
		var sURL = window.location.origin +"/getuserinfo";
		var oxhr = new XMLHttpRequest();
		oxhr.open("GET", sURL, true);

		oxhr.onload = function () {
			if (oxhr.status == 404) {
				oModel.setProperty("/username","test");
			}
			else if (oxhr.status == 200) {
				oModel.setProperty("/username",this.responseText);
			}
			var sNewURL =  window.location.origin +"/calculator/expressions/all";
	    	var sUsername = oModel.getProperty("/username");
	    	var params = {
					username: sUsername
			};
	    	sNewURL +=  formatParams(params);
			var onewxhr = new XMLHttpRequest();
			onewxhr.open("GET", sNewURL, true);
			onewxhr.onload = function () {
				if (onewxhr.status == 200) {
					var oJSONData = JSON.parse(this.responseText);
					var oJSONReversedResult = [];
					var length = oJSONData.length;
					for (var i = length - 1; i >= 0; i--) {
						oJSONReversedResult.push(oJSONData[i]);
					}
					oModel.setProperty("/tableHistory",oJSONReversedResult);
					}
				}
			onewxhr.send();
			
		}
		oxhr.send();
		


};

function formatParams(params) {
	return "?" + Object
	.keys(params)
	.map(function (key) {
		return key + "=" + encodeURIComponent(params[key])
	})
	.join("&")
};

