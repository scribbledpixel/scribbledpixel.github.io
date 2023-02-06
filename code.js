// Save list of users to local storage.
function saveList() {
	console.log("Saving the list!")

	var rowCount = document.getElementById("user-list-body").rows.length;
	console.log("Counted Rows: " + rowCount);

	// The string to store in local storage.
	var user_string = "";

	for (let step = 0; step < rowCount; step++) {
		var id_to_process = document.getElementById("user-list-body").rows[step].cells[1].getElementsByTagName("input")[0].id;
		//console.log("ID to process: " + id_to_process);

		// User Name
		user_string = user_string + document.getElementById(id_to_process).value;

		// If marked active
		if (document.getElementById(id_to_process + "-active").checked) {
			user_string = user_string + "," + 1;
		} else {
			user_string = user_string + "," + 0;
		}

		// If Tank
		if (document.getElementById(id_to_process + "-tank").checked) {
			user_string = user_string + "," + 1;
		} else {
			user_string = user_string + "," + 0;
		}

		// If Healer
		if (document.getElementById(id_to_process + "-healer").checked) {
			user_string = user_string + "," + 1;
		} else {
			user_string = user_string + "," + 0;
		}

		// If DPS
		if (document.getElementById(id_to_process + "-dps").checked) {
			user_string = user_string + "," + 1;
		} else {
			user_string = user_string + "," + 0;
		}

		user_string = user_string + ";";

		//console.log("Row content ID: " + document.getElementById("user-list-body").rows[step].cells[1].getElementsByTagName("input")[0].id);
	}

	// Delete last ';' in string.
	user_string = user_string.slice(0, -1);

	// String to save.
	console.log(user_string);

	localStorage.setItem('groupData', user_string);


	//console.log("Row content ID: " + document.getElementById("user-list-body").rows[0].cells[1].getElementsByTagName("input")[0].id);

	// var children = document.querySelectorAll("#user-list-body tr td input");
	// for (var i = 0; i < children.length; i++) {
	// 	console.log(children[i].id);
	// }
}


// Display the impot box.
function displayImport() {
	document.getElementById("import_div").style.display = "block";
}


// Import the data and save to local storage.
function importData() {
	console.log("Importing Data!");

	console.log("Data to import: " + document.getElementById("import_box").value);

	localStorage.setItem("groupData", document.getElementById("import_box").value);

	document.getElementById("import_button").style.display = "none";
	document.getElementById("import_confirm").style.display = "block";
}


// Export list for importing.
function exportList() {
	console.log("Export Data!");

	document.getElementById("export_div").style.display = "block";

	const groupData = localStorage.getItem('groupData');

	document.getElementById("export_box").innerHTML = groupData;
}


// Destroy the local list.
function destroyList() {
	console.log("Destroying list!");

	// Remove all localStorage items for the site.
	localStorage.clear();
}


