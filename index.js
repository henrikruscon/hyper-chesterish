// Syntax scheme
const backgroundColor   = '#293340';
const foregroundColor   = '#CDD2E9';
const cursorColor       = '#2C85F7';
const borderColor       = '#323E4D';
const colors            = {
      black             : backgroundColor,
      red               : '#E17E85',
      green             : '#61BA86',
      yellow            : '#FFEC8E',
      blue              : '#4CB2FF',
      magenta           : '#BE86E3',
      cyan              : '#2DCED0',
      white             : foregroundColor,
      lightBlack        : '#546386',
      lightRed          : '#E17E85',
      lightGreen        : '#61BA86',
      lightYellow       : '#FFB68E',
      lightBlue         : '#4CB2FF',
      lightMagenta      : '#BE86E3',
      lightCyan         : '#2DCED0',
      lightWhite        : foregroundColor
};

// Config
exports.decorateConfig = config => {
    return Object.assign({}, config, {
        foregroundColor,
        backgroundColor,
        borderColor,
        colors,
        cursorColor: config.cursorColor || cursorColor,
        cursorShape: config.cursorShape || 'BEAM',
        fontSize: config.fontSize || 12,
        fontFamily: config.fontFamily || '"Fira Code"',
        termCSS: `
            ${config.termCSS || ''}
            ::selection {
                background: #9198A2 !important;
            }
            x-screen x-row {
                font-variant-ligatures: initial;
            }
            span {
                font-weight: normal !important;
            }
        `,
        css: `
            ${config.css || ''}
            ::selection {
                background: #9198A2 !important;
            }
        `
    });
};
