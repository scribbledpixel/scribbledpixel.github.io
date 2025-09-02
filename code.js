// Output a list of active names and roles for people to check the settings.
function preFightList() {
	//console.log("Building Prefight list!")

	document.getElementById("result_box").innerHTML = "<p>List of players who are currently active in the list and their roles:</p>";

	var rowCount = document.getElementById("user-list-body").rows.length;
	//console.log("Counted Rows: " + rowCount);

	var outputResults = "<p>";

	for (let step = 0; step < rowCount; step++) {
		var id_to_process = document.getElementById("user-list-body").rows[step].cells[2].getElementsByTagName("input")[0].id;

		// We are going to export only the people marked active.
		if (document.getElementById(id_to_process + "-active").checked) {

			// User Name
			outputResults = outputResults + document.getElementById(id_to_process).value;

			// If Tank
			if (document.getElementById(id_to_process + "-tank").checked) {
				outputResults = outputResults + " - Tank";
			}

			// If Healer
			if (document.getElementById(id_to_process + "-healer").checked) {
				outputResults = outputResults + " - Healer";
			}

			// If DPS
			if (document.getElementById(id_to_process + "-dps").checked) {
				outputResults = outputResults + " - DPS";
			}

			outputResults = outputResults + "<br>"
		}
	}

	document.getElementById("result_box").innerHTML = document.getElementById("result_box").innerHTML + outputResults + "</p>";
}


// Save list of users to local storage.
function saveList() {
	//console.log("Saving the list!")

	var rowCount = document.getElementById("user-list-body").rows.length;
	//console.log("Counted Rows: " + rowCount);

	// The string to store in local storage.
	var user_string = "";

	for (let step = 0; step < rowCount; step++) {
		var id_to_process = document.getElementById("user-list-body").rows[step].cells[2].getElementsByTagName("input")[0].id;
		//console.log("ID to process: " + id_to_process);

		// Remove illegal characters before saving. Replace them with "/".
		var user_name = document.getElementById(id_to_process).value;
		user_name = user_name.replace(/;/g, "/");
		user_name = user_name.replace(/,/g, "/");

		// User Name
		user_string = user_string + user_name;

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
	//console.log(user_string);

	localStorage.setItem('groupData', user_string);

	document.getElementById("result_box").innerHTML = "<p>Data saved.</p>";

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
	//console.log("Importing Data!");

	//console.log("Data to import: " + document.getElementById("import_box").value);

	localStorage.setItem("groupData", document.getElementById("import_box").value);

	document.getElementById("import_button").style.display = "none";
	document.getElementById("import_confirm").style.display = "block";
}


// Export list for importing.
function exportList() {
	//console.log("Export Data!");

	document.getElementById("export_div").style.display = "block";

	const groupData = localStorage.getItem('groupData');

	document.getElementById("export_box").innerHTML = groupData;
}


// Destroy the local list.
function destroyList() {
	//console.log("Destroying list!");

	// Remove all localStorage items for the site.
	localStorage.clear();
}


// Load the groups from local storage and populate the group list.
function loadGroups() {

	//console.log("Reading groups and populating the page!")

	try {
		const groupData = localStorage.getItem('groupData');
		//console.log("String to import: " + groupData);

		const groupArray = groupData.split(";");
		
		// Sort data before displaying it.
		groupArray.sort(function (a, b) {
			return a.localeCompare(b, 'en', { 'sensitivity': 'base' });
		});
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
			cell1.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-priority"></input>';

			var cell2 = row.insertCell(1);
			if (individualUserData[1] === "1") {
				cell2.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-active" checked></input>';
			} else {
				cell2.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-active"></input>';
			}

			var cell3 = row.insertCell(2);
			cell3.innerHTML = '<input class="form-control" id="user' + step + '"></input>';
			document.getElementById("user" + step).value = individualUserData[0];

			var cell4 = row.insertCell(3);
			if (individualUserData[2] === "1") {
				cell4.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-tank" checked></input>';
			} else {
				cell4.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-tank"></input>';
			}

			var cell5 = row.insertCell(4);
			if (individualUserData[3] === "1") {
				cell5.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-healer" checked></input>';
			} else {
				cell5.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-healer"></input>';
			}


			var cell6 = row.insertCell(5);
			if (individualUserData[4] === "1") {
				cell6.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-dps" checked></input>';
			} else {
				cell6.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + step + '-dps"></input>';
			}

			var cell7 = row.insertCell(6);
			cell7.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteUser(this);">Delete</button>';

			userCount++;
		}

		document.getElementById("result_div").style.display = "block";
		document.getElementById("result_box").innerHTML = "<p>List loaded and ready.</p>"

	} catch (error) {
		// No data to import.
		//console.log("No data to import.")

		document.getElementById("result_div").style.display = "block";
		document.getElementById("result_box").innerHTML = "<p>No import data available.</p>";
	}
}


