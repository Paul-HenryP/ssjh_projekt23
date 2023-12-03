	let deleteMode = false;

	// Load buttons from localStorage when the page loads
	document.addEventListener("DOMContentLoaded", function() {
		loadButtons();

	});

	function createButton() {
		var btnText = prompt("Enter button text:");
		if (!btnText) {return}
		var btnLink = prompt("Enter button link:");
		if (!btnLink) {return}

		var button = document.createElement("a");
		button.setAttribute("href", btnLink);
		button.textContent = btnText;
		button.classList.add("button");

		document.getElementById("button-container").appendChild(button);

		// Save button data to localStorage
		saveButton(btnText, btnLink);
	}

	function changeColorAndEnableDelete() {
		var buttons = document.querySelectorAll("#button-container a");
		if (deleteMode) {
			deleteMode = false;
			buttons.forEach(function (btn) {
				btn.classList.remove("deleteMe");
			});
			return
		}
		deleteMode = true; // Enable delete mode
		buttons.forEach(function (btn) {
			btn.classList.add("deleteMe");
		});


		// console.log(buttons);
		buttons.forEach(function (btn) {

			console.log(btn);
			btn.addEventListener("click", function () {
				console.log("button was clicked");
				if (deleteMode) {
					console.log("delete mode is on");

					event.preventDefault(); // Prevent link behavior
					console.log(this.text);
					this.remove();
					updateButtons(this.text); // Update the stored buttons after deletion
				};
			})
			console.log(btn)
		});
	}

	function saveButton(text, link) {
		var buttons = JSON.parse(localStorage.getItem("buttons")) || [];
        console.log(buttons)
		buttons.push({text: text, link: link});
		localStorage.setItem("buttons", JSON.stringify(buttons));
	}

	function updateButtons(buttonText) {
		var buttons = JSON.parse(localStorage.getItem("buttons")) || [];

		// Find the index of the button with the specified text
		var indexToRemove = buttons.findIndex(function (btn) {
			return btn.text === buttonText;
		});

		if (indexToRemove !== -1) {
			buttons.splice(indexToRemove, 1); // Remove the button data
			localStorage.setItem("buttons", JSON.stringify(buttons)); // Update localStorage
		}
	}

	function loadButtons() {
		var buttons = JSON.parse(localStorage.getItem("buttons")) || [];

		buttons.forEach(function (btn) {
			var button = document.createElement("a");
			button.setAttribute("href", btn.link);
			button.textContent = btn.text;

			// Add the "button" class to the newly created button
			button.classList.add("button");

			document.getElementById("button-container").appendChild(button);
		});
	}