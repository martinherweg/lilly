/**
   * Copy Vector Files
   **/
import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import errorHandler from '../lib/errorHandler';
import copyImages from '../lib/images-copy';

const $ = gulpLoadPlugins();

const vectorSource = config.src.src + config.src.images.base + config.src.images.svg.base + config.src.images.svg.single + '**/*.svg';
const vectorDist = config.dist.dist + config.dist.images.base + config.dist.images.svg.base + config.dist.images.svg.single;

const svgSprite = () => {
    return gulp
        .src(vectorSource)
        .pipe($.changed(vectorDist))
        .pipe($.imagemin({
            svgoPlugins: config.minify.images.svgoPlugins
        }))
        .pipe($.svgSprite({
            mode: {
                symbol: {
                    dest: 'sprite',
                    sprite: 'sprite.svg',
                    inline: true
                }
            }
        }))
        .on('error', errorHandler)
        .pipe(gulp.dest(vectorDist))
        .pipe($.size())
}

gulp.task('svg-sprite', svgSprite);
module.exports = svgSprite;

