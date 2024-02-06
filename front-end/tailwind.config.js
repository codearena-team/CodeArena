/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        'sans' :['sulight'],
        'sulight' :['sulight']
      }
    },
    animatedSettings: {
      animatedSpeed: 1000,
      heartBeatSpeed: 500,
      hingeSpeed: 2000,
      bounceInSpeed: 750,
      bounceOutSpeed: 750,
      animationDelaySpeed: 500,
      classes: ['bounce', 'heartBeat']
    }
  },
  plugins: [
    // Other plugins
    require('tailwindcss-animatecss'),
    require("daisyui"),
  ],
  
  
}

