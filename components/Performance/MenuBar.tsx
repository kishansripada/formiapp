import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MenuButton } from './MenuButton'; 

export const MenuBar = ({ screenWidth , screenHeight}) => {
  let horizontalMode = screenWidth > screenHeight;
  let buttonDim = 0;
  let styles = StyleSheet.create({});
  if(horizontalMode){
    buttonDim = screenHeight / 12;
    styles = StyleSheet.create({
      menuBar: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: screenWidth,
        height: buttonDim,
        backgroundColor: '#262626',
        margin: 20,
        borderColor: 'transparent', // Set the border color to transparent
      },
    });
  } 
  else {
    buttonDim = screenHeight / 15;
    styles = StyleSheet.create({
      menuBar: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: screenWidth,
        height: buttonDim,
        backgroundColor: '#262626',
        margin: 20,
        borderColor: 'transparent', // Set the border color to transparent
      },
    });
  }
  
  // State to keep track of the active button index
  const [activeIndex, setActiveIndex] = useState(null);
  

  
  let iconColor = "white";
  let clickedColor = "#dc2f79";

  // button svgs and labels
  const menuButtons = [
    { svg: 
      `<svg
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24"
       strokeWidth="1.5"
       stroke="${iconColor}"
       fill="none"
     >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
       />
     </svg>`, label: 'Form'},
    { svg: 
   `<svg
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24"
       strokeWidth="1.5"
       stroke="${iconColor}"
       fill="none"
     >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
       />
     </svg>`,
   label: 'Roster'},
    { svg: 
    `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="${iconColor}"
    fill="none"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
    />
  </svg>`, label: 'Media'},
    {svg: 
    `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="${iconColor}"
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    `, label: 'Props'
      },
    {svg: 
      `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="${iconColor}"
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>`, label: 'Stage'},
    {svg:
      `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="${iconColor}"
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`, label: 'Settings'}
  ];


  const handleClicks = [
    () => {
      console.log("Handle click for Form")
    },
    () => {
      console.log("Handle click for Roster")
    },
    () => {
      console.log("Handle click for Media")
    },
    () => {
      console.log("Handle click for Props")
    },
    () => {
      console.log("Handle click for Stage")
    },
    () => {
      console.log("Handle click for Settings")
    },
  ];

  // Function to handle button click
  const handleButtonClick = (index) => {
    handleClicks[index]();
    setActiveIndex(index);
    
     // Set the active button index
  };

  var buttonArray = menuButtons.map((button, idx) => (
    <MenuButton
      key={idx}
      svg={button.svg.replace(iconColor, idx === activeIndex ? clickedColor : iconColor)} // Replace color based on active state
      buttonDim={buttonDim}
      onPress={() => handleButtonClick(idx)} // Set the current button as active
      textColor={idx === activeIndex ? clickedColor : iconColor} // Pass textColor based on active state
    >
      {button.label}
    </MenuButton>
  ));

  return (
    <View style={[styles.menuBar]}>
      {buttonArray}
    </View>
  );
};
