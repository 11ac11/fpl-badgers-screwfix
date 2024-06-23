const size = {
  xxs: '350px', // for small screen mobile
  xs: '400px', // for small screen mobile
  sm: '600px', // for mobile screen
  md: '900px', // for tablets
  lg: '1280px', // for laptops
  xl: '1441px', // for desktop / monitors
  xxl: '1920px', // for big screens
};

export const device = {
  xxs: `(max-width: ${size.xxs})`, // 350px
  xs: `(max-width: ${size.xs})`, // 400px
  sm: `(max-width: ${size.sm})`, // 600px
  md: `(max-width: ${size.md})`, // 900px
  lg: `(max-width: ${size.lg})`, // 1280px
  xl: `(min-width: ${size.xl})`, // 1440px
  xxl: `(min-width: ${size.xxl})`, // 1920px
};
