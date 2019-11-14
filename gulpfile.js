const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

// Static server для удаленного полключения в браузере ввести http://localhost:3001/
// для запуска только сервера команда в терминале gulp server
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// конвертируем sass или scss в файл css
// для запуска команда в терминале gulp styles
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''})) // Добавляем файлу css префикс .min
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());    // перезапускаем брайзер
});

// Отслеживаем изменения в файлах
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
})

// задача запускается в терминале коммандой gulp
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));