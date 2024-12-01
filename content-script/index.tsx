import React, { ImgHTMLAttributes } from 'react'
import ReactDOM from 'react-dom/client'

import manifest from '../public/manifest.json' assert { type: 'json' }

import App from './component.jsx'
import './index.css'
import { addAbortListener } from 'events'

import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';

import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

import ClipboardJS from 'clipboard';

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
        // @ts-ignore
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
        // @ts-ignore
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

/**
 * Mutation
 */
const collectionQcToHide:Array<string> = [
  // Group by dept
  "QC IO",
  // Group by pipeline step
  "QC IO (S)",
  "QC BMM (S)",
  "QC FX (S)",
  "QC Layout (S)",
  "QC Animation (S)",
  "QC CFX (S)",
  "QC IO (S)",
]
const observer = new MutationObserver((mutationsList, observer) => {
  let parent;
  let spans;
  let span;
  for(let mutation of mutationsList) {
      // Check QC IO
      if (mutation.type === 'childList' && mutation.target instanceof HTMLDivElement) {
        // Chrome method to hide group in player context
        if(mutation.target && mutation.target.className == "sg vbox versions_main sg_scroll_area"){
          // Get all group names
          let groupNames = mutation.target.querySelectorAll(".items .group_name");
          // Iteration group name
          for(let groupName of groupNames){
            for(let qcToHide of collectionQcToHide){
              // Check if match
              if(groupName.textContent == qcToHide){
                let parent = groupName.parentElement?.parentElement?.parentElement;
                if(parent)
                  parent.style.display = "none";
              }
            }          
          }
          // Create a new KeyboardEvent for the 'Enter' key
          let input = document.querySelector(".sgw_review_app_related_versions_menus_wrapper .quick_filter_input_container input");
          // check input
          if(input && input instanceof HTMLInputElement && !input.value){
              setTimeout(() => {
                let el = document.querySelector(".sgw_review_app_related_versions_top_pane ") as HTMLElement;
                el.style.display = "flex";
                el.style.justifyContent = "space-between";
                el.style.alignItems = "center";
                let buttonEl = document.createElement("button");
                let toastSuccess = Toastify({
                  text: 'Text copied ! ✅',
                  backgroundColor: "--sg_TOAST_INFO_BACKGROUND_COLOR"
                });
                let toastFail = Toastify({
                  text: 'Text not copied ! 🔴',
                  backgroundColor: "--sg_TOAST_INFO_BACKGROUND_COLOR"
                });
                buttonEl.classList.add("rdo-btn-a");
                buttonEl.textContent = "No QC Versions";
                buttonEl.addEventListener("click",
                  e => {
                    e.preventDefault();
                    // input.value = `-qcRender AND NOT ("${collectionQcToHide.join('" AND "')}")`;
                    let content = `-qcRender AND NOT ("${collectionQcToHide.join('" AND "')}")`;
                    let clipboard = new ClipboardJS(buttonEl, {
                      text: function(trigger) {
                          return content;
                      }
                    });
                    clipboard.on('success', function(e) {
                      console.log('Text copied to clipboard:', e.text);
                      toastSuccess.showToast();
                      e.clearSelection();
                    });
                
                    clipboard.on('error', function(e) {
                        console.log('Failed to copy text:', e);
                        toastFail.showToast();
                    });
                    //set value into input
                    //input.value = "-qcRender";
                    //input.value = "-qcRender";
                    // Dispatch the event on the input element
                    /* let dispatch1 = input.dispatchEvent(new KeyboardEvent('keydown', {
                      bubbles: true, // Event will bubble up through the DOM
                      cancelable: false, // You can cancel the event
                      key: 'Enter', // The key to be simulated
                      code: 'Enter', // The code of the key to be simulated
                      keyCode: 13, // The keyCode for Enter (for older browsers)
                      charCode: 13 // The charCode for Enter (for older browsers)
                    }));
                    let dispatch2 = input.dispatchEvent(new Event('input', { bubbles: true }));
                    console.log(dispatch1);
                    console.log(dispatch2);
                    input.blur(); */
                  },
                  {capture: true}
                )
                el.appendChild(buttonEl);
                tippy(buttonEl, {
                  content: "Please ensure Pipeline Steps is enable on search filter",
                  placement: "bottom"
                });
                
              }, 500);
          }
        }
        // Chrome method to add button

  /*         // 
          const element = mutation.target.querySelector('.group_name');
            for(let qcToHide of collectionQcToHide){
              // Firefox method to hide group in player context
              if (element && element.textContent == qcToHide) {
                  console.log(`Element ${qcToHide} found!`);
                  parent = element.parentElement?.parentElement?.parentElement;
                  // Check parent
                  if(parent !== null && parent.classList.contains("group") && parent.classList.contains("collapsible") && parent.style.display !== 'none')
                    // Switch disable
                    parent.style.display = "none";
                  //observer.disconnect();  // Disconnect observer if element is found
              }
            }
            const divs = document.querySelectorAll('tr.pivot_row.pivot_row_line, tr.pivot_row');
            for(let div of divs){
                spans = div.querySelectorAll('span.sg_status_icon');
                for(let span of spans){
                  if (div instanceof HTMLElement && span !== null && span.getAttribute("sg_tip") == "Disabled (dis)" && div.style.display != 'none') {
                    div.style.display = 'none';
                  }
                }
              } */

        };
      }
});

// Start observing the document with configured parameters
observer.observe(document, { childList: true, subtree: true });


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