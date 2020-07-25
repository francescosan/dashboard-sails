/**
 * `tasks/config/sass`
 *
 * ---------------------------------------------------------------
 *
 * Compile your sass files into a CSS stylesheet.
 *
 *
 */
module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
        files: [{
            expand: true,
            cwd: 'assets/styles/',
            src: ['importer.scss'],
            dest: '.tmp/public/styles/',
            ext: '.css'
        }]
    }
});

grunt.loadNpmTasks('grunt-contrib-sass');


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // This Grunt plugin is part of the default asset pipeline in Sails,
  // so it's already been automatically loaded for you at this point.
  //
  // Of course, you can always remove this Grunt plugin altogether by
  // deleting this file.  But check this out: you can also use your
  // _own_ custom version of this Grunt plugin.
  //
  // Here's how:
  //
  // 1. Install it as a local dependency of your Sails app:
  //    ```
  //    $ npm install grunt-contrib-less --save-dev --save-exact
  //    ```
  //
  //
  // 2. Then uncomment the following code:
  //
  // ```
  // // Load Grunt plugin from the node_modules/ folder.
  // grunt.loadNpmTasks('grunt-contrib-less');
  // ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

};
