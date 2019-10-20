// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
const existingConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');
module.exports = Object.assign(existingConfig, {
    copyFontawesomeFonts: {
      src: ['{{ROOT}}/node_modules/@fortawesome/fontawesome-free/webfonts/**/*'],
      dest: '{{WWW}}/assets/webfonts'
    },
    copyFontawesomeCss: {
      src: ['{{ROOT}}/node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css'],
      dest: '{{WWW}}/assets/css'
    },
    copyFontawesomeCss2: {
      src: ['{{ROOT}}/node_modules/@fortawesome/fontawesome-free/css/solid.min.css'],
      dest: '{{WWW}}/assets/css'
    },
    copyFontawesomeCss3: {
      src: ['{{ROOT}}/node_modules/@fortawesome/fontawesome-free/css/brands.min.css'],
      dest: '{{WWW}}/assets/css'
    },
    copyFontawesomeCss4: {
      src: ['{{ROOT}}/node_modules/@fortawesome/fontawesome-free/css/regular.min.css'],
      dest: '{{WWW}}/assets/css'
    }
  }
);
