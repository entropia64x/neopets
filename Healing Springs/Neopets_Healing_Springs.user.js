// ==UserScript==
// @name        Neopets Healing Springs
// @namespace   https://github.com/entropia64x/
// @icon        https://www.neopets.com/favicon.ico
// @version     1.0.0
//
// @match       *://www.neopets.com/faerieland/springs.phtml*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @author      entropia64x
// @description Select 'Heal my pets' and buys Healing Potion XX each 30 minutes
// ==/UserScript==

(function () {
  'use strict';

  function getForm(forms) {
    for (let form of forms) {
      if (form?.method == 'post') {
        return form;
      }
    }

    return false;
  }

  function getPotionLink(links) {
    for (let link of links) {
      if (link.textContent.includes('Healing Potion XX(')) {
        return link;
      }
    }

    return false;
  }

  function go(url = '') {
    url = `springs.phtml${url}`;
    location.href = url;
  }

  function reload() {
    GM_setValue('petsHealed', false);
    GM_setValue('potionBought', false);
    go();
  }

  const form = getForm(document.forms);
  const petsHealed = GM_getValue('petsHealed', false);
  const potionBought = GM_getValue('potionBought', false);

  if (form) {
    if(!petsHealed) {
      form.submit();
      GM_setValue('petsHealed', true);
      return;
    }

    const link = getPotionLink(document.links);
    GM_setValue('potionBought', true);

    if (link) {
      link.click();
      return;
    }
  }

  const button = document.querySelector('button');

  if (button) {
    if (!potionBought) {
      go();
      return;
    }
  }

  setTimeout(reload, 1000*60*30 + 1000);
})();
