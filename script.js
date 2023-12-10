let deleteMode = false;

// Laadi nupud localStorage'ist, kui leht laaditakse
document.addEventListener("DOMContentLoaded", function() {
	loadButtons();
});
// Reset search field value on page load
window.onload = function() {
    var searchField = document.getElementById("searchBox");
    searchField.value = "";
    searchField.focus();
};


function createButton() {
	var btnText = prompt("Sisestage nupu tekst:");
	if (!btnText) { return; }
	var btnLink = prompt("Sisestage nupu link:");
	if (!btnLink) { return; }

	var button = document.createElement("a");
	button.setAttribute("href", btnLink);
	button.textContent = btnText;
	button.classList.add("button");

	document.getElementById("button-container").appendChild(button);

	// Salvesta nupu andmed localStorage'i
	saveButton(btnText, btnLink);
}

function changeColorAndEnableDelete() {
	var buttons = document.querySelectorAll("#button-container a");
	var deletebutton = document.querySelector("#delete");

	if (deleteMode) {
	    deletebutton.classList.remove("deletepressed");
		buttons.forEach(function(btn) {
			btn.classList.remove("deleteMe");
		});
		deleteMode = false;
		return;
	}
	deletebutton.classList.add("deletepressed");

	buttons.forEach(function(btn) {
		btn.classList.add("deleteMe");
	});

	// Aktiveeri kustutamise funktsioon
	buttons.forEach(function(btn) {
		btn.addEventListener("click", function() {
			if (deleteMode) {
				event.preventDefault(); // Väldi lingi käitumist
				this.remove();
				updateButtons(this.text); // Uuenda nuppude andmeid pärast kustutamist
			};
		});
	});
	deleteMode = true; // Luba kustutamise režiim
}

function saveButton(text, link) {
	var buttons = JSON.parse(localStorage.getItem("buttons")) || [];
	buttons.push({ text: text, link: link });
	localStorage.setItem("buttons", JSON.stringify(buttons));
}

function updateButtons(buttonText) {
	var buttons = JSON.parse(localStorage.getItem("buttons")) || [];

	// Leia indeks tekstiga nupust
	var indexToRemove = buttons.findIndex(function(btn) {
		return btn.text === buttonText;
	});

	if (indexToRemove !== -1) {
		buttons.splice(indexToRemove, 1); // Eemalda nupu andmed
		localStorage.setItem("buttons", JSON.stringify(buttons)); // Uuenda localStorage'i
	}
}
var defaultButtons = [];

defaultButtons.push({
    text: "YouTube 📺",
    link: "https://youtube.com"
});

defaultButtons.push({
    text: "LinkedIn 🔗",
    link: "https://linkedin.com"
});

defaultButtons.push({
    text: "DuckDuckGo 🔍",
    link: "https://duckduckgo.com"
});

defaultButtons.push({
    text: "GitHub 💻",
    link: "https://github.com"
});

defaultButtons.push({
    text: "Codecademy 💡",
    link: "https://www.codecademy.com/"
});

defaultButtons.push({
    text: "W3Schools 🖥️",
    link: "https://www.w3schools.com/"
});

defaultButtons.push({
    text: "Coursera 🎓",
    link: "https://www.coursera.org/"
});

defaultButtons.push({
    text: "Wolfram Alpha 🧮",
    link: "https://www.wolframalpha.com/"
});

defaultButtons.push({
    text: "LeetCode 💻",
    link: "https://leetcode.com/"
});


function loadButtons() {
	var buttons = JSON.parse(localStorage.getItem("buttons")) || [];

	// default nupud, kui web page esimest korda või tühjana laeb
	if (buttons.length === 0) {
		buttons = defaultButtons;
		buttons.forEach(function(btn) {
			saveButton(btn.text, btn.link);
		})
	};

	buttons.forEach(function(btn) {
		var button = document.createElement("a");
		button.setAttribute("href", btn.link);
		button.textContent = btn.text;

		// Lisa "button" klass loodud nupule
		button.classList.add("button");

		// Create an element for the Font Awesome icon
		var icon = document.createElement("i");
		icon.classList.add("fas", btn.icon); // Assuming Font Awesome icons are in "fas" category

		// Append the icon to the button's text
		button.appendChild(icon);

		document.getElementById("button-container").appendChild(button);
	});
}
// Function to filter and display buttons based on search input
function filterButtons() {
    var searchInput = document.getElementById("searchBox").value.toLowerCase();
    var buttons = document.querySelectorAll("#button-container a");

	buttons.forEach(function(btn) {
        var buttonText = btn.textContent.toLowerCase();
        if (buttonText.includes(searchInput)) {
            btn.classList.remove("hide"); // Remove hide class
        } else {
            btn.classList.add("hide"); // Add hide class
        }
    });}

// Attach an event listener to the search box input event
document.getElementById("searchBox").addEventListener("input", filterButtons);

// function filterButtons() {
//     var searchInput = document.getElementById("searchBox").value.toLowerCase();
//     var visibleButtons = document.querySelectorAll("#button-container a:not(.hide)");
//
//     visibleButtons.forEach(function(btn) {
//         var buttonText = btn.textContent.toLowerCase();
//         if (buttonText.includes(searchInput)) {
//             btn.classList.remove("hide"); // Remove hide class
//         } else {
//             btn.classList.add("hide"); // Add hide class
//         }
//     });
// }

// Event listener for 'Enter' key press in the search box
document.getElementById("searchBox").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        var visibleButtons = document.querySelectorAll("#button-container a:not(.hide)");
        if (visibleButtons.length === 1) {
            var link = visibleButtons[0].getAttribute("href");
	    window.location.href = link;
            // window.open(link, "_blank");
        }
    }
});



// Uudised (laadija - üldine.js )
function loadSocialMediaFeeds() {
    //Fb
    document.getElementById('facebookFeed').innerHTML = '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftartuylikool%2F&tabs=timeline&width=300&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="100%" height="100%" style="border:none;overflow:hidden" scrolling="yes" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>';
    // Insta
    document.getElementById('instagramFeed').innerHTML = '<iframe src="https://www.instagram.com/unitartu/embed/" width="320" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>';
}