// Load the groups from local storage and populate the group list.
function loadGroups() {

	console.log("Reading groups and populating the page!")

	try {
		const groupData = localStorage.getItem('groupData');
		console.log("String to import: " + groupData);

		const groupArray = groupData.split(";");
		groupArray.sort();
		// console.log("The array 1: " + groupArray[0]);
		// console.log("The array 2: " + groupArray[1]);
		// console.log("The array 3: " + groupArray[2]);
		// console.log("The array 4: " + groupArray[3]);
		// console.log("The array 5: " + groupArray[4]);

		var table = document.getElementById('user-list-body');

		for (let step = 0; step < groupArray.length; step++) {
			const individualUserData = groupArray[step].split(",");
			// console.log("1: " + individualUserData[0]);
			// console.log("2: " + individualUserData[1]);
			// console.log("3: " + individualUserData[2]);
			// console.log("4: " + individualUserData[3]);
			// console.log("5: " + individualUserData[4]);

			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);

			var cell1 = row.insertCell(0);
			if (individualUserData[1] === "1") {
				cell1.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-active" checked></input>';
			} else {
				cell1.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-active"></input>';
			}

			var cell2 = row.insertCell(1);
			cell2.innerHTML = '<input class="form-control" id="user' + step + '"></input>';
			document.getElementById("user" + step).value = individualUserData[0];

			var cell3 = row.insertCell(2);
			if (individualUserData[2] === "1") {
				cell3.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-tank" checked></input>';
			} else {
				cell3.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-tank"></input>';
			}

			var cell4 = row.insertCell(3);
			if (individualUserData[3] === "1") {
				cell4.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-healer" checked></input>';
			} else {
				cell4.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-healer"></input>';
			}


			var cell5 = row.insertCell(4);
			if (individualUserData[4] === "1") {
				cell5.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-dps" checked></input>';
			} else {
				cell5.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-dps"></input>';
			}

			var cell6 = row.insertCell(5);
			cell6.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteUser(this);">Delete</button>';

			userCount++;
		}

		document.getElementById("result_div").style.display = "block";
		document.getElementById("result_box").innerHTML = "<p>List loaded and ready.</p>"

	} catch (error) {
		// No data to import.
		console.log("No data to import.")

		document.getElementById("result_div").style.display = "block";
		document.getElementById("result_box").innerHTML = "<p>No import data available.</p>";
	}
}


// Arrays for the groups.
const arrayOfTanks = [];
const arrayOfHealers = [];
const arrayOfDPS = [];

// Build the teams.
function buildGroups() {
	console.log("Building groups! - In progress")

	// Reset all arrays in case the page hasn't been refreshed.
	arrayOfTanks.length = 0;
	arrayOfHealers.length = 0;
	arrayOfDPS.length = 0;


	var rowCount = document.getElementById("user-list-body").rows.length;
	console.log("Counted Rows: " + rowCount);

	// The string to store in local storage.
	var user_string = "";

	for (let step = 0; step < rowCount; step++) {
		var id_to_process = document.getElementById("user-list-body").rows[step].cells[1].getElementsByTagName("input")[0].id;

		// If marked active
		if (document.getElementById(id_to_process + "-active").checked) {
			// User is active so we can sort them.

			// User Name
			user_to_add = document.getElementById(id_to_process).value;
			//console.log("Attempting to add: " + user_to_add);

			// If Tank
			if (document.getElementById(id_to_process + "-tank").checked) {
				arrayOfTanks.push(user_to_add);
			}

			// If Healer
			if (document.getElementById(id_to_process + "-healer").checked) {
				arrayOfHealers.push(user_to_add);
			}

			// If DPS
			if (document.getElementById(id_to_process + "-dps").checked) {
				arrayOfDPS.push(user_to_add);
			}

		} else {
			// User is inactive, so do nothing.
		}
	}

	console.log("Roles are sorted. Need to build groups.");
	console.log("Tank array: " + arrayOfTanks);
	console.log("Healer array: " + arrayOfHealers);
	console.log("DPS array: " + arrayOfDPS);

	shuffleGroups();
}

// Select a random number between 0 and "max"
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}


// Remove the selected name from all arrays if possible.
function removeFromLists(characterToRemove) {
	tankToRemove = arrayOfTanks.indexOf(characterToRemove);
	if (tankToRemove >= 0) {
		arrayOfTanks.splice(tankToRemove, 1);
	}

	healerToRemove = arrayOfHealers.indexOf(characterToRemove);
	if (healerToRemove >= 0) {
		arrayOfHealers.splice(healerToRemove, 1);
	}

	dpsToRemove = arrayOfDPS.indexOf(characterToRemove);
	if (dpsToRemove >= 0) {
		arrayOfDPS.splice(dpsToRemove, 1);
	}
}


