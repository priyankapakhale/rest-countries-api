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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/details.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/details.js":
/*!************************!*\
  !*** ./src/details.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const queryString = decodeURIComponent(window.location.search);\nconst {countryName, alpha2Code} = JSON.parse(queryString.split(\"=\")[1])\n\nfunction setCountryDetails(country) {\n    const flag = document.querySelector('#flag')\n    const name = document.querySelector('#name')\n\n    const nativaName = document.querySelector('#native-name')\n    const population = document.querySelector('#population')\n    const region = document.querySelector('#region')\n    const subregion = document.querySelector('#sub-region')\n    const capital = document.querySelector('#capital')\n\n    const topLevelDomain = document.querySelector('#top-level-domain')\n    const currencies = document.querySelector('#currencies')\n    const languages = document.querySelector('#languages')\n\n    const borderCountries = document.querySelector(\"#border-countries\")\n\n    flag.src = country.flag\n    name.innerHTML = country.name\n\n    nativaName.innerHTML = `Native Name: ${country.nativeName}`\n    population.innerHTML = `Population: ${country.population}`\n    region.innerHTML = `Region: ${country.region}`\n    subregion.innerHTML = `Sub Region: ${country.subregion}`\n    capital.innerHTML = `Capital: ${country.capital}`\n\n    topLevelDomain.innerHTML = `Top Level Domain: ${country.topLevelDomain.join(' ')}`\n    let curr = []\n    country.currencies.forEach(currency => {\n        curr.push(currency.name)\n    })\n    currencies.innerHTML = `Currencies: ${curr.join(', ')}`\n    lang = []\n    country.languages.forEach(language => {\n        lang.push(language.name)\n    })\n    languages.innerHTML = `Langugages: ${lang.join(', ')}`\n\n    const borderCountryCodes = country.borders\n    if(borderCountryCodes.length === 0) {\n        const p = document.createElement(\"p\")\n        p.className = \"col-auto\"\n        p.innerHTML = \"None\"\n        borderCountries.appendChild(p)\n    }\n    borderCountryCodes.forEach(code => {\n        fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)\n        .then(res => res.json())\n        .then(data => {\n            const {name, alpha2Code} = data\n            \n            const p = document.createElement(\"p\")\n            p.className = \"col-auto\"\n            p.innerHTML = name\n            p.id=\"border-country\"\n            borderCountries.appendChild(p)\n        })\n        .catch(err => console.log(err))\n    })\n}\n \nfunction fetchCountryDetails() {\n    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)\n    .then(res => res.json())\n    .then(data => {\n        const country = data.filter(c => c.alpha2Code === alpha2Code)[0]\n        console.log(country)\n        setCountryDetails(country)\n    })\n    .catch(err => console.log(err))\n}\n\n\n\nfetchCountryDetails()\n\n//# sourceURL=webpack:///./src/details.js?");

/***/ })

/******/ });