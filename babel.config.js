module.exports = {
    presets: [
        '@babel/preset-react',
        // Need targets -> node = 'current' for regeneratorRuntime
        ['@babel/preset-env', {targets: {node: 'current'}}]
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-async-generator-functions',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-transform-modules-commonjs'
    ]
};
