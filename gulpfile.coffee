gulp = require 'gulp'
vulcanize=require 'gulp-vulcanize'
plumber=require 'gulp-plumber'
run = require 'run-sequence'
packConfig = require './webpack.config.coffee'
webpack = require 'webpack-stream'
less=require 'gulp-less'
sync=require('browser-sync').create()

plumb= ->
  plumber
    errorHandler: (err) ->
      console.log(err.messageFormatted)
      @emit('end')

gulp.task 'less', ->
  gulp.src('src/less/**/*.less',base:'src/less')
  .pipe plumb()
  .pipe less()
  .pipe gulp.dest 'target/css'

gulp.task 'webpack', ->
  gulp.src("src/**/*")
  .pipe plumb()
  .pipe webpack packConfig
  .pipe gulp.dest('target')

gulp.task 'vulcanize', ->
  gulp.src('target/index.html')
  .pipe plumb()
  .pipe vulcanize
     inlineScripts: true
     inlineCss: true
     stripExcludes: true
  .pipe gulp.dest '.'

gulp.task 'copy', ->
  gulp.src 'src/index.html'
  .pipe gulp.dest('target')

gulp.task 'default', (cb) ->
  run(
    ['less', 'copy', 'webpack'],
    'vulcanize',
    cb
  )

gulp.task 'reload', sync.reload
gulp.task 'watch', ->
  sync.init
    server:
      baseDir:'.'
    startPath:'target'

  gulp.watch 'src/less/**/*.less', ->
    run 'less','vulcanize', 'reload'
  gulp.watch "src/index.html", ->
    run 'copy', 'vulcanize', 'reload'
  gulp.watch ['src/**/*.js'], ->
    run 'webpack','vulcanize', 'reload'
  gulp.watch 'index.html', sync.reload
