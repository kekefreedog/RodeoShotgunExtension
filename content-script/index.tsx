import React from 'react'
import ReactDOM from 'react-dom/client'

import manifest from '../public/manifest.json' assert { type: 'json' }

import App from './component.jsx'
import './index.css'

/* "js": ["./contentScript/index.js"], */

    /* function isChrome() {
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }

  if(isChrome()) {

    let logoBlack = chrome.runtime.getURL("logo-black.png");
    let logoWhite = chrome.runtime.getURL("logo-white.png");

    setTimeout(() => {

        let logoBlackElBis = document.querySelector(".sg_dark_theme.login_page main div");
        if(logoBlackElBis !== null){
          
          if(logoBlack)
            logoBlackElBis.style.background = `center / contain no-repeat url("${logoWhite}")`;
      
        }else{
          let logoWhiteElBis = document.querySelector(".login_page main div");
          if(logoWhiteElBis !== null){
            if(logoWhiteBis)
              logoWhiteElBis.style.background = `center / contain no-repeat url("${logoBlack}")`;
          }
        }
      
        let logoBlackEl = document.querySelector(".sg_dark_theme .nav_item.sg_logo a");
        console.log(logoBlackEl);
        if(logoBlackEl !== null){
          
          if(logoBlack)
            logoBlackEl.style.background = `center / contain no-repeat url("${logoWhite}")`;
      
        }else{
          let logoWhiteEl = document.querySelector(".nav_item.sg_logo a");
          if(logoWhiteEl !== null){
            
            if(logoWhite)
              logoWhiteEl.style.background = `center / contain no-repeat url("${logoBlack}")`;
          }
        }
      }, 200);

      let dayEl = document.querySelector(".theme_switch .button div")



      let changeLogo = () => {

        setTimeout(() => {
      
          let logoBlackEl = document.querySelector(".sg_dark_theme .nav_item.sg_logo a");
          console.log(logoBlackEl);
          if(logoBlackEl !== null){
            
            if(logoBlack)
              logoBlackEl.style.background = `center / contain no-repeat url("${logoWhite}")`;
        
          }else{
            let logoWhiteEl = document.querySelector(".nav_item.sg_logo a");
            if(logoWhiteEl !== null){
              
              if(logoWhite)
                logoWhiteEl.style.background = `center / contain no-repeat url("${logoBlack}")`;
            }
          }

        }, 200);


      }

      if(dayEl !== null)
        dayEl.addEventListener(
          "click",
          changeLogo
        );
        

} */



/* console.debug(`Initiate Web Extension v${manifest.version}`)

const pluginTagId = 'extension-root'
const existingInstance = document.getElementById(pluginTagId)
if (existingInstance) {
  console.debug('existing instance found, removing')
  existingInstance.remove()
}

const component = document.createElement('div')
component.setAttribute('id', pluginTagId)

// Make sure the element that you want to mount the app to has loaded. You can
// also use `append` or insert the app using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
document.body.append(component)
ReactDOM.createRoot(component).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
 */