//File to contain commands
/*
 * 
 * 
 * 
 * Commands covered in this files are
 * 1) clear
 * 2) change page
 * 3) change div
 * 4) Speak The about me part or intoduction part
 * 
 * 
 * */
class BaseCommand {

    //Freeze the commands object
    constructor(DataObjectCommands, element, initialText) {
        this.commandSet = DataObjectCommands;
        this.element = element;
        this.initialText = initialText;
    }

    static setFileExtensions(fileExtensions) {
        this.fileExtensions = fileExtensions
    }

    static clearScreen(element, text) {
        element.value = text;
        return 0;
    }


    static changeDirectory(parameter, element, initialText) {
        let page = parameter.split(".");
        let extension;
        let filenames = [];
        if (page.length === 1) {
            for (var i = 0; i < this.fileExtensions.length; i++) {
                filenames[i] = page[0] + `.${this.fileExtensions[i]}`;
            }
            for (var i = 0; i < filenames.length; i++) {
                BaseCommand.fileExists(filenames[i], element, initialText);
                return;
            }

        } else {
            BaseCommand.fileExists(parameter, element, initialText);
        }
    }

    static fileExists = (file, element, initialText) => {
        fetch(file)
            .then((response) => {
                window.setTimeout(res => {
                    if (response.status == 200) {
                        window.location.href = file;
                        element.value = "\n" + initialText;
                        return 0;
                    } else if (response.status == 404) {
                        let writeValue = element.value + `File Does Not Exist`;
                        element.value = writeValue.split(initialText)[1] + "\n" + initialText;
                        return 1;
                    }
                }, 200)
            });
    }

    static gotoDiv(parameter, element, text) {

        if (parameter.split("#")[0] !== "#") {

            window.location = `#${parameter}`;
            element.value = text;
        } else {
            window.location = parameter;
            element.value = text;
        }
    }

    //Driver function to speak what has been passed
    static speak(parameter, element, text) {
        if ('speechSynthesis' in window) {
            fetch("about.txt")
                .then((response) => {
                    if (response.status == 200) {
                        return response.text();
                    } else if (response.status == 404) {
                        let writeValue = element.value + `File Does Not Exist`;
                        element.value = writeValue.split(initialText)[1] + "\n" + initialText;
                        return 1;
                    }
                }).then((sampleResp) => {
                    var synth = window.speechSynthesis;
                    let text_to_speak = sampleResp;
                    const utterThis = new SpeechSynthesisUtterance(text_to_speak);
                    synth.speak(utterThis);
                })
            return 0;
        } else {
            console.error("Web Speech API does not supported");
            return 1;
        }
    }



    //Compute the commands
    computeCommands(commandsFromInput) {

        var flag = 1;  //VARIABLE TO CHECK WHETHER COMMAND EXIST OR NOT;

        //CLEAR SCREEN
        this.commandSet['clear screen'].map((item) => {
            if (item === commandsFromInput.trim()) {
                BaseCommand.clearScreen(this.element, this.initialText);
                flag = 0;
            }
        });

        //CHANGE DIRECTORY
        this.commandSet['change directory'].map((item) => {
            let cdCommandSplit = commandsFromInput.split(" ");
            let cdCommand = cdCommandSplit.slice(0, -1).join(" ");
            let cdCommandParameter = cdCommandSplit[cdCommandSplit.length - 1];
            if (item === cdCommand.trim().split(" ").filter((str) => { return str.replace(/\s+/g, ' ') }).join(' ')) {
                BaseCommand.changeDirectory(cdCommandParameter, this.element, this.initialText);
                flag = 0;
            }
        });

        //GOTO COMMAND
        this.commandSet['navigate'].map((item) => {
            let navigateCommandSplit = commandsFromInput.split(" ");
            let navigateCommand = navigateCommandSplit.slice(0, -1).join(" ");
            let navigateCommandParameter = navigateCommandSplit[navigateCommandSplit.length - 1];


            if (navigateCommand.trim() === item.trim() || navigateCommandParameter.trim() == item.trim()) {
                BaseCommand.gotoDiv(navigateCommandParameter.trim(), this.element, this.initialText);
                flag = 0;
            }
        });

        //SPEAK Command
        this.commandSet['tellmeaboutyourself'].map((item) => {
            if (commandsFromInput.trim() === item.trim() || commandsFromInput.trim() == item.trim()) {
                BaseCommand.speak(commandsFromInput.trim(), this.element, this.initialText);
                flag = 0;
            }
        });

        //To stop speak
        this.commandSet["stopspeaking"].map((item) => {
            if (commandsFromInput.trim() === item.trim() || commandsFromInput.trim() == item.trim()) {
                let synth = window.speechSynthesis;
                synth.cancel();
                flag = 0;
            }
        });



        return flag;
    }

}

export { BaseCommand };