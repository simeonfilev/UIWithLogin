sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
	"use strict";

	return {
		init: function () {
		
			var oUriParameters = new UriParameters(window.location.href);
			
			var oMockServer = new MockServer({
			
			});
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});
			
			var aRequests = oMockServer.getRequests();
			aRequests.push({ 
				method: "GET",
				path: new RegExp("(.*)getuserinfo(.*)"),
				response: function(oXhr) {
					var oResponse = {
						data: "test",
						headers: {
							"Content-Type": "text/plain"
						},
						status: "200"
					};
					oXhr.respond(oResponse.status, oResponse.headers, oResponse.data);
				}
			}); 
			oMockServer.setRequests(aRequests);
			oMockServer.start();
		}
	};
});