// Arrays for the group pools.
const arrayOfTanks = [];
const arrayOfHealers = [];
const arrayOfDPS = [];

// Arrays of priority players.
const arrayPriorityTanks = [];
const arrayPriorityHealers = [];
const arrayPriorityDPS = [];

// Arrays for class combinations.
const arrayTankHeal = [];
const arrayTankDPS = [];
const arrayHealDPS = [];
const arrayTankHealDPS = [];

// Build the teams.
function buildGroups() {
	//console.log("Building groups! - In progress")

	// Reset all arrays in case the page hasn't been refreshed.
	arrayOfTanks.length = 0;
	arrayOfHealers.length = 0;
	arrayOfDPS.length = 0;

	arrayPriorityTanks.length = 0;
	arrayPriorityHealers.length = 0;
	arrayPriorityDPS.length = 0;

	arrayTankHeal.length = 0;
	arrayTankDPS.length = 0;
	arrayHealDPS.length = 0;
	arrayTankHealDPS.length = 0;

	var rowCount = document.getElementById("user-list-body").rows.length;
	//console.log("Counted Rows: " + rowCount);

	for (let step = 0; step < rowCount; step++) {
		var id_to_process = document.getElementById("user-list-body").rows[step].cells[2].getElementsByTagName("input")[0].id;

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

			// If Tank & Priority
			if (document.getElementById(id_to_process + "-tank").checked && document.getElementById(id_to_process + "-priority").checked) {
				arrayPriorityTanks.push(user_to_add);
			}

			// If Healer
			if (document.getElementById(id_to_process + "-healer").checked) {
				arrayOfHealers.push(user_to_add);
			}

			// If Healer & Priority
			if (document.getElementById(id_to_process + "-healer").checked && document.getElementById(id_to_process + "-priority").checked) {
				arrayPriorityHealers.push(user_to_add);
			}

			// If DPS
			if (document.getElementById(id_to_process + "-dps").checked) {
				arrayOfDPS.push(user_to_add);
			}

			// If DPS & Priority
			if (document.getElementById(id_to_process + "-dps").checked && document.getElementById(id_to_process + "-priority").checked) {
				arrayPriorityDPS.push(user_to_add);
			}

			// If Tank AND Healer
			if (document.getElementById(id_to_process + "-tank").checked && document.getElementById(id_to_process + "-healer").checked) {
				arrayTankHeal.push(user_to_add);
			}

			// If Tank AND DPS
			if (document.getElementById(id_to_process + "-tank").checked && document.getElementById(id_to_process + "-dps").checked) {
				arrayTankDPS.push(user_to_add);
			}

			// If Healer AND DPS
			if (document.getElementById(id_to_process + "-healer").checked && document.getElementById(id_to_process + "-dps").checked) {
				arrayHealDPS.push(user_to_add);
			}

			// If Tank, Healer, AND DPS
			if (document.getElementById(id_to_process + "-tank").checked && document.getElementById(id_to_process + "-healer").checked && document.getElementById(id_to_process + "-dps").checked) {
				arrayTankHealDPS.push(user_to_add);
			}

		} else {
			// User is inactive, so do nothing.
		}
	}

	console.log("Roles are sorted. Need to build groups.");
	console.log("Tank array: " + arrayOfTanks);
	console.log("Healer array: " + arrayOfHealers);
	console.log("DPS array: " + arrayOfDPS);
	console.log("---------------");
	console.log("Priority Tank array: " + arrayPriorityTanks);
	console.log("Priority Healer array: " + arrayPriorityHealers);
	console.log("Priority DPS array: " + arrayPriorityDPS);
	console.log("---------------");
	console.log("Tank and Healer array: " + arrayTankHeal);
	console.log("Tank and DPS list: " + arrayTankDPS);
	console.log("Healer and DPS list: " + arrayHealDPS);
	console.log("Tank, Healer, and DPS list: " + arrayTankHealDPS);

	shuffleGroups();
}

