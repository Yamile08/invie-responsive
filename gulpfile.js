var gulp = require('gulp')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var browserSync = require('browser-sync').create()

// Primera Tarea, Servidor de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

//Segunda Tarea, para procesar el CSS

gulp.task('css', function () {

  var processors = [
    autoprefixer({browsers: ['>5%', 'ie 8']})
  ]

  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})


//Tercera Tarea para vigilar y/o observar los cambios
gulp.task('watch', function () {
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

//Por último, para unificar las 3 tareas usamos:
gulp.task('default', ['watch', 'serve'])
