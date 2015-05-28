This was going to be angular, but I chose react so as to cover both IE8 and accessibility, and I thought you would like to see some React chops.

There's plenty left TODO but time does not allow. Most notable testing is implemented but there are as yet no test cases (doh!). It should be easy enough and grunt is wired up to test.


Installation
============

The contents of the /www directory is ready to run apart from needing the libs via bower. To install do a 
$ bower install
assuming you have already got bower installed globally

To develop this please get the node modules by doing a 
$ npm install

To minify please include uglify in Gruntfile.js build task and then do a 
$ grunt build
I should really make a publish task for this which uglifies but left it out for speed this run...
