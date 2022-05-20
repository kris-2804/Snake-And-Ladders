const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./HTML/*'],
  theme: {
    extend: {
     
    },
    screens:{
      mobile:{'min':'0px', 'max': '430px'},

    }
  },
  plugins: [],
}
