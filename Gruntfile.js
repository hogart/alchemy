module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		stylus: {
			options: {
				'include css': true,
				'resolve url': true
			},
			dev: {
				options: {
					compress: false,
					sourcemap: {
						inline: true
					}
				},
				files: {
					'public/index.css': 'styles/index.styl'
				}
			},
			prod: {
				options: {
					compress: true
				},
				files: {
					'public/index.min.css': 'styles/index.styl'
				}
			}
		},

		jade: {
			serverDev: {
				options: {
					client: false,
					pretty: true
				},
				files: {
					'public/index.html': ['templates/server/index.jade']
				}
			},
			serverProd: {
				options: {
					client: false,
					pretty: false
				},
				files: {
					'public/index.html': ['templates/server/index.jade']
				}
			},
			clientDev: {
				options: {
					client: true,
					amd: false,
					compileDebug: true
				},
				files: {
					'public/templates.js': ['templates/client/**/*.jade']
				}
			},
			clientProd: {
				options: {
					client: true,
					amd: false,
					compileDebug: false
				},
				files: {
					'public/templates.min.js': ['templates/client/**/*.jade']
				}
			}
		},

		browserify: {
			options: {
				transform: [['babelify', {
					sourceMap: true
				}]],
				browserifyOptions: {
					debug: true
				}
			},
			dev: {
				files: {
					'public/index.js': ['src/index.js']
				}
			}
		},

		watch: {
			styles: {
                files: ['styles/*/*.styl', 'styles/index.styl'],
                tasks: ['stylus:dev']
            },
			templatesServer: {
				files: ['templates/server/*.jade', 'templates/server/**/*.jade', 'templates/common/**/*.jade'],
				tasks: ['jade:serverDev']
			},
			templatesClient: {
				files: ['templates/client/*.jade', 'templates/client/**/*.jade', 'templates/common/**/*.jade'],
				tasks: ['jade:clientDev']
			},
			browserify: {
				files: ['src/**/*.*'],
				tasks: ['browserify:dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('build', ['stylus:dev', 'jade:serverDev', 'jade:clientDev', 'browserify:dev']);
	grunt.registerTask('prod', ['stylus:prod', 'jade:serverProd', 'jade:clientProd']);
	grunt.registerTask('default', ['build', 'watch']);
};