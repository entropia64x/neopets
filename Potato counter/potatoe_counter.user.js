// ==UserScript==
// @name        Potato Counter
// @namespace   https://github.com/entropia64x/
// @icon
// @version     1.0.0
// @match       *://www.neopets.com/medieval/potatocounter.phtml*
// @grant       none
// @author      entropia64x
// @description Autofills potatocounter and submits three times.
// @include     https://www.neopets.com/medieval/potatocounter.phtml*
// ==/UserScript==

(function () {
  'use strict'

  const content = document.querySelector('.content');
  const form = content.querySelector('form');

  if (form[0].value == 'Play Again' || form[0].value == 'Back to Meridell') {
    form.submit();
    return;
  }

  const images = content.querySelectorAll('img');

  function countPotatoes() {
    let potatoes = 0;

    for (let img of images) {
      if (img.src.indexOf('potato') > 0) {
        potatoes++;
      }
    }

    return potatoes - 1;
  }

  form['guess'].value = countPotatoes();
  form.submit();

})();
