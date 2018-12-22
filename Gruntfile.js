module.exports = function(grunt) {
    
    // Configuration
    grunt.initConfig({
        
        pkg: grunt.file.readJSON("package.json"),
        
        name: "<%= pkg.name %>",
        destName: "dist/<%= name %>",
        dest: "<%= destName %>.js",
        src: "<%= name %>.js",
        
        jshint: {
            files: ["*.js", "test/*.js"],
            
            options: {
                // Enforcing
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: true,
                undef: true,
                unused: true,
                
                // Environment
                node: true
            }
        },
        
        jsdoc: {
            dist: {
                src: ["<%= src %>"],
                options: {
                    destination: "doc",
                    template: "node_modules/ink-docstrap/template",
                    configure: "jsdoc-conf.json"
                }
            }
        },
        
        mochacli: {
            all: {}
        },
        
        uglify: {
            minify: {
                src: "<%= dest %>",
                dest: "<%= destName %>.min.js"
            }
        },
        
        umd: {
            dist: {
                template: "unit",
                src: "<%= src %>",
                dest: "<%= dest %>",
                objectToExport: "module.exports",
                globalAlias: "<%= name %>",
                indent: "    "
            }
        }
        
    });
    
    // Plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.loadNpmTasks("grunt-umd");
    
    // Tasks
    grunt.registerTask("build", ["umd", "uglify"]);
    grunt.registerTask("doc", ["jsdoc"]);
    grunt.registerTask("test", ["mochacli"]);
    grunt.registerTask("default", ["jshint", "mochacli"]);
    grunt.registerTask("all", ["default", "build", "doc"]);
};
