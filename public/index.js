/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const row = document.querySelector(\"#countries\")\nconst search = document.querySelector('#search')\nconst dropdown = document.querySelectorAll('.dropdown-item')\n\nfunction showDetails(country) {\n    const {name, alpha2Code} = country\n    const query = {countryName: name, alpha2Code}\n    location.href = \"./details.html?country=\"+JSON.stringify(query)\n}\n\nfunction formatted(a) {\n    let population = ''\n    let quotient = Math.floor(a/1000)\n    let rem = a%1000\n    while(a !== 0) {\n        if(rem === 0)\n            rem = '000'\n        population = ','+rem + population\n        a = quotient\n        quotient = Math.floor(a/1000)\n        rem = a%1000\n    }\n\n    population = population.substring(1,population.length)\n    return population\n}\n\nfunction createAndAddCountry(country) {\n    const {name, capital, population, flag, region} = country\n    const col = document.createElement(\"div\")\n    col.className = \"col-lg-3 col-sm-12 pr-5 mb-5\"\n\n    const card = document.createElement(\"div\")\n    card.classList.add(\"card\")\n    \n    const img = document.createElement(\"img\")\n    img.className=\"card-img-top\"\n    img.src = flag\n\n    const cardBody = document.createElement(\"div\")\n    cardBody.classList.add(\"card-body\")\n\n    const h5 = document.createElement(\"h5\")\n    h5.classList.add(\"card-title\")\n    h5.innerHTML = name\n\n    const div = document.createElement(\"div\")\n    div.classList.add(\"pb-3\")\n    div.innerHTML = `<p class=\"my-0\">Population: ${formatted(population)}</p><p class=\"my-0\">Region: ${region}</p><p class=\"my-0\">Capital: ${capital}</p>`\n\n    cardBody.appendChild(h5)\n    cardBody.appendChild(div)\n    card.appendChild(img)\n    card.appendChild(cardBody)\n    col.appendChild(card)\n    row.appendChild(col)\n\n    card.addEventListener(\"click\", () => {\n        showDetails(country)\n    })\n}\n\nfunction fetchAllCountries() {\n    fetch(\"https://restcountries.eu/rest/v2/all\")\n    .then(res => res.json())\n    .then(data => {\n        \n        data.forEach(country => {\n            createAndAddCountry(country)  \n        })\n    })\n    .catch(err => console.log(err))\n}\n\nfetchAllCountries()\n\nfunction updateCountries(countries) {\n    var child = row.lastElementChild;  \n    while (child) { \n        row.removeChild(child); \n        child = row.lastElementChild; \n    } \n    \n    countries.forEach(country => {\n        createAndAddCountry(country)\n    })\n}\n\nsearch.addEventListener(\"input\", (e) => {\n    const countryName = e.target.value\n    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)\n    .then(res => res.json())\n    .then(data => {\n        updateCountries(data)\n    })\n    .catch(err => console.log(err))\n})\n\n\ndropdown.forEach(item => {\n    item.addEventListener(\"click\", (e) => {\n        let region = e.target.innerHTML\n        if(region === 'America')\n            region = 'Americas'\n\n        fetch(`https://restcountries.eu/rest/v2/region/${region}`)\n        .then(res => res.json())\n        .then(data => {\n            updateCountries(data)\n        })\n        .catch(err => console.log(err))\n    })\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });