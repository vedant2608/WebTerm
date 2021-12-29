import { BaseCommand } from './basic.js'

class Terminal {
   constructor(startName, element) {
      this.name = startName;
      this.element = element;
      this.command;
      this.DataObjectCommands
   }

   init() {
      /****************************************************************
    * Do not edit below code;
   /****************************************************************/
      let terminalElement = document.getElementById(this.element);
      terminalElement.value = `${this.name}`;
      const firstInitiatedValue = `${this.name}`;


      terminalElement.addEventListener('keydown', (event) => {
         if (event.key === "Enter") {
            terminalElement.value += `\n${this.name}`;
            event.preventDefault();   //To keep cursor at the end of the text
         }
         terminalElement.removeEventListener('keydown', () => { });
         return 0;
      });

      //Fetch All the commands
      fetch('./commands.json')
         .then(response => {
            return response.json();
         })
         .then(data => {
            this.DataObjectCommands = data;
            //freeze the all objects
            deepFreeze(this.DataObjectCommands);
         }).catch(error => {
            return alert("Please Start the development server! fetch API does not support local file format");
         });
      /*******************************
       * 
       * 
       * 
       * 
       * 
       * 
       * code for all basic utilities
       * 
       * 
       * 
       * 
       * 
       * ******************************/

      terminalElement.addEventListener('input', (event) => {

         var stmt = terminalElement.value.split(firstInitiatedValue);
         this.command = stmt[stmt.length - 1];
         terminalElement.removeEventListener('input', () => { });
         return 0;
      });

      let tmpName = this.name;
      var baseCommand;
      terminalElement.addEventListener('keydown', (event) => {
         baseCommand = new BaseCommand(this.DataObjectCommands, terminalElement, firstInitiatedValue);
         const requiredText = tmpName;
         if (event.key === "Backspace" && (event.target.value.split("\n")[(event.target.value.split("\n")).length - 1] === requiredText)) {
            event.preventDefault();
            return 0;
         } else if (event.key == "Backspace" && terminalElement.value === firstInitiatedValue) {
            event.preventDefault();
            return 0;
         } else if (event.key === "Enter") {
            this.command = this.command.replace(/\s+$/g, "");
            this.command = this.command.replace(/^\s+/g, "");
            let flag = baseCommand.computeCommands(this.command);
            //If you write any other comamnd write it down from below;
            if (flag != 0) {
               terminalElement.value = `There is no such command as "${this.command}"! This Does not exist\n${this.name}`;
               return 0;
            }
            return 0;
         }
         terminalElement.removeEventListener('keydown', () => { });
      });
   }

   setFileExtensions(arr) {
      BaseCommand.setFileExtensions(arr);
   }
}
export { Terminal };





/***************Do not touch the below configuration upto certain lines******************/
let stylesObject;
fetch("./style.json")
   .then(response => {
      return response.json();
   })
   .then(data => {
      stylesObject = data;
   }).then(
      () => { setStyles(stylesObject); }
   ).catch(err => {
      if (err instanceof TypeError) {
         return alert("Please Start the development server! fetch API does not support local file format");
      }
   });

function setStyles(stylesObject) {
   //Setting styles for Root container
   let cssStyles = "";
   for (var i = 0; i < (stylesObject.styles[0].configStyles).length; i++) {
      cssStyles += stylesObject.styles[0].configStyles[i];
   }
   document.getElementById(stylesObject.styles[0].htmlElement).style = cssStyles;
   //Setting styles for TextArea Container
   cssStyles = "";
   for (var i = 0; i < (stylesObject.styles[1].configStyles).length; i++) {
      cssStyles += stylesObject.styles[1].configStyles[i];
   }
   document.getElementById(stylesObject.styles[1].htmlElement).style = cssStyles;
}

const deepFreeze = o => {
   for (let [key, value] of Object.entries(o)) {
      if (o.hasOwnProperty(key) && typeof value == "object") {
         deepFreeze(value);
      }
   }
   Object.freeze(o);
   return o;
}

/**********************************Do not touch the above configuration*********************************************** */
