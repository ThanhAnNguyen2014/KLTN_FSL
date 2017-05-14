[1mdiff --git a/frontend/readme.txt b/frontend/readme.txt[m
[1mnew file mode 100644[m
[1mindex 0000000..bb72239[m
[1m--- /dev/null[m
[1m+++ b/frontend/readme.txt[m
[36m@@ -0,0 +1 @@[m
[32m+[m[32mThis is a folder frontend[m
\ No newline at end of file[m
[1mdiff --git a/frontend/user-io/.angular-cli.json b/frontend/user-io/.angular-cli.json[m
[1mnew file mode 100644[m
[1mindex 0000000..cb5793f[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/.angular-cli.json[m
[36m@@ -0,0 +1,57 @@[m
[32m+[m[32m{[m
[32m+[m[32m  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",[m
[32m+[m[32m  "project": {[m
[32m+[m[32m    "name": "user-io"[m
[32m+[m[32m  },[m
[32m+[m[32m  "apps": [[m
[32m+[m[32m    {[m
[32m+[m[32m      "root": "src",[m
[32m+[m[32m      "outDir": "dist",[m
[32m+[m[32m      "assets": [[m
[32m+[m[32m        "assets",[m
[32m+[m[32m        "favicon.ico"[m
[32m+[m[32m      ],[m
[32m+[m[32m      "index": "index.html",[m
[32m+[m[32m      "main": "main.ts",[m
[32m+[m[32m      "polyfills": "polyfills.ts",[m
[32m+[m[32m      "test": "test.ts",[m
[32m+[m[32m      "tsconfig": "tsconfig.app.json",[m
[32m+[m[32m      "testTsconfig": "tsconfig.spec.json",[m
[32m+[m[32m      "prefix": "app",[m
[32m+[m[32m      "styles": [[m
[32m+[m[32m        "styles.css"[m
[32m+[m[32m      ],[m
[32m+[m[32m      "scripts": [],[m
[32m+[m[32m      "environmentSource": "environments/environment.ts",[m
[32m+[m[32m      "environments": {[m
[32m+[m[32m        "dev": "environments/environment.ts",[m
[32m+[m[32m        "prod": "environments/environment.prod.ts"[m
[32m+[m[32m      }[m
[32m+[m[32m    }[m
[32m+[m[32m  ],[m
[32m+[m[32m  "e2e": {[m
[32m+[m[32m    "protractor": {[m
[32m+[m[32m      "config": "./protractor.conf.js"[m
[32m+[m[32m    }[m
[32m+[m[32m  },[m
[32m+[m[32m  "lint": [[m
[32m+[m[32m    {[m
[32m+[m[32m      "project": "src/tsconfig.app.json"[m
[32m+[m[32m    },[m
[32m+[m[32m    {[m
[32m+[m[32m      "project": "src/tsconfig.spec.json"[m
[32m+[m[32m    },[m
[32m+[m[32m    {[m
[32m+[m[32m      "project": "e2e/tsconfig.e2e.json"[m
[32m+[m[32m    }[m
[32m+[m[32m  ],[m
[32m+[m[32m  "test": {[m
[32m+[m[32m    "karma": {[m
[32m+[m[32m      "config": "./karma.conf.js"[m
[32m+[m[32m    }[m
[32m+[m[32m  },[m
[32m+[m[32m  "defaults": {[m
[32m+[m[32m    "styleExt": "css",[m
[32m+[m[32m    "component": {}[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[1mdiff --git a/frontend/user-io/.editorconfig b/frontend/user-io/.editorconfig[m
[1mnew file mode 100644[m
[1mindex 0000000..6e87a00[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/.editorconfig[m
[36m@@ -0,0 +1,13 @@[m
[32m+[m[32m# Editor configuration, see http://editorconfig.org[m
[32m+[m[32mroot = true[m
[32m+[m
[32m+[m[32m[*][m
[32m+[m[32mcharset = utf-8[m
[32m+[m[32mindent_style = space[m
[32m+[m[32mindent_size = 2[m
[32m+[m[32minsert_final_newline = true[m
[32m+[m[32mtrim_trailing_whitespace = true[m
[32m+[m
[32m+[m[32m[*.md][m
[32m+[m[32mmax_line_length = off[m
[32m+[m[32mtrim_trailing_whitespace = false[m
[1mdiff --git a/frontend/user-io/.gitignore b/frontend/user-io/.gitignore[m
[1mnew file mode 100644[m
[1mindex 0000000..54bfd20[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/.gitignore[m
[36m@@ -0,0 +1,42 @@[m
[32m+[m[32m# See http://help.github.com/ignore-files/ for more about ignoring files.[m
[32m+[m
[32m+[m[32m# compiled output[m
[32m+[m[32m/dist[m
[32m+[m[32m/tmp[m
[32m+[m[32m/out-tsc[m
[32m+[m
[32m+[m[32m# dependencies[m
[32m+[m[32m/node_modules[m
[32m+[m
[32m+[m[32m# IDEs and editors[m
[32m+[m[32m/.idea[m
[32m+[m[32m.project[m
[32m+[m[32m.classpath[m
[32m+[m[32m.c9/[m
[32m+[m[32m*.launch[m
[32m+[m[32m.settings/[m
[32m+[m[32m*.sublime-workspace[m
[32m+[m
[32m+[m[32m# IDE - VSCode[m
[32m+[m[32m.vscode/*[m
[32m+[m[32m!.vscode/settings.json[m
[32m+[m[32m!.vscode/tasks.json[m
[32m+[m[32m!.vscode/launch.json[m
[32m+[m[32m!.vscode/extensions.json[m
[32m+[m
[32m+[m[32m# misc[m
[32m+[m[32m/.sass-cache[m
[32m+[m[32m/connect.lock[m
[32m+[m[32m/coverage[m
[32m+[m[32m/libpeerconnection.log[m
[32m+[m[32mnpm-debug.log[m
[32m+[m[32mtestem.log[m
[32m+[m[32m/typings[m
[32m+[m
[32m+[m[32m# e2e[m
[32m+[m[32m/e2e/*.js[m
[32m+[m[32m/e2e/*.map[m
[32m+[m
[32m+[m[32m# System Files[m
[32m+[m[32m.DS_Store[m
[32m+[m[32mThumbs.db[m
[1mdiff --git a/frontend/user-io/.vscode/settings.json b/frontend/user-io/.vscode/settings.json[m
[1mnew file mode 100644[m
[1mindex 0000000..0c4a669[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/.vscode/settings.json[m
[36m@@ -0,0 +1,3 @@[m
[32m+[m[32m{[m
[32m+[m[32m    "vsicons.presets.angular": false[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/frontend/user-io/e2e/app.e2e-spec.ts b/frontend/user-io/e2e/app.e2e-spec.ts[m
[1mnew file mode 100644[m
[1mindex 0000000..b0a7d3b[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/e2e/app.e2e-spec.ts[m
[36m@@ -0,0 +1,14 @@[m
[32m+[m[32mimport { UserIoPage } from './app.po';[m
[32m+[m
[32m+[m[32mdescribe('user-io App', () => {[m
[32m+[m[32m  let page: UserIoPage;[m
[32m+[m
[32m+[m[32m  beforeEach(() => {[m
[32m+[m[32m    page = new UserIoPage();[m
[32m+[m[32m  });[m
[32m+[m
[32m+[m[32m  it('should display message saying app works', () => {[m
[32m+[m[32m    page.navigateTo();[m
[32m+[m[32m    expect(page.getParagraphText()).toEqual('app works!');[m
[32m+[m[32m  });[m
[32m+[m[32m});[m
[1mdiff --git a/frontend/user-io/e2e/app.po.ts b/frontend/user-io/e2e/app.po.ts[m
[1mnew file mode 100644[m
[1mindex 0000000..b0f016d[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/e2e/app.po.ts[m
[36m@@ -0,0 +1,11 @@[m
[32m+[m[32mimport { browser, element, by } from 'protractor';[m
[32m+[m
[32m+[m[32mexport class UserIoPage {[m
[32m+[m[32m  navigateTo() {[m
[32m+[m[32m    return browser.get('/');[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  getParagraphText() {[m
[32m+[m[32m    return element(by.css('app-root h1')).getText();[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[1mdiff --git a/frontend/user-io/e2e/tsconfig.e2e.json b/frontend/user-io/e2e/tsconfig.e2e.json[m
[1mnew file mode 100644[m
[1mindex 0000000..ac7a373[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/e2e/tsconfig.e2e.json[m
[36m@@ -0,0 +1,12 @@[m
[32m+[m[32m{[m
[32m+[m[32m  "extends": "../tsconfig.json",[m
[32m+[m[32m  "compilerOptions": {[m
[32m+[m[32m    "outDir": "../out-tsc/e2e",[m
[32m+[m[32m    "module": "commonjs",[m
[32m+[m[32m    "target": "es5",[m
[32m+[m[32m    "types":[[m
[32m+[m[32m      "jasmine",[m
[32m+[m[32m      "node"[m
[32m+[m[32m    ][m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[1mdiff --git a/frontend/user-io/karma.conf.js b/frontend/user-io/karma.conf.js[m
[1mnew file mode 100644[m
[1mindex 0000000..84b4cd5[m
[1m--- /dev/null[m
[1m+++ b/frontend/user-io/karma.conf.js[m
[36m@@ -0,0 +1,44 @@[m
[32m+[m[32m// Karma configuration file, see link for more information[m
[32m+[m[32m// https://karma-runner.github.io/0.13/config/configuration-file.html[m
[32m+[m
[32m+[m[32mmodule.exports = function (config) {[m
[32m+[m[32m  config.set({[m
[32m+[m[32m    basePath: '',[m
[32m+[m[32m    frameworks: ['jasmine', '@angular/cli'],[m
[32m+[m[32m    plugins: [[m
[32m+[m[32m      require('karma-jasmine'),[m
[32m+[m[32m      require('karma-chrome-launcher'),[m
[32m+[m[32m      require('karma-jasmine-html-reporter'),[m
[32m+[m[32m      require('karma-coverage-istanbul-reporter'),[m
[32m+[m[32m      require('@angular/cli/plugins/karma')[m
[32m+[m[32m    ],[m
[32m+[m[32m    client:{[m
[32m+[m[32m      clearContext: false // leave Jasmine Spec Runner output visible in browser[m
[32m+[m[32m    },[m
