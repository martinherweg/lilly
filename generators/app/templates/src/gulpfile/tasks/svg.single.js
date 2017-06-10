/**
 |--------------------------------------------------------------------------
 | gulp svg:single
 |--------------------------------------------------------------------------
 *
 * Task for simple copy of svg Files
 * then they get renamed so you can use them online
 * also get the single files out of the sprite folder, because you never know
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | svg.single.js
 |--------------------------------------------------------------------------
 */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../../package.json';
import error_handler from '../lib/error_handler';

const $ = gulpLoadPlugins();

const paths = {
  src: [
    `${config.srcPaths.images.svg.base + config.srcPaths.images.svg.single}**/*.svg`,
    `${config.srcPaths.images.svg.base + config.srcPaths.images.svg.sprite}**/*.svg`,
  ],
  dest: `${config.distPaths.images.svg.base + config.distPaths.images.svg.single}`,
  dest_inline: `${config.distPaths.views}`,
};

const copy_vectors = () => gulp
    .src(paths.src)
    .pipe($.imagemin({
      svgoPlugins: config.svgoConfig
    }))
    .on('error', error_handler)
    .pipe($.cheerio({
      run($, file) {
        let file_name = file.path;
        const file_base = file.base;
        file_name = file_name.replace(file_base, '');
        file_name = file_name.replace('.svg', '');
        $('svg').addClass(`icon-${file_name.toLowerCase()}`);
      },
      parserOptions: { xmlMode: true },
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe($.rename({
      extname: '.svg.html',
    }))
    .pipe(gulp.dest(`${paths.dest_inline}svg/`));

gulp.task('svg:single', copy_vectors);

export default copy_vectors;
