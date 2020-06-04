function updateUsername(oModel){
	return new Promise(resolve => {
		var sURL =  window.location.href +"getuserinfo";
		function checkStatus() {
			try {
				var oxhr = new XMLHttpRequest();
				oxhr.open("GET", sURL, true);
				oxhr.send();
				oxhr.onload = function () {
					if (oxhr.status == 200) {
						if(this.responseText == "undefined"){
							updateUsername(oModel);
						}
						else if(this.responseText === "undefined"){
							updateUsername(oModel);
						}
						else{
							
							oModel.setProperty("/username",this.responseText);
							resolve();
						}
						
					} 
					else {
						updateUsername(oModel);
					}
				}
			} catch (error) {
				updateUsername(oModel);
			};
			
		}
		checkStatus();
	})
};

