/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: landing Js File
*/


(function () {
	("use strict");

	/**s
	 *  global variables
	 */

	var default_lang = "pt-br"; // set Default Language
	var language = localStorage.getItem("language");

	function initLanguage() {
		// Set new language
		(language === null) ? setLanguage(default_lang) : setLanguage(language);
		var languages = document.getElementsByClassName("language");
		languages && Array.from(languages).forEach(function (dropdown) {
            dropdown.addEventListener("click", function (event) {
                console.log("Language dropdown clicked. Language:", dropdown.getAttribute("data-lang")); // Debug statement
                setLanguage(dropdown.getAttribute("data-lang"));
            });
        });
	}

	function setLanguage(lang) {
        console.log("Setting language to:", lang); // Debug statement

		if (document.getElementById("header-lang-img")) {
			if (lang == "en") {
				document.getElementById("header-lang-img").src = "/static/images/flags/us.svg";
			} else if (lang == "pt-br") {
				document.getElementById("header-lang-img").src = "/static/images/flags/br.svg";
			} else if (lang == "sp") {
				document.getElementById("header-lang-img").src = "/static/images/flags/spain.svg";
			} else if (lang == "gr") {
				document.getElementById("header-lang-img").src = "/static/images/flags/germany.svg";
			} else if (lang == "it") {
				document.getElementById("header-lang-img").src = "/static/images/flags/italy.svg";
			} else if (lang == "ru") {
				document.getElementById("header-lang-img").src = "/static/images/flags/russia.svg";
			} else if (lang == "ch") {
				document.getElementById("header-lang-img").src = "/static/images/flags/china.svg";
			} else if (lang == "fr") {
				document.getElementById("header-lang-img").src = "/static/images/flags/french.svg";
			} else if (lang == "ar") {
				document.getElementById("header-lang-img").src = "/static/images/flags/ae.svg";
			}
			localStorage.setItem("language", lang);
			language = localStorage.getItem("language");
			window.getLanguage();
		}
        var img2 = document.getElementById("img-2-id");
        if (img2) {
            if (lang == "en") {
                img2.src = "/static/images/landing/features/img-2-en.png";
            } else if (lang == "pt-br") {
                img2.src = "/static/images/landing/features/img-2-pt-br.png";
            }
            // Add conditions for other languages if needed
        }
        // Update the second image
        var img4 = document.getElementById("img-4-id");
        if (img4) {
            if (lang == "en") {
                img4.src = "/static/images/landing/features/img-4-en.png";
            } else if (lang == "pt-br") {
                img4.src = "/static/images/landing/features/img-4-pt-br.png";
            }
            // Add conditions for other languages if needed
        }
        var logolightfull = document.getElementById("logolightfull-id");
        if (logolightfull) {
            if (lang == "en") {
                logolightfull.src = "/static/images/logo-light-full-en.png";
            } else if (lang == "pt-br") {
                logolightfull.src = "/static/images/logo-light-full-pt-br.png";
            }
            // Add conditions for other languages if needed
        }
	}

	// Multi language setting
	window.getLanguage = function () {
		console.log("getLanguage called");
		language == null ? setLanguage(default_lang) : false;
		console.log("Current language: " + language); // Add this line
		console.log("Requesting language file from: /static/lang/" + language + ".json"); // Add this line
		var request = new XMLHttpRequest();
		// Instantiating the request object
		request.open("GET", "/static/lang/" + language + ".json");
		// Defining event listener for readystatechange event
		request.onreadystatechange = function () {
			// Check if the request is compete and was successful
			if (this.readyState === 4 && this.status === 200) {
				var data = JSON.parse(this.responseText);
				console.log("Loaded language data:", data); // Add this line
				Object.keys(data).forEach(function (key) {
					console.log("Translating elements for key:", key, elements); // Add this line

					var elements = document.querySelectorAll("[data-key='" + key + "']");
					Array.from(elements).forEach(function (elem) {
						elem.textContent = data[key];
					});
				});
			}
		};
		// Sending the request to the server
		request.send();
	}
    function init() {

		initLanguage();
		window.getLanguage();

	}
    document.addEventListener('DOMContentLoaded', function() {
        init();
    });
})();


// Collapse Menu
const navLinks = document.querySelectorAll('.nav-item');
const menuToggle = document.getElementById('navbarSupportedContent');
var bsCollapse = '';
if (navLinks && menuToggle) {
    window.addEventListener('load', function () {
        window.dispatchEvent(new Event('resize'));
    });
    window.addEventListener('resize', function () {
        var windowSize = document.documentElement.clientWidth;
        bsCollapse = new bootstrap.Collapse(menuToggle, {
            toggle: false
        });
        if (windowSize < 980) {
            Array.from(navLinks).forEach((link) => {
                link.addEventListener('click', () => {
                    toggleMenu();
                });
            });
        } else {
            toggleMenu();
        }
    });
}

function toggleMenu() {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 980) {
        bsCollapse.toggle();
    } else {
        bsCollapse = '';
    }
}

// trusted-client-slider
var swiper = new Swiper(".trusted-client-slider", {
    spaceBetween: 30,
    loop: 'true',
    slidesPerView: 1,
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
});

// pricing
function check() {
    var checkBox = document.getElementById("plan-switch");
    var month = document.getElementsByClassName("month");
    var annual = document.getElementsByClassName("annual");

    var i = 0;
    Array.from(month).forEach(function (mon) {
        if (checkBox.checked == true) {
            annual[i].style.display = "block";
            mon.style.display = "none";
        } else if (checkBox.checked == false) {
            annual[i].style.display = "none";
            mon.style.display = "block";
        }
        i ++;
    });
}
check();

// client-review-swiper
var swiper = new Swiper(".client-review-swiper", {
    loop: false,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        clickable: true,
        el: ".swiper-pagination",
    },
});

// counter-value
function counter() {
    var counter = document.querySelectorAll('.counter-value');
    if (counter) {
        var speed = 250; // The lower the slower
        counter && Array.from(counter).forEach(function (counter_value) {
            function updateCount() {
                var target = +counter_value.getAttribute('data-target');
                var count = +counter_value.innerText;
                var inc = target / speed;
                if (inc < 1) {
                    inc = 1;
                }
                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter_value
                    counter_value.innerText = (count + inc).toFixed(0);
                    // Call function every ms
                    setTimeout(updateCount, 1);
                } else {
                    counter_value.innerText = numberWithCommas(target);
                }
                numberWithCommas(counter_value.innerText);
            };
            updateCount();
        });

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
};
counter();


//
/********************* scroll top js ************************/
//

var mybutton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}