'use strict';
module.exports = function(grunt) {
    grunt.config('processhtml', {
        mobile: {
          files: {
            '<%= grunt.config.app %>/index.html': ['<%= grunt.config.app %>/index_template/index.html']
          }
        },
        web: {
          files: {
            '<%= grunt.config.app %>/index.html': ['<%= grunt.config.app %>/index_template/index.html']
          }
        }
    });
};