/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {

    fontFamily: {
      "font-family": "Roboto,sans-serif",
      // "font-weight": "500",
    },

    extend: {

      animation: {
        pulse: 'pulse 1.8s ease-in-out infinite', // Customize the animation properties
        odds: 'odds 500ms ease-in-out ',
        lay: 'lays 500ms ease-in-out ',

      },
      keyframes: {
        odds: {
          '0%, 100%': {
            backgroundColor: 'var(--blink-animation-blue-background)',
            transform: 'scale(1)',
          },
          '50%': {
            backgroundColor: 'var(--blink-animation-blue-background)', 
            transform: 'scale(1.05)',
          },
        },
        lays: {
          '0%, 100%': {
            backgroundColor: 'var(--blink-animation-pink-background)',
            transform: 'scale(1)',
          },
          '50%': {
            backgroundColor: 'var(--blink-animation-pink-background)', 
            transform: 'scale(1.05)',
          },
        },
      },
      colors: {
        borderColor: "var(--border)",
        mainbg: "var(--main-background)",
      },
      textColor: {
        skin: {
          primary: "var( --text-primary)",
          navtext: "var(--text-nav)",
          green: "var(--text-green)",
          secondary: "var(--text-secondary)",
          white: "var(--text-white)",
          blue: "var(--text-blue)",
          pink: "var(--text-pink)",
          dark: "var( --text-dark)",
          balance: "var(--text-balance)",
          profitLossTable: "var(--profitLossTable)",
          sun: "var(--sun)",

          textNavBar:'var(--text-Navbar-primary)',
          textSideBar:'var(--text-Sidebar-primary)',
          textPrimaryColor:'var(--text-primary-color)',
          ProfitLossPrimaryColor:'var(--text-profitLoss)',
          FontSecondaryColor:'var(--font-secondary-color)',
          sideBarHover:'var(--side-bar-hover)',


          containerText:'var(--container-text-color)',
          containerTextPrimary:'var(--container-text-primary-color)',
          loginBtnText:'var(--login-button-text-color)',
          oddsSizeText:'var(--container-size-odds-color)',
          
          marketCardTextPink:'var(--market-runner-card-pink-text)',
          marketCardTextBlue:'var(--market-runner-card-blue-text)',

          liveIconText:'var(--live-icon-text)',
          loginButtonFontBg:'var(--login-button-font-color)',
          
          navbarActiveIconBg:'var(--navbar-active-icon-background)',
          sidebarContainerText:'var(--sidebar-container-text)',
          horseRaceSideNavBar :'var(--sidebar-selector)'
          
          


          
        },
      },
      width: {
        'oodsContainerWidth':'50px'
      },
      backgroundColor: {
        skin: {
          blue: "var(--bg-blue)",
          pink: "var(--bg-pink)",
          main: "var(--main-background)",
          navtop: "var(--nav-colortop)",
          sidebarbg: "var(--sidebar-color)",
          nav: "var( --nav-color)",
          cardhead: "var(--card-heading-bg-color)",
          cardsmall: "var( --card-small-card)",
          imgbg: "var( --img-bg-color)",
          hovercolor: "var(--hover-color)",
          hovercolorsecondary: "var(--hover-color-secondary)",
          marketcard: "var(--market-runner-card)",
          sidenavhover: "var( --side-navbar-hover)",
          sidenavhoversecondary: "var(--side-navbar-hover-secondary)",
          mainNavbarHoverColor: "var(--main-navbar-hover)",
          oddsCardPink: "var(--market-runner-card-pink)",
          oddsCardBlue: "var(--market-runner-card-blue)",
          oddsSecondaryPink: "var(--market-runner-card-secondary-pink)",
          oddsSecondaryBlue: "var(--market-runner-card-secondary-blue)",
          betslipBlue: "var(--betslip-blue)",
          betslipRed: "var(--betslip-red)",
          navBackground: "var(--navBackground)",
          modalBackground: "var(--modalBackground)",
          inputBackground: "var(--inputBackground)",
          modalBackgroundBlur: "var(--modalBackgroundBlur)",
          loginBtn: "var(--loginBtn)",
          loginBtnNav: "var(--loginBtnNav)",
          bookModalGreen: "var(--bookModalGreen)",
          bookModalRed: "var(--bookModalRed)",
          chipBg: "var(--chipBg)",

          balanceIcon:'var(--icon-Navbar-balance-Icon)',
          SidebarPrimaryColor:'var(--sidebar-primary-color)',
          SidebarMainColor:'var(--text-primary-color)',
          sideBarHover:'var(--side-bar-hover)',
          
          
          containerBg:'var(--container-background-color)',
          containerTextGray:'var( --container-text-gray-color)',

          liveContainerBg:'var(--live-icon-background)',
          MinMaxContainerBg:'var(--min-max-bg-color)',
          loginButtonBg:'var(--login-button-color)',
          sidebarContainerBg:'var(--sidebar-container)',
          horseRacingContainerBg:'var(--horseRace-container)',
          horseRacingContainer:'var(--horseRace-container-bg)',
          horseRacingConatinerWhite : 'var(--horseRace-Container-BgWhite)',
          horseRacingSelector :'var(--horseRacingSelector)',





          
        }
      },
      screens: {
        'mobilescreen': '430px',
      },

    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        // '.no-scrollbar::-webkit-scrollbar': {
        //   display: 'none',
        // },
      });
    },
  ],
}



