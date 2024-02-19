/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      smallM:{'max':'480px'},
      mobile:{'max':'749px'},
      tablet: '750px',
      laptop: '930px',
      desktop: '1090px'
    },
    extend: {
      keyframes:{
        hoverWidth:{
          '0%':{width:'0%'},
          '100%':{width:'100%'}
        },
        flash:{
          '25%,40%':{opacity:'0.6'},
          '50%':{opacity:'1'},
          '75%':{opacity:'0.6'},
          '100%':{opacity:'1'}    
        },
        flip:{
          '50%':{transform:'rotateY(90deg)'},
          '100%':{transform:'rotateY(180deg)'},
        }
      }
    },
  },
  plugins: [],
}

