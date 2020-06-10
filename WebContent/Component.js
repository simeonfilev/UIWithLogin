sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./tableHistory",
	"./updateUsername"
],function (UIComponent, JSONModel) {
	"use strict";

	return UIComponent.extend("sap.ui.acad.calculator.Component", {
		
		metadata: {
			manifest: "json"
		},
		init: function () {
			UIComponent.prototype.init.apply(this, arguments);
			var oData = {
				calculator: {
					expression: "",
					answer: "0",
				},
			};
			var oModel = new JSONModel(oData, true);
			updateUsername(oModel);
			this.setModel(oModel);
		}
		
	})
	
});