// Select a random number between 0 and "max"
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}


// Remove the selected name from all arrays if possible.
function removeFromLists(characterToRemove) {
	// Regular roles to remove.
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


	// Priority roles to remove.
	priorityTankToRemove = arrayPriorityTanks.indexOf(characterToRemove);
	if (priorityTankToRemove >= 0) {
		arrayPriorityTanks.splice(priorityTankToRemove, 1);
	}

	priorityHealerToRemove = arrayPriorityHealers.indexOf(characterToRemove);
	if (priorityHealerToRemove >= 0) {
		arrayPriorityHealers.splice(priorityHealerToRemove, 1);
	}

	priorityDpsToRemove = arrayPriorityDPS.indexOf(characterToRemove);
	if (priorityDpsToRemove >= 0) {
		arrayPriorityDPS.splice(priorityDpsToRemove, 1);
	}


	// Multi-roles to remove.
	tankHealerToRemove = arrayTankHeal.indexOf(characterToRemove);
	if (tankHealerToRemove >= 0) {
		arrayTankHeal.splice(tankHealerToRemove, 1);
	}

	tankDPSToRemove = arrayTankDPS.indexOf(characterToRemove);
	if (tankDPSToRemove >= 0) {
		arrayTankDPS.splice(tankDPSToRemove, 1);
	}

	healDPSToRemove = arrayHealDPS.indexOf(characterToRemove);
	if (healDPSToRemove >= 0) {
		arrayHealDPS.splice(healDPSToRemove, 1);
	}

	tankHealDPSToRemove = arrayTankHealDPS.indexOf(characterToRemove);
	if (tankHealDPSToRemove >= 0) {
		arrayTankHealDPS.splice(tankHealDPSToRemove, 1);
	}
}


