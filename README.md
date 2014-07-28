jsoncompile
===========

Compile JSON into HTML

This is a sample NPM module to compile a JSON file (see test.json) into an html file (see test.html).
This functionality is actually pretty impractical. HTML is easier to read, manage, and render than managing JSON files in concurrence with your HTML, but I needed a sample NPM module to perform a perfunctory task.

This module will only compile a valid JSON object inside a .json file into an HTML file (passed as .html)

Each key will be read with three properties:
+Attributes: An Object containing html attribute key value pairs.
+Children: An object with the nested children to be contained in this key (or HTML entity).
+Content: The content of the HTML object (text/etc).

The absence of any of these properties will be ignored. Any additional properties will be ignored.

## Usage

This assumes NPM is installed gloabally on your machine:

```bash 
npm install -g jsoncompile
jsoncompile test.json test.html
```
