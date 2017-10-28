//grunt is the most common tool today for tasks.
//we create the file Gruntfile.js and attach plugins (uglify,jshint)
//for every plug in in this file we need to create the initConfig suitable for the plugins -- documa

module.exports = function (grunt){

    grunt.initConfig ({
        //all tasks;
        // jshint: {all:['*.js']}

        jshint:{

            client:{
                files:{src:['public/**/*.js']}
            },
            server:{
                files:{src:['model/**/*.js','routes/**/*.js']}
            }
        }
    });
    //activate jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');
};