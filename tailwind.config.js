/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        'ibm-regular' : ['IBMPlexSansThai-Regular', 'sans-serif'],
        // 'ibm-bold' : ['IBMPlexSansThai-bold', 'sans-serif']
      }
    },
  },
  plugins: [],
}

