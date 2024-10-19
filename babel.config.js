module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',  // Si tu utilises TypeScript
    '@babel/preset-react', // Ajoute ce preset pour React
  ],
};
