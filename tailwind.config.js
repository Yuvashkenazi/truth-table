module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    maxWidth: {
      'xxs': '8rem',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    extend: {},
  },
  variants: {
    borderWidth: ['responsive, hover, focus, active']
  },
  plugins: [],
}
