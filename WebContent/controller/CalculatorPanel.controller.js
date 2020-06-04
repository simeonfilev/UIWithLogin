sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../tableHistory"
	],function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.acad.calculator.controller", {

		calculate: function () {
			var oModel = this.getView().getModel();
			var sExpression = this.getView().getModel().getProperty("/calculator/expression");
			var sEndpoint = window.location.href + "calculator/expressions";
			var sUsername = oModel.getProperty("/username");
			var params = {
					expression: sExpression,
					username: sUsername
			};
			var sURL = sEndpoint + formatParams(params);
			var oxhr = new XMLHttpRequest();
			oxhr.open("POST", sURL, true);
			oxhr.send();
			oxhr.onerror = function () {
				oModel.setProperty("/calculator/answer", "INVALID EXPRESSION");
				oModel.setProperty("/calculator/expression", "0");
			}
			oxhr.onload = function () {
				if (oxhr.status == 201) {
					var oJSONData = JSON.parse(this.responseText);
					var iID = oJSONData;
					async function run() {
						await getResponse(iID);
						var dAnswer = await getAnswerByID(iID);
						if (dAnswer == null) {
							oModel.setProperty("/calculator/answer", "INVALID EXPRESSION");
							oModel.setProperty("/calculator/expression", "0");
							return;
						}

						oModel.setProperty("/calculator/answer", dAnswer);
						oModel.setProperty("/calculator/expression", dAnswer);
						populateHistoryTable(oModel, sEndpoint);
					}
					run();
				}
				if(oxhr.status == 400){
					oModel.setProperty("/calculator/answer", "INVALID EXPRESSION");
					oModel.setProperty("/calculator/expression", "0");
				}
			}
		},
		addToExpression: function (e) {
			var sExpression = this.getView().getModel().getProperty("/calculator/expression");
			var oButton = e.getSource();
			var sButtonText = oButton.mProperties.text;
			var sNewExpression = sExpression + sButtonText;
			this.getView().getModel().setProperty("/calculator/expression", sNewExpression);
		}
	});

	function populateHistoryTable(oModel) {
		updateTableHistory(oModel);
	}

	function formatParams(params) {
		return "?" + Object
		.keys(params)
		.map(function (key) {
			return key + "=" + encodeURIComponent(params[key])
		})
		.join("&")
	};

	function getResponse(id) {
		return new Promise(resolve => {
			var sEndpoint =  window.location.href +"calculator/expressions/status";
			var params = {
					id: id
			};
			var sURL = sEndpoint + formatParams(params);
			function checkStatus() {
				try {
					var oxhr = new XMLHttpRequest();
					oxhr.open("GET", sURL, true);
					oxhr.send();
					oxhr.onload = function () {
						if (oxhr.status == 200 || oxhr.status == 204) {
							resolve();
						} else {
							checkStatus();
						}
					}
				} catch (error) {
					checkStatus();
				};
			}
			checkStatus();
		})
	};

	function getAnswerByID(id) {
		return new Promise(resolve => {
			var sEndpoint =  window.location.href +"calculator/expressions";
			var params = {
					id: id
			};
			var sURL = sEndpoint + formatParams(params);
			function checkStatus() {
				try {
					var oxhr = new XMLHttpRequest();
					oxhr.open("GET", sURL, true);
					oxhr.send();
					oxhr.onload = function () {
						if (oxhr.status == 200) {
							var oJSONData = JSON.parse(this.responseText);
							var dAnswer = oJSONData["answer"];
							resolve(dAnswer);
						} else if (oxhr.status == 202) {
							getAnswerByID(id);
						} else if (oxhr.status == 204) {
							resolve(null);
						} else {
							getAnswerByID(id);
						}
					}
				} catch (error) {
					getAnswerByID(id);
				};
			}
			checkStatus();
		});
	}
});