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
			
//			async function run() {
//				
//				var oMockServer = new MockServer({
//					
//				});
//				
//				var oUriParameters = new UriParameters(window.location.href);
//				MockServer.config({
//					autoRespond: true,
//					autoRespondAfter: oUriParameters.get("serverDelay") || 500
//				});
//				
////				var dataResponse;
////				var windowsHref = window.location.href;
////				var sURL =  windowsHref.substr(0,windowsHref.search("test")) +"calculator/expressions/all";
////	    		var sUsername = ("test");
////	    		var params = {
////						username: sUsername
////				};
////				sURL += formatParams(params);
////				var answer = (await getAll(sURL));
//				
//				
//				var aRequests = oMockServer.getRequests();
//				
//				
////				aRequests.push({ 
////					method: "POST",
////					path: new RegExp("(.*)expressions\\?expression(.*)"),
////					response: function(oXhr, url, sUrlParams) {
////						
////						var oResponse = {
////							headers: {
////								"Content-Type": "application/json",
////							},
////							status: "201"
////						};
////						oXhr.respond(oResponse.status, oResponse.headers,  calculate(sUrlParams));
////					}
////				}); 
////				
				
//				
////				aRequests.push({ 
////					method: "GET",
////					path: new RegExp("(.*)all(.*)"),
////					response: function(oXhr) {
////						var oResponse = {
////							headers: {
////								"Content-Type": "application/json",
////							},
////							status: "200"
////						};
////						oXhr.respond(oResponse.status, oResponse.headers,  answer);
////					}
////				}); 
//				
//				oMockServer.setRequests(aRequests);
//				oMockServer.start();
//			};
		
			
		}
	
	};
//	function getAll(sURL){
//		return new Promise(resolve => {
//			function checkStatus() {
//				try {
//					var oxhr = new XMLHttpRequest();
//					oxhr.open("GET", sURL, true);
//					oxhr.send();
//					oxhr.onload = function () {
//						if (oxhr.status == 200) {
//							if(this.responseText == "undefined" || this.responseText === "undefined"
//								|| this.responseText == "" || this.responseText === "" ){
//								reject();
//							}
//							else{
//								resolve((this.responseText));
//							}	
//						} 
//						
//					}
//				} catch (error) {
//					reject();
//				};
//				
//			}
//			checkStatus();
//		})
//	};
//	function calculate(parameters){
//		var windowsHref = window.location.href;
//			var sEndpoint =windowsHref.substr(0,windowsHref.search("test")) +"calculator/expressions?expression";
//			var sURL = sEndpoint + parameters;
//			//console.log(sURL);
//			var oxhr = new XMLHttpRequest();
//			oxhr.open("POST", sURL, true);
//			oxhr.send();
//			oxhr.onload = function () {
//				console.log(oxhr.status);
//				if (oxhr.status == 201) {
//					alert("HERE");
//					return JSON.parse(this.responseText);
//				}
//			}
//		
//	};

});