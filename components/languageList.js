
module.exports = {
	languages : [
	{'name' : 'english', 'engine': 'yandex'}, 
	{'name': 'somali', 'engine': 'google translate'},
	{'name': 'tagalog', 'engine': 'yandex'},
	{'name': 'russian', 'engine': 'yandex'}
	],

	//Function to create and return string that describes whether and how a language currently is supported.
	searchSupported : function(requestedLang){
		var requested = requestedLang.toLowerCase().trim();
		var found = this.languages.find(function(lang){
			return lang.name == requested;
		});

		if (found){
			return '<p><strong>' +  requestedLang + '</strong> is supported! </p><p> Using the: ' + found.engine + ' engine</p>';
		} else {
			return '<p> Sorry, that language is not currently supported by our app. </p>'
		}
	},	

	//returns array of language names
	getLangNames: function(){
		var langs = this.languages.map(function(lang){
			return lang.name;
		});

		return langs;
	},

	//Adds language to the list, returns true on success.
	addLang: function(name, engine){
		var oldLength = this.languages.length;
		var newLang = {'name': name.toLowerCase(), 'engine': engine};

		//check to make sure language isn't already on the list.
		var alreadyExists = this.languages.find(function(item){
			return item.name == name;
		});

		//add and check new list length to measure success, else return false 
		if (!alreadyExists){
			var newLength = this.languages.push(newLang);
			return newLength > oldLength;
		} else { //language has already been added.
			return false;
		}
	},

	deleteLang: function(lang){
		//match casing of language list.
		lang = lang.toLowerCase();

		//remember length of list before attempting delete.
		var oldLength = this.languages.length;

		//loop through list, delete any that match (in unlikely case of duplicates)
		this.languages.forEach(function(item, index, langs){
			if (item.name == lang){
				langs.splice(index, 1);
			}
		});

		//compare to prior list length to see if deletion was successful. 
		var success = this.languages.length < oldLength;
		return success;
	}, 

	///updates the engine used to support a language. Returns true on success.
	updateLang: function(lang, newName, newEngine){
		lang = lang.toLowerCase();

		var success = false;

		this.languages.forEach(function(item){
			if (item.name == lang){
				item.name = newName.toLowerCase();
				item.engine = newEngine;
				success = true;
			}
		});

		return success;
	}
}
