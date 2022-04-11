module.exports = {
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                helpers: true,
                regenerator: true,
                corejs: false,
                useESModules: false
            }
        ],
        "@babel/plugin-syntax-dynamic-import",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],

        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-throw-expressions"
    ],
    presets: [
        "@babel/preset-env"
    ]
};