// Randomly build the groups.
function shuffleGroups() {
	//console.log("Time to shuffle groups!");

	// arrayOfDPS.indexOf("Kard")  -- Returns the index ID if found, -1 if not present.
	// array.splice(9, 1) --- at the index of 9, remove 1 item and return the updated array.

	// console.log(arrayOfDPS.indexOf("Kard"));


	var groupCounter = 1;

	document.getElementById("result_div").style.display = "block";
	document.getElementById("result_box").innerHTML = "<p>Building groups...</p>"


	while (arrayOfTanks.length > 0 && arrayOfHealers.length > 0) {
		if (arrayPriorityTanks.length > 0) {
			selectedTank = arrayPriorityTanks[getRandomInt(arrayPriorityTanks.length)];
			removeFromLists(selectedTank);
			selectedTank = "(&)" + selectedTank;
		} else {
			selectedTank = arrayOfTanks[getRandomInt(arrayOfTanks.length)];
			if (selectedTank == null) {
				selectedTank = "[PUG this spot]";
			} else {
				removeFromLists(selectedTank);
			}
		}
		//console.log("TANK: " + selectedTank);
		//console.log("Tank array: " + arrayOfTanks);

		if (arrayPriorityHealers.length > 0) {
			selectedHealer = arrayPriorityHealers[getRandomInt(arrayPriorityHealers.length)];
			removeFromLists(selectedHealer);
			selectedHealer = "(&)" + selectedHealer;
		} else {
			selectedHealer = arrayOfHealers[getRandomInt(arrayOfHealers.length)];
			if (selectedHealer == null) {
				selectedHealer = "[PUG this spot]";
			} else {
				removeFromLists(selectedHealer);
			}
		}
		//console.log("HEALER: " + selectedHealer);
		//console.log("Healer array: " + arrayOfHealers);



		// THIS IS WRONG!
		// Will need to check the DPS and healer lists again to ensure I'm not breaking a future group, BUT this is fine for the moment to see if i'm building groups.
		//console.log("**Remaining DPS: " + arrayOfDPS);


		//do {
		//	okToAdd = false;

		//	if (arrayOfDPS.length >= 1) {
		//		selectedDPSOne = arrayOfDPS[getRandomInt(arrayOfDPS.length)];

		//		tankHealCheck = arrayTankHeal.indexOf(selectedDPSOne);
		//		tankDPSCheck = arrayTankDPS.indexOf(selectedDPSOne);
		//		healDPSCheck = arrayHealDPS.indexOf(selectedDPSOne);
		//		tankHealDPSCheck = arrayTankHealDPS.indexOf(selectedDPSOne);


		//tankHealerToRemove = arrayTankHeal.indexOf(characterToRemove);
		//if (tankHealerToRemove >= 0) {
		//	arrayTankHeal.splice(tankHealerToRemove, 1);
		//}


		//		if (arrayOfDPS.length <= 3) {
		// If there are just 3 names in the DPS list, just use it.
		//			okToAdd = true;
		//		} else if (arrayOfDPS.length > 3 && tankDPSCheck === -1 ) {
		// If there are more than 3 names
		//		}


		//	} else {
		//		selectedDPSOne = "[Pug This Slot]";
		//		okToAdd = true;
		//	}


		//} while (okToAdd === true);
		//removeFromLists(selectedDPSOne);

		if (arrayPriorityDPS.length > 0) {
			selectedDPSOne = arrayPriorityDPS[getRandomInt(arrayPriorityDPS.length)];
			removeFromLists(selectedDPSOne);
			selectedDPSOne = "(&)" + selectedDPSOne;
		} else {
			selectedDPSOne = arrayOfDPS[getRandomInt(arrayOfDPS.length)];
			if (selectedDPSOne == null) {
				selectedDPSOne = "[PUG this spot]";
			} else {
				removeFromLists(selectedDPSOne);
			}
		}
		// while arrayOfTanks & arrayOfHealers >= 1 & selectedDPSOne is in either array, keep looking for alternate options, unless arrayOfDPS is = 3.
		//console.log("DPS1: " + selectedDPSOne);

		if (arrayPriorityDPS.length > 0) {
			selectedDPSTwo = arrayPriorityDPS[getRandomInt(arrayPriorityDPS.length)];
			removeFromLists(selectedDPSTwo);
			selectedDPSTwo = "(&)" + selectedDPSTwo;
		} else {
			selectedDPSTwo = arrayOfDPS[getRandomInt(arrayOfDPS.length)];
			if (selectedDPSTwo == null) {
				selectedDPSTwo = "[PUG this spot]";
			} else {
				removeFromLists(selectedDPSTwo);
			}
		}
		// Same
		//console.log("DPS2: " + selectedDPSTwo);

		if (arrayPriorityDPS.length > 0) {
			selectedDPSThree = arrayPriorityDPS[getRandomInt(arrayPriorityDPS.length)];
			removeFromLists(selectedDPSThree);
			selectedDPSThree = "(&)" + selectedDPSThree;
		} else {
			selectedDPSThree = arrayOfDPS[getRandomInt(arrayOfDPS.length)];
			if (selectedDPSThree == null) {
				selectedDPSThree = "[PUG this spot]";
			} else {
				removeFromLists(selectedDPSThree);
			}
		}
		// Same
		//console.log("DPS3: " + selectedDPSThree);




		document.getElementById("result_div").style.display = "block";
		document.getElementById("result_box").innerHTML = document.getElementById("result_box").innerHTML + "<p><strong>Group " + groupCounter + "</strong><br>Tank: " + selectedTank + "<br>Healer: " + selectedHealer + "<br>DPS: " + selectedDPSOne + ", " + selectedDPSTwo + ", " + selectedDPSThree + "</p>";

		groupCounter++;
	} // End While


	if (arrayOfTanks.length > 0 || arrayOfHealers.length > 0 || arrayOfDPS.length > 0) {
		// Output the remaining people.
		var remainingPlayers = "<p><strong>Players without a group:</strong><br>";

		if (arrayOfTanks.length > 0) {
			remainingPlayers = remainingPlayers + "Remaining Tanks: " + arrayOfTanks + "<br>";
		}

		if (arrayOfHealers.length > 0) {
			remainingPlayers = remainingPlayers + "Remaining Healers: " + arrayOfHealers + "<br>";
		}

		if (arrayOfDPS.length > 0) {
			remainingPlayers = remainingPlayers + "Remaining DPS: " + arrayOfDPS;
		}

		remainingPlayers = remainingPlayers + "</p>";

		document.getElementById("result_box").innerHTML = document.getElementById("result_box").innerHTML + remainingPlayers;
	}


	console.log("---------------");
	console.log("** Remaining Tanks: " + arrayOfTanks);
	console.log("** Remaining Healers: " + arrayOfHealers);
	console.log("** Remaining DPS: " + arrayOfDPS);
	console.log("---------------");
	console.log("** Remaining Priority Tank array: " + arrayPriorityTanks);
	console.log("** Remaining Priority Healer array: " + arrayPriorityHealers);
	console.log("** Remaining Priority DPS array: " + arrayPriorityDPS);
	console.log("---------------");
	console.log("** Tank and Healer array: " + arrayTankHeal);
	console.log("** Tank and DPS list: " + arrayTankDPS);
	console.log("** Healer and DPS list: " + arrayHealDPS);
	console.log("** Tank, Healer, and DPS list: " + arrayTankHealDPS);

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
	//console.log("Adding user " + userCount);

	var table = document.getElementById('user-list-body');

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
	cell1.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-priority"></input>';

	var cell2 = row.insertCell(1);
	cell2.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-active" checked></input>';

	var cell3 = row.insertCell(2);
	cell3.innerHTML = '<input class="form-control" id="user' + userCount + '"></input>';

	var cell4 = row.insertCell(3);
	cell4.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-tank"></input>';

	var cell5 = row.insertCell(4);
	cell5.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-healer"></input>';

	var cell6 = row.insertCell(5);
	cell6.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="user' + userCount + '-dps"></input>';

	var cell7 = row.insertCell(6);
	cell7.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteUser(this);">Delete</button>';

	userCount++;
}

// Delete the selected user.
function deleteUser(row) {
	var i = row.parentNode.parentNode.rowIndex;
	document.getElementById('user-list').deleteRow(i);
}

// Remove all Priority checkmarks.
function clearPriority() {
	//console.log("Removing all priorities.");

	var rowCount = document.getElementById("user-list-body").rows.length;
	//console.log("Counted Rows: " + rowCount);

	for (let step = 0; step < rowCount; step++) {
		var id_to_process = document.getElementById("user-list-body").rows[step].cells[0].getElementsByTagName("input")[0].id;

		document.getElementById(id_to_process).checked = false;
	}
}
