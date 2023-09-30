import React, { ImgHTMLAttributes } from 'react'
import ReactDOM from 'react-dom/client'

import manifest from '../public/manifest.json' assert { type: 'json' }

import App from './component.jsx'
import './index.css'

/* "js": ["./contentScript/index.js"], */


  // Check if current browser is chrome
  function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }

  // Wait an element
  function waitForElements(selector:string, callback:CallableFunction, interval:number = 100, limit:number = 10) {  
    const elements:NodeListOf<HTMLElement> = document.querySelectorAll(selector);
    let i = 0;
    if (elements.length > 0)
        callback(elements);
    else
    if(limit>i){
        setTimeout(() => waitForElements(selector, callback, interval), interval);
        i++;
    }
  } 

  // Update login page logo
  let updateLoginPage = (elements:NodeListOf<HTMLElement> ) => {

    // Iteration of img
    elements.forEach(element => {

      console.log(element);

      // Check
      if(isChrome() && "src" in element){

        // Replace src
        element.src = chrome.runtime.getURL(
          document.body.classList.contains('sg_dark_theme') 
            ? 'logo-white.png' 
            : "logo-black.png"
        );

        // Set style
        element.style.opacity = "1";

      }

    });

  };

  // Update logo
  let updateLogo = (elements:NodeListOf<HTMLElement> ) => {

    // Iteration of img
    elements.forEach(element => {

      // Check
      if(isChrome()){

        // Get temp logo
        let tempLogo = chrome.runtime.getURL(
          document.body.classList.contains('sg_dark_theme') 
            ? 'logo-white.png' 
            : "logo-black.png"
        );

        // Replace src
        let stringToReplace = element.style.background = 
          "url('" +
          tempLogo +
          "') center center / contain no-repeat;"
        ;

        // Replace bg
        element.setAttribute("style", "background:"+stringToReplace);
        //element.style.background = stringToReplace;

      }

    });

  };

  // Update logo crew planning
  /* let updateLogoCP = (elements:NodeListOf<HTMLElement> ) => {

    // Iteration of img
    elements.forEach(element => {

      // Check
      if(isChrome()){

        // Get temp logo
        let tempLogo = chrome.runtime.getURL('logo-white-square.png');

        // Replace src
        let stringToReplace = element.style.background = 
          "url('" +
          tempLogo +
          "') center center / contain no-repeat;"
        ;

        // Replace bg
        // element.style.background = stringToReplace;
        element.setAttribute("style", "background:"+stringToReplace);

      }

    });

  }; */

  // Wait for img
  waitForElements(
    ".sg_reset_html .login_page main img",
    updateLoginPage
  )

  // Wait for img
  waitForElements(
    ".nav_item.sg_logo a",
    updateLogo
  )

  // Wait for img
  /* waitForElements(
    ".sgw_timeline_app.sgw_resource_planning_app  .header .title .logo",
    updateLogoCP
  ) */

  // Check if chrome
  /* if(isChrome()){

    // Get logo
    let images:NodeListOf<HTMLImageElement> = document.querySelectorAll('.sg_reset_html .login_page main img');

    console.log(images);

    // Check logo
    if(images.length)

      // Iteration of img
      images.forEach(img => {

        console.log(img);

        // Replace src
        img.src = chrome.runtime.getURL('logo-white.png');

      });

  } */


  /*

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