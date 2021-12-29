//Importing terminals
import { Terminal } from './term.js'

function completeApp() {

    let terminal = new Terminal("Terminal/Vedant::", "textarea");
    terminal.init(); //Initialise the terminal and allow three basic commands
    terminal.setFileExtensions(["html", "php"]); //Which kind of extensions your web pages are using to navigate through webpages  
}
completeApp();