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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelectorAll('.btn');
  const modal = document.querySelector('.modal');
  const close = document.querySelector('.modal__wrapper-close');

  //modal
  btn.forEach(button => {
    if (!button.classList.contains('modal__btn')) {
      button.addEventListener('click', () => {
        showModal();
      });
    }
  });
  close.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('modal_active')) {
      closeModal();
    }
  });
  function showModal() {
    modal.classList.add('modal_active');
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', e => {
      if (e.target.classList.contains('modal_active')) {
        closeModal();
      }
    });
  }
  function closeModal() {
    modal.classList.remove('modal_active');
    document.body.style.overflow = '';
    contForm.classList.remove('modal__info_inactive');
    modalInfo.classList.add('modal__info_inactive');
  }

  //form
  const contForm = document.querySelector('.modal__form');
  const modalInfo = document.querySelector('.modal__info');
  const modalInfoBtn = document.querySelector('.modal__btn');
  const input = document.querySelectorAll('.modal__form input');
  const postDate = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    return await res.text();
  };
  input.forEach((item, i) => {
    item.addEventListener('input', e => {
      if (input[i].name == 'phone') {
        let message = document.querySelector('.modal__notification');
        if (!/[0-9]/g.test(e.data)) {
          input[i].style.borderColor = 'red';
          message.style.display = 'block';
        } else {
          input[i].textContent = '';
          input[i].style.borderColor = '';
          message.style.display = '';
        }
        input[i].value = input[i].value.replace(/\D/, "");
      }
    });
  });
  const clearInputs = () => {
    input.forEach(item => {
      item.value = '';
    });
  };
  contForm.addEventListener('submit', e => {
    e.preventDefault();
    contForm.classList.add('modal__info_inactive');
    modalInfo.classList.remove('modal__info_inactive');
    const formData = new FormData(contForm);
    postDate('server.php', formData).then(res => {}).catch(() => {
      let error = new Error();
    }).finally(() => {
      clearInputs();
      setTimeout(() => {
        closeModal();
      }, 5000);
    });
  });
  modalInfoBtn.addEventListener('click', closeModal);

  //servicesItems
  const servicesItem = document.querySelectorAll('.services__item');
  const servicesText = document.querySelectorAll('.services__text');
  const mQuery = window.matchMedia('(max-width: 577px)');
  const screenWidth = window.visualViewport.width;
  let block = document.createElement('div');
  block.classList.add('services__item-ar');
  if (screenWidth > 576) {
    servicesItem[0].append(block);
  } else {
    servicesText[0].classList.add('services__text_hidden');
  }
  mQuery.addEventListener('change', () => {
    if (mQuery.matches) {
      block.classList.remove('services__item-ar');
      servicesText.forEach(item => {
        item.classList.add('services__text_hidden');
      });
    } else {
      servicesItem[0].append(block);
      block.classList.add('services__item-ar');
      servicesText.forEach(item => {
        item.classList.add('services__text_hidden');
      });
    }
  });
  console.log(servicesItem);
  servicesItem.forEach((item, i) => {
    item.addEventListener('click', e => {
      let elem = e.target;
      if (e.target.tagName === 'IMG') {
        elem.offsetParent.append(block);
      } else {
        elem.append(block);
      }
      servicesText.forEach(item => {
        item.classList.add('services__text_hidden');
      });
      servicesText[i].classList.remove('services__text_hidden');
      if (mQuery.matches) {
        block.remove();
        let addContent = servicesText[i];
        servicesItem[i].after(addContent);
      }
      ;
    });
  });

  //slider feedback

  const reviewsItem = document.querySelectorAll('.reviews__item');
  const next = document.querySelector('.reviews__next');
  const back = document.querySelector('.reviews__back');
  let coun = 0;
  const reviewsCircles = document.querySelector('.reviews__circles');
  for (let i = 0; i < reviewsItem.length; i++) {
    const div = document.createElement('div');
    div.classList.add('reviews__circle');
    reviewsCircles.append(div);
  }
  const circles = reviewsCircles.children;
  circles[0].classList.add('reviews__circles_activ');
  function sliderNext() {
    reviewsItem.forEach((item, i) => {
      item.classList.add('reviews__item_display');
    });
    for (let i = 0; i < circles.length; i++) {
      circles[i].classList.remove('reviews__circles_activ');
    }
    if (coun < reviewsItem.length - 1) {
      coun++;
      reviewsItem[coun].classList.remove('reviews__item_display');
      circles[coun].classList.add('reviews__circles_activ');
    } else {
      reviewsItem[0].classList.remove('reviews__item_display');
      circles[0].classList.add('reviews__circles_activ');
      coun = 0;
    }
    ;
  }
  function sliderBack() {
    reviewsItem.forEach((item, i) => {
      item.classList.add('reviews__item_display');
    });
    for (let i = 0; i < circles.length; i++) {
      circles[i].classList.remove('reviews__circles_activ');
    }
    if (coun <= 0) {
      reviewsItem[reviewsItem.length - 1].classList.remove('reviews__item_display');
      circles[reviewsItem.length - 1].classList.add('reviews__circles_activ');
      coun = reviewsItem.length - 1;
    } else {
      coun--;
      reviewsItem[coun].classList.remove('reviews__item_display');
      circles[coun].classList.add('reviews__circles_activ');
    }
  }
  next.addEventListener('click', () => {
    sliderNext();
  });
  back.addEventListener('click', () => {
    sliderBack();
  });

  //slider swipe
  const reviewsWrapper = document.querySelector('.reviews__wrapper');
  let touchStr;
  reviewsWrapper.addEventListener('touchstart', e => {
    touchStr = e.changedTouches[0].screenX;
  });
  reviewsWrapper.addEventListener('touchend', e => {
    let toucheEnd = e.changedTouches[0].screenX;
    if (toucheEnd < touchStr - 100) {
      sliderNext();
    }
    if (toucheEnd > touchStr + 100) {
      sliderBack();
    }
  });
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map