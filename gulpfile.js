'use strict';

function camelCase(name) {
	name = name.split('-')
	if (name.length > 1) {
		for (let i=1; i<name.length; i++) {
			name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1)
		}
	}
	return name.join('')
}

const argv = require('yargs')
	.usage("\n\x1b[1mUsage:\x1b[0m gulp \x1b[36m<command>\x1b[0m \x1b[34m[options]\x1b[0m")
	.command(['serve', '*'], 'Compile files and start server', {
		port: {
			describe: 'The server port to listen to',
			type: 'number',
			default: 3000,
			alias: 'p'
		}
	})
	.command('compile', 'Compile all files and output to docs folder')
	.command('generate:component', 'Generate a new component', {
		name: {
			describe: 'Name for your new component',
			required: true,
			alias: 'n',
		},
	})
	.command('generate:page', 'Generate a new page', {
		name: {
			describe: 'Name for your new page',
			required: true,
			alias: 'n',
		},
	})
	.command('lint', 'Lint all JavaScript and Sass/SCSS files')
	.command('transfer-files', 'Transfer all static assets and resources to docs folder')
	.command('watch', 'Watch files for changes to recompile')
	.help('?')
	.epilog(' ©2017 Samuel B Grundman')
	.argv

const gulp = require('gulp'),
	cli = require('gulp-run-command').default,
	path = require('path'),

plugins = {
	server: require('gulp-webserver'),
	prefixCSS: require('gulp-autoprefixer'),
	sourcemaps: require('gulp-sourcemaps'),
	compileHTML: require('gulp-htmlmin'),
	lintHTML: require('gulp-html-lint'),
	lintSass: require('gulp-sass-lint'),
	rmLines: require('gulp-rm-lines'),
	compileSass: require('gulp-sass'),
	compileJS: require('gulp-babel'),
	concat: require('gulp-concat'),
	lintES: require('gulp-eslint'),
	newFile: require('gulp-file'),
	sort: require('gulp-order'),
	ssi: require('gulp-ssi'),
},

