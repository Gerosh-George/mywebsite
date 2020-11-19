console.log("Hey! Have a great day😄");

window.addEventListener("load", function () {
	const loader = document.querySelector(".loader");
	loader.className += " hidden";
});

document.addEventListener("DOMContentLoaded", init);

var currentPageIndex = 0;

const typewriter = function (txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.wait = parseInt(wait);
	this.txt = "";
	this.wordIndex = 0;
	this.type();
	this.isDeleting = false;
};

typewriter.prototype.type = function () {
	const index = this.wordIndex % this.words.length;
	const currentWord = this.words[index];

	if (this.isDeleting) {
		this.txt = currentWord.substring(0, this.txt.length - 1);
	} else {
		this.txt = currentWord.substring(0, this.txt.length + 1);
	}

	this.txtElement.innerHTML = `<span class="cursor">${this.txt}</span>`;

	//Initial Type Speed
	let typespeed = 200;

	//varying the speed
	if (this.isDeleting) {
		typespeed = 50;
	}

	//check is word is complete
	if (this.txt === currentWord && !this.isDeleting) {
		typespeed = this.wait;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === "") {
		this.isDeleting = false;
		this.wordIndex++;
		typespeed = 500;
	}

	setTimeout(() => this.type(), typespeed);
};

function init() {
	const txtElement = document.querySelector(".typing");
	const words = JSON.parse(txtElement.getAttribute("data-words"));
	const wait = txtElement.getAttribute("data-wait");

	new typewriter(txtElement, words, wait);

	aboutbtn = document.querySelector(".about-button a");
	aboutbtn.addEventListener("click", aboutChange);

	callGithub();
}

function callGithub() {
	var ReqObj = new XMLHttpRequest();
	ReqObj.open("GET", "https://api.github.com/users/Gerosh-George/repos");
	ReqObj.onload = function () {
		var data = JSON.parse(ReqObj.responseText);
		loadproj(data);
	};
	ReqObj.send();
}

function aboutChange(event) {
	const navlinks = document.querySelectorAll(".link");
	id = event.target.getAttribute("href");

	navlinks.forEach((link, index) => {
		if (link.getAttribute("href") === id) {
			link.classList += " active";
			displaySection(link.getAttribute("href"), index);
		} else {
			link.classList.remove("active");
		}
	});
}

function change(event) {
	event.classList.toggle("change");
	const container = document.querySelector(".nav-container");
	const navbar = document.querySelector(".nav-links");

	if (navbar.style.display === "flex") {
		container.style.width = `50px`;
		container.style.height = `50px`;
		navbar.style.display = `none`;
		container.style.background = `transparent`;
		container.style.top = `6%`;
		container.style.left = `3%`;
	} else if (window.innerWidth > 576) {
		container.style.width = `100px`;
		container.style.height = `350px`;
		navbar.style.display = `flex`;
	} else {
		container.style.width = `100vw`;
		container.style.height = `100vh`;
		navbar.style.display = `flex`;
		container.style.background = `#4b4343`;
		container.style.top = 0;
		container.style.left = 0;
		event.style.marginTop = `4%`;
	}

	const navlinks = document.querySelectorAll(".nav-links li");

	navlinks.forEach((link) => {
		if (link.style.animation === "navLinkFade .8s ease forwards") {
			link.style.animation = "";
		} else {
			link.style.animation = `navLinkFade .8s ease-in forwards`;
			link.addEventListener("click", activeChange);
		}
	});
}

function activeChange(event) {
	const updatelink = event.target;
	const navlinks = document.querySelectorAll(".link");
	navlinks.forEach((link, index) => {
		link.classList.remove("active");
		if (link === updatelink)
			displaySection(updatelink.getAttribute("href"), index);
	});

	updatelink.classList += " active";
	change(document.querySelector(".burger"));
}

function displaySection(id, index) {
	const pages = document.querySelectorAll("section");
	const currentPage = pages[currentPageIndex];

	const nextPage = document.querySelector(id);

	currentPage.classList.remove("active");
	//currentPage.style.display=`none`

	// nextPage.style.display=`block`
	nextPage.classList += " active";

	currentPageIndex = index;
}

function loadproj(data) {
	let count = 0;

	var port_cont = document.querySelector(".portfolio-container");
	port_cont.innerHTML = "";
	//var row = port_cont.querySelector(".row");
	var row = `<div class="row">`;
	data.forEach((project, index) => {
		if (
			project.fork == false &&
			project.name != "mywebsite" &&
			count < 12 &&
			project.description != null
		) {
			count++;
			row += `<div class="col-sm-6">
	<div class="card border-primary mb-3 card-p">
	  <div class="card-body">
		<h5 class="card-title text-center">${project.name}</h5>
		<p class="card-text p-text">${project.description}</p>
		<p class="card-text text-right p-text">Language: ${project.language}</p>
		<a href="${project.html_url}" target="_blank" class="btn btn-primary">View Code</a>
	  </div>
	 </div>
	</div>`;
		}

		if (
			count % 2 == 0 &&
			row != '<div class="row">' &&
			window.innerWidth > 1000
		) {
			row += `</div>`;
			port_cont.innerHTML += row;
			row = `<div class="row">`;
		} else if (row != '<div class="row">' && window.innerWidth < 1000) {
			row += `</div>`;
			port_cont.innerHTML += row;
			row = `<div class="row">`;
		}

		if (count == 12) {
			row = "";
		}
	});

	if (row != '<div class="row">') {
		row += `</div>`;
		port_cont.innerHTML += row;
	}
}

window.addEventListener("resize", changeProjLayout);

function changeProjLayout() {
	callGithub();
}
