!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const s=Object.freeze({EXACT_MATCH:".",FOCUS_SEARCH:"f",CLEAR_SEARCH:"<",BASE_TOGGLE:"?",COMPOUND_TOGGLE:",",OTHER_TOGGLE:"_"});function o(e){if("string"!=typeof e)throw new Error("Value must be a string");switch(e){case"true":return!0;case"false":return!1;default:return!!e}}function c(e,t){const n=document.createEvent("HTMLEvents");n.initEvent(t,!1,!0),e.dispatchEvent(n)}function r(e){return e.replaceAll(s.EXACT_MATCH,"")}function i(e){return e.replaceAll(s.BASE_TOGGLE,"")}function a(e){return e.replaceAll(s.COMPOUND_TOGGLE,"")}function h(e){return e.replaceAll(s.OTHER_TOGGLE,"")}const l=Object.freeze({BASE:Symbol("base"),COMPOUND:Symbol("compound"),OTHER:Symbol("other")});class u{constructor(e){this._element=e,this.word=e.id,this.contents=this._getContent(e.innerText),this.type=this._getType(this.word)}_getType(e){return(t=e.substring(0,1))===t.toUpperCase()?l.OTHER:e.includes("-")?l.COMPOUND:l.BASE;var t}_getContent(e){let t=new Set;return e.split(/[^\w-]/).forEach((e=>t.add(e.toLowerCase()))),t.has("")&&t.delete(""),t}show(){this._element.style.display="block"}hide(){this._element.style.display="none"}is(...e){return e.includes(this.type)}}const d=new class{constructor(e){this._elements=e,this._initFromCache(),this.onChange((()=>this._updateCache()))}isExactMatchActive(){return this._elements.exactMatch.checked}isBaseActive(){return this._elements.base.checked}isCompoundActive(){return this._elements.compound.checked}isOtherActive(){return this._elements.other.checked}get elements(){return Object.entries(this._elements).map((e=>e[1]))}_initFromCache(){if(!this._isLocalStorageAvailable())return;const e=window.localStorage.getItem("exactMatch");null!==e&&(this._elements.exactMatch.checked=o(e));const t=window.localStorage.getItem("base");null!==t&&(this._elements.base.checked=o(t));const n=window.localStorage.getItem("compound");null!==n&&(this._elements.compound.checked=o(n));const s=window.localStorage.getItem("other");null!==s&&(this._elements.other.checked=o(s))}_updateCache(){if(this._isLocalStorageAvailable())for(const[e,t]of Object.entries(this._elements))window.localStorage.setItem(e,t.checked)}_isLocalStorageAvailable(){let e;try{e=window.localStorage;const t="__storage_test__";return e.setItem(t,t),e.removeItem(t),!0}catch(t){return t instanceof DOMException&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}}getActiveTypes(){let e=[];return this.isBaseActive()&&e.push(l.BASE),this.isCompoundActive()&&e.push(l.COMPOUND),this.isOtherActive()&&e.push(l.OTHER),e}onChange(e){Object.values(this._elements).forEach((t=>t.addEventListener("change",e)))}}({exactMatch:document.getElementById("exact-match-element"),base:document.getElementById("base-element"),compound:document.getElementById("compound-element"),other:document.getElementById("other-element")}),_=Array.from(document.querySelectorAll("p[class=word-container]")).map((e=>new u(e))),m=new class{constructor(e){this._words=e}search(e,t){e?this._words.forEach((n=>{if(!n.is(...t.getActiveTypes()))return n.hide();if(t.isExactMatchActive())return this._showOrHide(n,n.contents.has(e));for(const t of n.contents)if(t.includes(e))return n.show();n.hide()})):this.showAll(t)}showAll(e){this._words.forEach((t=>this._showOrHide(t,t.is(...e.getActiveTypes()))))}_showOrHide(e,t){t?e.show():e.hide()}}(_),E=document.getElementById("search"),p=()=>{return e=m,t=E,n=d,void function(e,t=300){let n;return(...s)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,s)}),t)}}((()=>e.search(function(e){let t=r(e);return t=i(t),t=a(t),t=h(t),t}(t.value.trim().toLowerCase()),n)))();var e,t,n};d.onChange(p),E.addEventListener("keyup",p),new class{constructor(e,t,n,s,o){this._searchElement=e,this._exactMatchElement=t,this._baseElement=n,this._compoundElement=s,this._otherElement=o,this._bootExactMatchToggle(),this._bootFocusSearch(),this._bootClearSearch(),this._bootBaseToggle(),this._bootCompoundToggle(),this._bootOtherToggle()}_bootExactMatchToggle(){this._searchElement.addEventListener("keyup",(e=>{e.key===s.EXACT_MATCH&&(this._searchElement.value=r(this._searchElement.value))})),window.addEventListener("keyup",(e=>{e.key===s.EXACT_MATCH&&(this._exactMatchElement.checked=!this._exactMatchElement.checked,c(this._exactMatchElement,"change"))}))}_bootFocusSearch(){window.addEventListener("keyup",(e=>{e.key===s.FOCUS_SEARCH&&(this._searchElement.matches(":focus")||this._searchElement.focus())}))}_bootClearSearch(){window.addEventListener("keyup",(e=>{e.key===s.CLEAR_SEARCH&&(this._searchElement.value="",c(this._searchElement,"keyup"))}))}_bootBaseToggle(){this._searchElement.addEventListener("keyup",(e=>{e.key===s.BASE_TOGGLE&&(this._searchElement.value=i(this._searchElement.value))})),window.addEventListener("keyup",(e=>{e.key===s.BASE_TOGGLE&&(this._baseElement.checked=!this._baseElement.checked,c(this._baseElement,"change"))}))}_bootCompoundToggle(){this._searchElement.addEventListener("keyup",(e=>{e.key===s.COMPOUND_TOGGLE&&(this._searchElement.value=a(this._searchElement.value))})),window.addEventListener("keyup",(e=>{e.key===s.COMPOUND_TOGGLE&&(this._compoundElement.checked=!this._compoundElement.checked,c(this._compoundElement,"change"))}))}_bootOtherToggle(){this._searchElement.addEventListener("keyup",(e=>{e.key===s.OTHER_TOGGLE&&(this._searchElement.value=h(this._searchElement.value))})),window.addEventListener("keyup",(e=>{e.key===s.OTHER_TOGGLE&&(this._otherElement.checked=!this._otherElement.checked,c(this._otherElement,"change"))}))}}(E,...d.elements)}]);