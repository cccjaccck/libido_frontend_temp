const themeColor = '#A7D8D5';
const themeColorLight = '#ADDEDB';
const themeColorGreen = '#0ADB7A';
const themeColorBlue = '#098DF9';
const themeColorYellow = '#EFE52D';
const themeColorRed = '#FF6128';
const themeColorViolet = '#240F39';
const textDefaultBlack = 'rgba(0, 0, 0, .87)';
const theme = {
    themeColor,
    themeColorGreen,
    themeColorBlue,
    themeColorYellow,
    themeColorRed,
    themeColorLight,
    themeColorViolet,
    h1 : `
        font-size: 96px;
        font-weight: 300;
        letter-spacing: -0.01em;
        color: ${textDefaultBlack};
        line-height: 112px;
    `,
    h2 : `
        font-weight: 300;
        font-size: 60px;
        letter-spacing: -0.01em;
        line-height: 72px;
        color: ${textDefaultBlack};
    `,
    h3 : `
        font-weight: 400;
        font-size: 48px;
        line-height: 56px;
        color: ${textDefaultBlack};
    `,
    h4 : `
        font-weight: 400;
        font-size: 34px;
        line-height: 36px;
        color: ${textDefaultBlack};
    `,
    h5 : `
        font-weight: 400;
        font-size: 24px;
        letter-spacing: 0.01em;
        line-height: 24px;
        color: ${textDefaultBlack};
    `,
    h6 : `
        font-weight: 500;
        font-size: 20px;
        letter-spacing: 0.01em;
        line-height: 24px;
        color: ${textDefaultBlack};
    `,
    subTitle1 : `
        font-weight: 400;
        font-size: 16px;
        letter-spacing: 0.01em;
        line-height: 24px;
        color: ${textDefaultBlack};
    `,
    subTitle2 : `
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.01em;
        line-height: 24px;
        color: ${textDefaultBlack};
    `,
    bodyFont1 : `
        font-weight: 400;
        font-size: 16px;
        letter-spacing: 0.03em;
        line-height: 24px;
        color: ${textDefaultBlack};
    `,
    bodyFont2 : `
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 0.02em;
        line-height: 20px;
        color: ${textDefaultBlack};
    `,
    buttonText : `
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.09em;
        line-height: 16px;
        color: ${textDefaultBlack};
    `,
    caption : `
        font-weight: 400;
        font-size: 12px;
        letter-spacing: 0.03em;
        line-height: 16px;
        color: ${textDefaultBlack};
    `,
    overline : `
        font-weight: 500;
        font-size: 10px;
        letter-spacing: 0.15em;
        line-height: 16px;
        color: ${textDefaultBlack};
    `,
    chat : `
        font-weight: 400;
        font-size: 8px;
        line-height: 10px;
        color: #2d3e50;
    `
}

export default theme;