// Randomly build the groups.
function shuffleGroups() {
	console.log("Time to shuffle groups!");

	// arrayOfDPS.indexOf("Kard")  -- Returns the index ID if found, -1 if not present.
	// array.splice(9, 1) --- at the index of 9, remove 1 item and return the updated array.

	// console.log(arrayOfDPS.indexOf("Kard"));


	var groupCounter = 1;

	document.getElementById("result_div").style.display = "block";
	document.getElementById("result_box").innerHTML = "<p>Building groups...</p>"

	while (arrayOfTanks.length > 0 && arrayOfHealers.length > 0 && arrayOfDPS.length >= 5) {

		selectedTank = arrayOfTanks[getRandomInt(arrayOfTanks.length)];
		removeFromLists(selectedTank);
		console.log("TANK: " + selectedTank);
		//console.log("Tank array: " + arrayOfTanks);

		selectedHealer = arrayOfHealers[getRandomInt(arrayOfHealers.length)];
		removeFromLists(selectedHealer);
		console.log("HEALER: " + selectedHealer);
		//console.log("Healer array: " + arrayOfHealers);

		// THIS IS WRONG!
		// Will need to check the DPS and healer lists again to ensure I'm not breaking a future group, BUT this is fine for the moment to see if i'm building groups.
		//console.log("**Remaining DPS: " + arrayOfDPS);

		selectedDPSOne = arrayOfDPS[getRandomInt(arrayOfDPS.length)];
		// while arrayOfTanks & arrayOfHealers >= 1 & selectedDPSOne is in either array, keep looking for alternate options, unless arrayOfDPS is = 3.
		removeFromLists(selectedDPSOne);
		console.log("DPS1: " + selectedDPSOne);

		selectedDPSTwo = arrayOfDPS[getRandomInt(arrayOfDPS.length)];
		// Same
		removeFromLists(selectedDPSTwo);
		console.log("DPS2: " + selectedDPSTwo);

		selectedDPSThree = arrayOfDPS[getRandomInt(arrayOfDPS.length)];
		// Same
		removeFromLists(selectedDPSThree);
		console.log("DPS3: " + selectedDPSThree);

		document.getElementById("result_div").style.display = "block";
		document.getElementById("result_box").innerHTML = document.getElementById("result_box").innerHTML + "<p><strong>Group " + groupCounter + "</strong><br>Tank: " + selectedTank + "<br>Healer: " + selectedHealer + "<br>DPS: " + selectedDPSOne + ", " + selectedDPSTwo + ", " + selectedDPSThree + "</p>";

		groupCounter++;

		console.log("**Remaining Tanks: " + arrayOfTanks);
		console.log("**Remaining Healers: " + arrayOfHealers);
		console.log("**Remaining DPS: " + arrayOfDPS);

	} // End While


	/**
	 * If arrayOfTanks.length > 1
	 * 		Select one tank at random.
	 * 		Remove name from arrayOfTanks, arrayOfHealers and arrayOfDPS.
	 * If arrayOfHealers.length > 1
	 * 		Select one healer at random.
	 * 		Remove name from arrayOfTanks, arrayOfHealers and arrayOfDPS.
	 * Select 1 DPS from the list.
	 * 		If present in arrayOfTanks or arrayOfHealers AND the length of the Tank and healer arrays are both greater than one, skip and reselect a DPS, else add to group and remove from all lists.
	 * 		
	*/

}


// Count of users.
var userCount = 0;


// Add an empty row to the user list.
function addNewUser() {
	console.log("Adding user " + userCount);

	var table = document.getElementById('user-list-body');

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
	cell1.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-active" checked></input>';

	var cell2 = row.insertCell(1);
	cell2.innerHTML = '<input class="form-control" id="user' + userCount + '"></input>';

	var cell3 = row.insertCell(2);
	cell3.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-tank"></input>';

	var cell4 = row.insertCell(3);
	cell4.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-healer"></input>';

	var cell5 = row.insertCell(4);
	cell5.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-dps"></input>';

	var cell6 = row.insertCell(5);
	cell6.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteUser(this);">Delete</button>';

	userCount++;
}

// Delete the selected user.
function deleteUser(row) {
	var i = row.parentNode.parentNode.rowIndex;
	document.getElementById('user-list').deleteRow(i);
}