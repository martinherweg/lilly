'use strict';
/* eslint-disable new-cap, no-multi-str, no-template-curly-in-string, no-unused-vars, no-undef, prettier/prettier */
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra'); // eslint-disable-line no-unused-vars

const { renderInstance } = require('../generators/app/usages/vue');

const vueDependencies = require('../generators/app/packageJson/dependencies/_vue');

const runwithVue = (plugins = []) => {
  return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
    projectFramework: 'vue',
    projectVuePlugins: plugins,
  });
};

const run = () => helpers.run(path.join(__dirname, '../generators/app'));

describe('Using Vue Option', () => {
  beforeAll(() => {
    return runwithVue();
  });

  it('add vue devDependencies to package.json', () => {
    assert.JSONFileContent('package.json', {
      devDependencies: vueDependencies.devDependencies
    });
  });

  it('adds vue to package.json', () => {
    assert.JSONFileContent('package.json', {
      dependencies: vueDependencies.dependencies
    });
  });

  it('adds vue instance to app.js', async () => {
    await runwithVue();
    const vueCode = renderInstance([]);
    expect(vueCode).toMatchSnapshot();
    assert.fileContent('src/js/app.js', renderInstance([]));
  });

  it('adds Vue Examples', () => {
    assert.file(['src/js/App.vue', 'src/js/views/Home.vue']);
  });

  it('adds vue config to webpack', () => {
    assert.fileContent(
      'webpack/webpack.config.babel.js',
      `'vue$': 'vue/dist/vue.esm.js',`
    );
    /* eslint-disable */
    assert.fileContent(
      'webpack/webpack.config.babel.js',
      "loader: 'vue-loader'"
    );
  });
});

describe('Vue Project Usage', () => {
  beforeAll(async () => {
    await run().withPrompts({
      projectUsage: 'vueapp'
    });
  });

  it('copies index.html file to dist', async () => {
    assert.file('src/views/index.html');
    assert.file('dist/index.html');
  });

  it('add vue devDependencies to package.json', () => {
    assert.JSONFileContent('package.json', {
      devDependencies: vueDependencies.devDependencies
    });
  });

  it('adds vue to package.json', () => {
    assert.JSONFileContent('package.json', {
      dependencies: vueDependencies.dependencies
    });
  });

  it('adds Vue Examples', () => {
    assert.file(['src/js/App.vue', 'src/js/views/Home.vue']);
  });

  it('copies index.html file to dist', async () => {
    assert.file('src/views/index.html');
    assert.file('dist/index.html');
  });

  it('adds router and vuex dependencies', () => {
    const pluginDependencies = Object.assign(
      vueDependencies.vueXDependencies,
      vueDependencies.routerDependencies
    );
    assert.jsonFileContent('package.json', {
      dependencies: pluginDependencies
    });
  });

  it('adds VueX and Vue Router to Vue instance to app.js', async () => {
    const vueCode = renderInstance(['store', 'router']);
    expect(vueCode).toMatchSnapshot();
    assert.fileContent('src/js/app.js', renderInstance(['store', 'router']));
  });

  it('adds vue config to webpack', () => {
    assert.fileContent(
      'webpack/webpack.config.babel.js',
      `'vue$': 'vue/dist/vue.esm.js',`
    );
    /* eslint-disable */
    assert.fileContent(
      'webpack/webpack.config.babel.js',
      "loader: 'vue-loader'"
    );
  });
});

describe('Vue Project with VueX', () => {
  beforeAll(() => {
    return runwithVue(['vuex']);
  })

  it('adds vuex to dependencies', () => {
    assert.jsonFileContent('package.json', {
      dependencies: vueDependencies.vueXDependencies
    });
  });

  it('adds VueX to Vue instance to app.js', async () => {
    const vueCode = renderInstance(['store']);
    expect(vueCode).toMatchSnapshot();
    assert.fileContent('src/js/app.js', renderInstance(['store']));
  });
});

describe('Vue Project with Vue Router', () => {
  beforeAll(() => {
    return runwithVue(['vuerouter']);
  })

  it('Router to dependencies', () => {
    assert.JSONFileContent('package.json', {
      dependencies: vueDependencies.routerDependencies
    });
  });

  it('adds Vue Router to Vue instance to app.js', async () => {
    const vueCode = renderInstance(['router']);
    expect(vueCode).toMatchSnapshot();
    assert.fileContent('src/js/app.js', renderInstance(['router']));
  });
})

describe('Vue Projects which uses both Plugins', () => {
  beforeAll(() => {
    runwithVue(['vuerouter', 'vuex'])
  })

  it('adds router and vuex dependencies', () => {
    const pluginDependencies = Object.assign(
      vueDependencies.vueXDependencies,
      vueDependencies.routerDependencies
    );
    assert.jsonFileContent('package.json', {
      dependencies: pluginDependencies
    });
  });
});
