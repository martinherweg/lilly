/**
 * Import the packageJsonModules Writer function
 *
 * @package  generator-lilly
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const packageJsonModules = require('./index');

const writePackageJson = ({ context, files = {} } = {}) => {
  packageJsonModules(
    {
      pkg: files.pkg,
    },
    context,
  );
};

module.exports = writePackageJson;
