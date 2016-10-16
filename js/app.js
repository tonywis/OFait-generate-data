var app = angular.module("GeneratorData", []);


app.controller('AppController', function(){
	var appController = this;
	appController.accountsList = datas.accountsList;
	appController.categoriesList = datas.categoriesList;
	appController.contentsList = datas.contentsList;
	appController.votesList = datas.votesList;
	appController.account = { name: "", items: [] };
	appController.category = { name: "", items: [] };
	appController.contentText = { value: "" };

	appController.getNextId = function(list) {
		var nextId = 1;
		if(list.length > 0)
			nextId = list[list.length-1]._id + 1;
		return nextId;
	}

	appController.addAccount = function() {
		if(appController.account.name.length > 0) {
			console.log(appController.account.name);
			var nextId = appController.getNextId(appController.accountsList);
			acc = {
				_id: nextId,
				name: appController.account.name,
				mail: appController.account.name+"@gmail.com",
				token: "tfljnfalknal"
			};
			appController.accountsList.push(acc);
			appController.account.name = "";
		}
	}

	appController.addCategory = function() {
		if(appController.category.name.length > 0) {
			console.log(appController.category.name);
			var nextId = appController.getNextId(appController.categoriesList);
			var category = { _id: nextId, name: appController.category.name};
			appController.categoriesList.push(category);
			appController.category.name = "";
		}
	}

	appController.addContent = function() {
		if(appController.contentText.value.length > 0) {
			appController.contentText.value = appController.contentText.value.replace(/\n\n/g, "\n");
			var lines = appController.contentText.value.split("\n");
			for (var i = 0; i < lines.length; i++) {
				var col = lines[i].split(/^\d+\s+/);
				var nextId = appController.getNextId(appController.contentsList);
				var content = {
					_id: nextId,
					created_date: new Date(),
					title: "",
					value: col[1],
					category_id: null
				}
				//console.log(content);
				appController.contentsList.push(content);
			}
		}
	}

	appController.clear = function() {
		appController.accountsList = datas.accountsList;
		appController.categoriesList = datas.categoriesList;
		appController.contentsList = datas.contentsList;
		appController.votesList = datas.votesList;
		appController.account.name = "";
		appController.account.items = [];
		appController.category.name = "";
		appController.category.items = [];
		appController.contentText.value = "";
	}


	appController.getVoteFromContent = function(content) {
		var vote = null;
		for (var i = 0; i < appController.votesList.length; i++) {
			if(appController.votesList[i].content_id == content._id) {
				vote = appController.votesList[i];
				break;
			}
		}
		return vote;
	}

	appController.getCheckedVote = function(content) {
		var vote = null;
		for (var i = 0; i < appController.votesList.length; i++) {
			if(appController.votesList[i].content_id == content._id) {
				vote = appController.votesList[i];
				break;
			}
		}
		return vote == null ? false : vote.value;
	}

	appController.getAccountSelectedFrom = function(content, key) {
		console.log("Key : "+key);
		var vote = null;
		for (var i = 0; i < appController.votesList.length; i++) {
			if(appController.votesList[i].content_id == content._id) {
				vote = appController.votesList[i];
				break;
			}
		}
		if (vote == null)
			return undefined;
		var indexAcc = -1;
		for (var i = 0; i < appController.accountsList.length; i++) {
			if(appController.accountsList[i]._id == vote.account_id) {
				indexAcc = i;
			}
		}
		console.log(indexAcc)
		return indexAcc == -1 ? undefined : indexAcc;
	}

	appController.setAccountVoteForContent = function(content, keyItem) {
		var acc = appController.accountsList[appController.account.items[keyItem].selected];
		var vote = appController.getVoteFromContent(content);
		if (vote == null) {
			vote = {
				account_id: acc._id,
				content_id: content._id,
				value: 0
			}
			appController.votesList.push(vote);
		}
		else {
			vote.account_id = acc._id
		}
	}

		appController.setCategoryForContent = function(content, keyItem) {
		var cat = appController.categoriesList[appController.category.items[keyItem].selected];
		content.category_id = cat._id;
	}

	appController.toggleVoteForContent = function(content, keyItem) {
		if(appController.account.items[keyItem]) {
			var acc = appController.accountsList[appController.account.items[keyItem].selected];
			var vote = appController.getVoteFromContent(content);
			if (vote != null) {
				vote.value = vote.value == 0 ? 1 : 0;
			}
		}
	}

});