var fs = require('fs');
module.exports = function ( grunt ) {
    //配置参数
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        jshint: {
            all: [
                'dev/*/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        concat: {
            options: {
                separator: '',
                stripBanners: true
            },
            tmp: {
                options: {
                    banner: 'var tmpl = {};\n',
                    process: function(src, filepath) {
                        var match = filepath.match(/([^\/]+).ejs$/);
                        if(match) {
                            var tplStr = 'tmpl[\''+ match[1] +'\'] = [\''  + src
                                //.replace(/(^\s*)|(\s*$)/gm, '')
                                .replace(/'/g, '\\\'')
                                .replace(/([\r\n])/g, "',$1'")
                                + '\'];\n'
                            return tplStr;
                        }
                        return src;
                    },
                    footer: ''
                },
                files:function(){
                    var o = {};
                    var dir = fs.readdirSync('dev');
                    dir.forEach(function(dir){
                        var tmp = 'dev/'+dir+'/tmp/*.ejs',
                            pub = 'dev/'+dir+'/a_tmps.js';
                        o[pub] = tmp;
                    });
                    return o;
                }()
            },
            dev: {
              files:function(){
                  var o = {};
                  var dir = fs.readdirSync('dev');
                  dir.forEach(function(dir){
                      var tmp = 'dev/'+dir+'/*.js',
                          src = 'src/'+dir+'.js';
                      o[src] = tmp;
                  });
                  return o;
              }()
            }

        },
       /* cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'css/pad/play_all.css': [
                        'css/pad/global.css',
                        'css/pad/play.css',
                        'css/pad/video.css'
                    ]
                }
            }
        },*/
        uglify: {
            'build':{
                options: {
                    beautify:{
                        'beautify'   : false,
                        'ascii_only': true
                    }
                },
                files: function(){
                    var o = {};
                    var dir = fs.readdirSync('src');
                    dir.forEach(function(file){
                        file = file.substring(0,file.indexOf('.'));
                        var build = 'build/'+file+'.min.js',
                            src = 'src/'+file+'.js';
                        o[build] = src;
                    });
                    console.log(o);
                    return o;
                }()
            }
        },

        watch: {
            concat: {
                files: [
                    'dev/*/tmp/*.ejs',
                    'dev/*/*.js',
                    'src/*.js'
                ],
                tasks: ['concat','uglify:build']
            }
        }
    } );

    //grunt.loadNpmTasks('grunt-sohu-tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint')
    //载入concat和uglify插件，分别对于合并和压缩
  //  grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
   // grunt.loadNpmTasks('grunt-contrib-watch');

    //注册任务
    grunt.registerTask( 'default', ['uglify'] );
    //grunt.registerTask( 'default', ['cssmin'] );
}