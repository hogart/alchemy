module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			dev: {
				options: {
					port: 7008,
					hostname: 'localhost',
					base: 'public',
					open: true,
					livereload: true
				}
			}
		},

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
					'public/index.css': 'styles/index.styl'
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
			}
		},

		browserify: {
			options: {
				transform: [
					['jadeify'],
					['babelify', {
						sourceMap: true
					}]
				]
			},
			dev: {
				files: {
					'public/index.js': ['src/index.js', 'templates/client/!**!/!*.jade']
				},
				browserifyOptions: {
					debug: true
				}
			},
			prod: {
				files: {
					'public/index.js': ['src/index.js', 'templates/client/!**!/!*.jade']
				},
				browserifyOptions: {
					debug: false
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
			browserify: {
				files: ['src/**/*.*', 'templates/client/*.jade'],
				tasks: ['browserify:dev']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: ['public/**/*']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('dev', ['stylus:dev', 'jade:serverDev', 'browserify:dev']);
	grunt.registerTask('build', ['stylus:prod', 'jade:serverProd', 'browserify:prod']);
	grunt.registerTask('default', ['dev', 'connect', 'watch']);
};