options = {
	compileJS:{
		comments: false,
		minified: true,
		babelrc: false,
		compact: true,
		plugins: [
			'transform-exponentiation-operator',
//			'transform-remove-console'
		],
		presets: [
			'es2015',
			'react',
		]
	},
	compileSass:{
		outputStyle: 'compressed'
	},
	compileHTML:{
		collapseWhitespace: true,
		decodeEntities: true,
		keepClosingSlash: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		useShortDoctype: true,
	},
	lintES:{
		parserOptions: {
			ecmaVersion: 2015,
		},
		env: {
			browser: true,
			es6: true
		},
		rules: {

'strict': [
	2, 'global'
],
'indent': [
	2, 'tab'
],
'space-before-function-paren': 0,
'comma-dangle': 0,
'no-console': 0,
'no-undef': 0,
'no-tabs': 0,
'semi': 0,

		}
	},
	lintSass:{
		files: {
			ignore: '**/*.min.css'
		},
		rules: {

'extends-before-mixins': 1,
'extends-before-declarations': 1,
'placeholder-in-extend': 1,
'mixins-before-declarations': 1,
'one-declaration-per-line': 1,
'empty-line-between-blocks': 1,
'single-line-per-selector': 1,
'no-attribute-selectors': 0,
'no-color-hex': 0,
'no-color-keywords': 0,
'no-color-literals': 1,
'no-combinators': 0,
'no-css-comments': 1,
'no-debug': 1,
'no-disallowed-properties': 1,
'no-duplicate-properties': [
	1, { exclude: [
		'display',
	]}
],
'no-empty-rulesets': 1,
'no-extends': 1,
'no-ids': 1,
'no-important': 1,
'no-invalid-hex': 1,
'no-mergeable-selectors': 1,
'no-misspelled-properties': 1,
'no-qualifying-elements': 1,
'no-trailing-whitespace': 1,
'no-trailing-zero': 1,
'no-transition-all': 0,
'no-universal-selectors': 0,
'no-url-domains': 1,
'no-url-protocols': 1,
'no-vendor-prefixes': 1,
'no-warn': 1,
'property-units': 1,
'declarations-before-nesting': 1,
'force-attribute-nesting': 1,
'force-element-nesting': 0,
'force-pseudo-nesting': 1,
'class-name-format': 1,
'function-name-format': 1,
'id-name-format': 1,
'mixin-name-format': 1,
'placeholder-name-format': 1,
'variable-name-format': 1,
'attribute-quotes': 1,
'bem-depth': 1,
'border-zero': 1,
'brace-style': 1,
'clean-import-paths': 1,
'empty-args': 1,
'hex-length': [
	2, { style: 'long' }
],
'hex-notation': 1,
'indentation': [
	2, { size: 'tab' }
],
'leading-zero': [
	2, { include: true }
],
'max-line-length': 0,
'max-file-line-count': 1,
'nesting-depth': 1,
'property-sort-order': 0,
'pseudo-element': 1,
'quotes': 1,
'shorthand-values': 1,
'url-quotes': 1,
'variable-for-property': 1,
'zero-unit': 1,
'space-after-comma': 1,
'space-before-colon': 1,
'space-after-colon': 1,
'space-before-brace': 1,
'space-before-bang': 1,
'space-after-bang': 1,
'space-between-parens': 1,
'space-around-operator': 1,
'trailing-semicolon': 2,
'final-newline': 2

		}
	},
	lintHTML:{
		useHtmllintrc: false,
		rules: {

'attr-name-style': false,
'attr-no-dup': true,
'attr-req-value': false,
'attr-bans':false,
'class-name-style': 'dash',
'class-no-dup': true,
'doctype-html5': true,
'fig-req-figcaption': false,
'head-req-title': true,
'head-valid-content-model': true,
'html-req-lang': true,
'id-class-style': 'dash',
'id-no-dup': true,
'img-req-alt': true,
'img-req-src': true,
'indent-style': 'tabs',
'indent-width-cont': true,
'input-radio-req-name': true,
'input-req-label': true,
'label-req-for': true,
'line-end-style': 'lf',
'table-req-caption': false,
'table-req-header': false, // this is buggy in htmllint (https://github.com/htmllint/htmllint/issues/197)
'tag-bans': [
	'acronym','applet','basefont','big','blink','center','font','frame','frameset','isindex','noframes','marquee',
	'style',
],
'tag-close': true,
'tag-name-lowercase': false,
'tag-name-match': false,
'tag-self-close': 'always',
'title-no-dup': true,

		}
	},
	prefixCSS:{
		// more options at https://github.com/postcss/autoprefixer#options
		browsers: [
			// browser strings detailed at https://github.com/ai/browserslist#queries
			'last 2 Firefox versions',
			'last 2 Chrome versions',
			'Safari >= 10',
			'ie_mob >= 11',
			'ie >= 11'
		],
		cascade: false
	},
	dest: 'docs/',
	rmLines:{
		filters:[
			/^[\'"]use strict[\'"];$/,
			/^\s*$/
		]
	},
	concat:{
		css:{
			path: 'min.css',
			ignore: /pages\/.*\.(sc|sa|c)ss/,
		},
		js:{
			path: 'min.js'
		}
	},
	server:{
		path: '/southpark-transit/',
		directoryListing: false,
		defaultFile: 'index.html',
		fallback: 'index.html',
		// Ugh, can't watch on Windows yet >_<
		livereload: true,
		port: argv.port,
	},
	sort:{
		css:[
			'main.scss',
			'components/**/*.{sa,sc,c}ss',
			'**/*.{sa,sc,c}ss',
		],
		js:[
			'**/module.js',
			'{components,pages}/**/*.js',
			'app.js',
		]
	},
	ssi:{
		root: 'src'
	}
}

function runTasks(task) {
	const fileType = task.fileType || 'static'
	let stream = gulp.src(task.src)
	const tasks = task.tasks

	// Output Linting Results
	;[
		'lintHTML',
		'lintSass',
		'lintES'
	].forEach((task) => {
		if (tasks.indexOf(task) != -1) {
			let option = options[task] || {}
			if (option[fileType]) option = option[fileType]
			stream = stream.pipe(plugins[task](option))
			stream = stream.pipe(plugins[task].format())
		}
	})

	// Init Sourcemaps
	stream = stream.pipe(plugins.sourcemaps.init())

	// Run each task
	if (tasks.length) for (let i=0, k=tasks.length; i<k; i++) {
		if (['lintHTML', 'lintSass', 'lintES'].indexOf(tasks[i]) !== -1) continue;
		let option = options[tasks[i]] || {}
		if (option[fileType]) option = option[fileType]
		stream = stream.pipe(plugins[tasks[i]](option))
	}

	// Write Sourcemap
	stream = stream.pipe(plugins.sourcemaps.write())

	// Output Files
	return stream.pipe(gulp.dest(options.dest))
}

;[
	{
		name: 'compile:sass',
		src: [
			'src/**/*.{sa,sc,c}ss',
			'!**/*.min.css',
			'!**/min.css'
		],
		tasks: [
			'lintSass',
			'compileSass',
			'prefixCSS',
			'sort',
			'concat',
			'rmLines',
		],
		fileType: 'css'
	},
	{
		name: 'compile:js',
		src: [
			'src/**/*.js',
			'!**/*.min.js',
			'!**/min.js'
		],
		tasks: [
			'lintES',
			'sort',
			'concat',
			'rmLines',
			'compileJS',
		],
		fileType: 'js'
	},
	{
		name: 'compile:html',
		src: [
			'./src/**/*.html',
			'!**/includes/**/*.html'
		],
		tasks: [
			'lintHTML',
			'ssi',
			'compileHTML',
		],
		fileType: 'html'
	},
	{
		name: 'transfer:assets',
		src: [
			'./src/**/*.jp{,e}g',
			'./src/**/*.json',
			'./src/**/*.gif',
			'./src/**/*.png',
			'./src/**/*.ttf',
		],
		tasks: []
	}
].forEach((task) => {
	gulp.task(task.name, () => {
		return runTasks(task)
	})
})

gulp.task('lint:html', () => {
	return gulp.src([
		'src/**/*.html',
	])
		.pipe(plugins.lintHTML(options.lintHTML))
		.pipe(plugins.lintHTML.failOnError())
		.pipe(plugins.lintHTML.format())
})

gulp.task('lint:sass', () => {
	return gulp.src([
		'src/**/*.{sa,sc,c}ss',
		'!**/*.min.css',
		'!**/min.css'
	])
		.pipe(plugins.lintSass(options.lintSass))
		.pipe(plugins.lintSass.failOnError())
		.pipe(plugins.lintSass.format())
})

gulp.task('lint:js', () => {
	return gulp.src([
		'src/**/*.js',
		'!**/*.min.js',
		'!**/min.js'
	])
		.pipe(plugins.lintES(options.lintES))
		.pipe(plugins.lintES.failOnError())
		.pipe(plugins.lintES.format())
})

gulp.task('lint', gulp.parallel('lint:sass', 'lint:js', 'lint:html'))

gulp.task('transfer:res', () => {
	return gulp.src([
		'./node_modules/angular/angular.min.js{,.map}',
		'./node_modules/angular-route/angular-route.min.js{,.map}',
	])
		.pipe(gulp.dest(path.join(options.dest, 'res')))
})

gulp.task('transfer-files', gulp.parallel('transfer:assets', 'transfer:res'))

gulp.task('compile', gulp.series(
	'lint',
	gulp.parallel('compile:html', 'compile:js', 'compile:sass', 'transfer-files')
))

gulp.task('watch', () => {
	gulp.watch('./src/**/*.{sa,sc,c}ss', gulp.series('compile:sass'))
	gulp.watch('./src/**/*.html', gulp.series('compile:html'))
	gulp.watch('./src/**/*.js', gulp.series('compile:js'))
})

gulp.task('serve', () => {
	return gulp.src('./docs/')
		.pipe(plugins.server(options.server))
})

gulp.task('generate:page', gulp.series(
	cli([
		`mkdir -pv ./src/pages/${argv.name}`,
		`touch -a ./src/pages/${argv.name}/${argv.name}.scss`,
	]),
	() => {
		const str = `<h2>${argv.name}</h2>\n`
		return plugins.newFile(`${argv.name}.html`, str, { src: true })
			.pipe(gulp.dest(`./src/pages/${argv.name}`))
	},
	() => {
		const str = `'use strict';\n\nangular.module('${camelCase('page-'+argv.name)}', [\n\t'ngRoute',\n])\n`
		return plugins.newFile('module.js', str, { src: true })
			.pipe(gulp.dest(`./src/pages/${argv.name}`))
	},
	() => {
		const str = `'use strict';\n
angular.module('${camelCase('page-'+argv.name)}')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/${argv.name}', {
		templateUrl: 'pages/${argv.name}/${argv.name}.html',
	})
}])\n`
		return plugins.newFile(`routes.js`, str, { src: true })
			.pipe(gulp.dest(`./src/pages/${argv.name}`))
	},
	// TODO: Add to app.module.js
	cli([
		`git status`,
	])
))

gulp.task('generate:component', gulp.series(
	cli([
		`mkdir -pv src/components/${argv.name}`,
		`touch -a src/components/${argv.name}/${argv.name}.html`,
		`touch -a src/components/${argv.name}/${argv.name}.scss`,
	]),
	() => {
		const str = `'use strict';\n\nangular.module('${camelCase('comp-'+argv.name)}', [])\n`
		return plugins.newFile('module.js', str, { src: true })
			.pipe(gulp.dest(`./src/components/${argv.name}`))
	},
	() => {
		const str = `'use strict';\n
angular.module('${camelCase('comp-'+argv.name)}')
.component('${camelCase(argv.name)}', {
\ttemplateUrl: 'components/${argv.name}/${argv.name}.html',
\tcontroller() {
\t}
})\n`
		return plugins.newFile(`${argv.name}.js`, str, { src: true })
			.pipe(gulp.dest(`./src/components/${argv.name}`))
	},
	// TODO: Add to app.module.js
	cli([
		`git status`,
	])
))

gulp.task('default', gulp.series(
	'compile',
	'serve'
	// Ugh, can't watch on Windows yet >_<
	,'watch'
))
