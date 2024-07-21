module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}], '@babel/preset-react', '@babel/preset-typescript'],
    plugins: ['@babel/plugin-transform-class-properties', '@babel/plugin-proposal-private-methods'],
};
