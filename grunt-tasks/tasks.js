'use strict';

module.exports = function(grunt) {
	grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build:development:web', 'open:dist', 'connect:dist:keepalive']);
        }


        grunt.task.run([
            'processhtml:web',
            'register-git-hooks',
            'jshint',
            'bowerInstall',
            'compass:dev',
            'csslint',
            'connect:livereload',
            'open:server',
            'ngconstant:development',
            'watch'
        ]);



    });



    grunt.registerTask('run-e2e', [
        'connect:test',
        'selenium_start',
        'protractor:e2e',
        'selenium_stop'
    ]);

    grunt.registerTask('run-utest', [
        'karma:unit'
    ]);

    grunt.registerTask('test', [
        'run-utest',
        'run-e2e'
    ]);

    /*
        environment -> development|qa|staging|production
        platform -> android|ios
    */
    grunt.registerTask('buildhybrid', function(environment, platform) {
        grunt.task.run([
            'build:' + environment + ':mobile',
            'copy:hybrid',
            'cordovacli:build_' + platform
        ]);
    });
    /*
        environment -> development|qa|staging|production
        platform -> mobile|web
    */
    grunt.registerTask('build',function(environment, platform) {
        if( environment ){
            console.log('Building for ' + environment);
        }

        var tasks = [];

        tasks = tasks.concat([
            'processhtml:' + platform,
            'jshint',
            'clean:dist',
            'bowerInstall',
            'compass:dist',
            'ngconstant:' + environment,
            'useminPrepare',
            'concat',
            'concurrent:dist',
            'cssmin',
            'imagemin',
            'cdnify',
            'ngAnnotate',
            'uglify',
            'rev',
            'usemin',
            'copy:dist'
        ]);


        // if (target === 'android') {
        //     tasks = tasks.concat([
        //         'clean:hybrid',
        //         'cordovacli:cordova_android',
        //         'clean:www',
        //         'copy:hybrid',
        //         'cordovacli:build_android',
        //         'cordovacli:emulate_android'
        //     ]);
        // }

        // if (target === 'ios') {
        //     tasks = tasks.concat([
        //         'clean:hybrid',
        //         'cordovacli:cordova_ios',
        //         'clean:www',
        //         'copy:hybrid',
        //         'cordovacli:build_ios',
        //         'cordovacli:emulate_ios'
        //     ]);
        // }


        grunt.task.run(tasks);
    });




    grunt.registerTask('register-git-hooks', [
        'githooks'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('production', [
        'ngconstant:production'
    // Add further deploy related tasks here
    ]);

    grunt.registerTask('staging', [
        'ngconstant:staging'
    // Add further deploy related tasks here
    ]);

    // commit task for git
    grunt.registerTask('git-push', ['jshint','test']);
    grunt.registerTask('git-commit', ['jshint']);
};
