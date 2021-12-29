# WebTerm

Basic Web Terminal UI designed with HTML,CSS and vanila javascript

## Adding WebTerm

In your HTML file add the following code

```java
<div id="terminal">
    <textarea id="textarea" wrap="hard" value="Hello world" onfocus="this.value=this.value" spellcheck="false">
    </textarea>
</div>

---At the end of the <body> Enter following line---

<script type="module" src="index.js"></script>
```

In your JavaScript File Add the following code

```python
import { Terminal } from './term.js' //To import term.js

let terminal = new Terminal("Your_Text_to_be_shown_on_terminal::", "textarea");
    terminal.init(); //Initialise the terminal and allow three basic commands
    terminal.setFileExtensions([web_pages_extensions_seprated_by_comma_such_as_html_jsp]); //Which kind of extensions your web pages are using to navigate through webpages

eg=>
let terminal = new Terminal("Terminal/Vedant::", "textarea");
    terminal.init(); //Initialise the terminal and allow three basic commands
    terminal.setFileExtensions([web_pages_extensions_seprated_by_comma_such_as_html_jsp]); //Which kind of extensions your web pages are using to navigate through webpages

```

## Usage

```
1. In a webpage it will open a terminal Like UI
2. This terminal take styles from the styles.json, So you can fully customize the UI as your need 🙂
3. All the commands are stored in commands.json files
4. Make sure that you are passing all the extensions of view files
```

## Commands

1. To navigate through web pages. You can use cd file_name_with_extension_or_without_extension
   E.g=>

```java
cd index2 or cd index2.html  //This will take you to index2.html
```

2. To navigate through divs of same page, You can use goto div_id //Classes wont work use Id as its unique
   E.g=>

```java
goto home //If your web has element with id as home this will take you to that div
```

3. To clear the screen we can use cls command

```java
cls
```

\*Note that each command can have alternative and those are specified in commands.json

## Contributing

- Please share your ideas to make this even better. I am expecting all the good and bad suggestions and also I will appriciate if you help to extend the functionality.

## Some Precuations

- Start development or local server before embedding this terminal as it works on fetch api it will need developmnet server else you will get error.
- To change any UI related functionality I will suggest that you should keep it in JSON format and fetch it inside the project.
- As It has ID of "Terminal" and IDs are unique you should keep in the mind that only one terminal can be displayed on one page.
- Put all the files in one folder😅.This is really important

## Some Last Words

I hope you liked this. If you really like this please star the project and also suggest me how can I improve.
