function updateTableHistory(oModel){
    		var sURL =  window.location.href +"calculator/expressions/all";
    		var sUsername = oModel.getProperty("/username");
    		var params = {
					username: sUsername
			};
			sURL +=  formatParams(params);
			var oxhr = new XMLHttpRequest();
			oxhr.open("GET", sURL, true);
			oxhr.send();
			oxhr.onload = function () {
				if (oxhr.status == 200) {
					var oJSONData = JSON.parse(this.responseText);
					var oJSONReversedResult = [];
					var length = oJSONData.length;
					for (var i = length - 1; i >= 0; i--) {
						oJSONReversedResult.push(oJSONData[i]);
					}
					oModel.setProperty("/tableHistory",oJSONReversedResult);
				}
			}
};
function formatParams(params) {
	return "?" + Object
	.keys(params)
	.map(function (key) {
		return key + "=" + encodeURIComponent(params[key])
	})
	.join("&")
};


