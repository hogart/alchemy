TES Alchemy Helper
==================

Started like just library/engine, now it is full alchemy helper with web UI. Being kinda experimental project, can be used as tech demo. Technologies used:

* Most interesting part is ES6, via Babel
* [Skull](https://github.com/hogart/skull) + Ractive + Jade
* Grunt-based workflow with browserify (+ babelify + jadeify), stylus, jade compiling and livereload
* Unit-tests with mocha and chai, along with linting through jscs and eslint

Doesn't require server-side to work, built files can be used from `/public/` dir as is.

## Usage

`git clone git@github.com:hogart/alchemy.git && npm install && npm start`

Latter command opens new tab in your default browser.

## Roadmap

* Add persistency between visits 
* CI-ish workflow (do not build when lint or tests fail) 
* Better looks?