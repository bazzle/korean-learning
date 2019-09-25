module.exports = function(grunt) {
  require("jit-grunt")(grunt);

  grunt.initConfig({
    sass: {
      options: {
        style: "expanded"
      },
      files: {
        src: "assets/css/input/main.scss",
        dest: "assets/css/style.css"
      }
    },
    postcss: {
      prod: {
        options: {
          processors: [
            require("pixrem")(), // add fallbacks for rem units
            require("autoprefixer")(),
            require("cssnano")() // minify the result
          ]
        },
        src: "assets/css/style.css",
        dest: "dist/assets/css/style.css"
      }
    },
    svgstore: {
      options: {
        prefix: "icon-",
        includedemo: true
      },
      dev: {
        files: {
          "assets/icons/icons.svg": ["assets/icons/input/*.svg"]
        }
      },
      prod: {
        files: {
          "dist/assets/icons/icons.svg": ["assets/icons/input/*.svg"]
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"]
      },
      dist: {
        files: {
          "dist/assets/js/scripts.js": "assets/js/scripts.js"
        }
      }
    },
    htmlmin: {
      default: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {
            expand: true,
            src: "*.html",
            dest: "dist/"
          }
        ]
      }
    },
    imagemin: {
      default: {
        files: [
          {
            expand: true,
            cwd: 'assets/images/',
            src: ["**/*.{png,jpg,gif}"],
            dest: "dist/assets/images/"
          }
        ]
      }
    },
    browserSync: {
      bsFiles: {
        src: ["assets/css/style.css", "*.html", "js/*.js"]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./"
        }
      }
    },
    watch: {
      css: {
        files: ["assets/css/input/*.scss"],
        tasks: ["sass"]
      },
      svg: {
        files: ["assets/icons/input/*.svg"],
        tasks: ["svgstore:dev"]
      }
    }
  });

  grunt.registerTask("dev", ["browserSync", "watch"]);
  grunt.registerTask("build", ["imagemin", "htmlmin", "svgstore:prod", "postcss", "babel"]);
};