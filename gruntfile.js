module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      tinyimg: {
        dynamic: {
            files: [{
              expand: true,
              cwd: 'project/images/', 
              src: ['**/*.{png,gif,jpg,jpeg,svg}'],
              dest: 'dist/images'
            }]
        }
      },

      imagemin: {
        static: {
            options: {
                optimizationLevel: 3,
                svgoPlugins: [{removeViewBox: false}],
               // use: [mozjpeg()] // Example plugin usage
            },
            files: {
                'dist/guru.gif': 'project/img/guru.gif'
            }
        },
        dynamic: {
            files: [{
                expand: true,
                cwd: 'project/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/'
            }]
        }
    },

    cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'production/projectname/css/styles.min.css': ['projectname/css/style.css']
          }
        }
      },
  
      htmlmin: {                                     // Task
          dist: {                                      // Target
            options: {                                 // Target options
              removeComments: true,
              collapseWhitespace: true
            },
            files: {                                   // Dictionary of files
              'production/projectname/index.html': 'projectname/index.html'
            }
          } 
        },
  
     concat: {
        options: {
          separator: ';',
          stripBanners: true,
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.author %>-' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */',
        },
        dist: {
          src: ['projectname/js/custom.js', 'projectname/js/custom1.js'],
          dest: 'projectname/js/custom_include.js',
        },
      },
  
     uglify: { 
          my_target: {
            files: {
              'production/projectname/js/custom_include.min.js': ['projectname/js/custom_include.js']
            }
          }
        },
  
    // gzip assets 1-to-1 for production 
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'prod/',
        src: ['**/*'],
        dest: 'host_production/'
      }
    }
  
    });
      
    grunt.loadNpmTasks('grunt-tinyimg');
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['tinyimg']);

  };