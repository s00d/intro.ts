const path = require('path')

module.exports = ({ file, options, mode}) => ({
    // parser: file && file.extname === '.sss' ? 'sugarss' : false,
    plugins: [
        require('autoprefixer')({
            cascade: false
        }),
        require('postcss-nested'),
        require('postcss-sort-media-queries')({
            sort: 'mobile-first'
        }),
        require('postcss-mixins'),

        require('postcss-preset-env'),
        // require('postcss-url'),
        require('postcss-discard-comments'),
        require('postcss-strip-inline-comments'),
        require('postcss-sassy-mixins'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('pixrem'),
        require('postcss-easy-import'),
        require('postcss-normalize')({
            browsers: "last 10 versions"
        }),
        require('postcss-flexbugs-fixes'),
        require('cssnano')(mode === 'production' ? {} : false),
        require('postcss-css-variables'),
    ],
})
