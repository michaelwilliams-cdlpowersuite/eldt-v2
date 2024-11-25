import {Box, LinearProgress, Typography} from "@mui/material";
import LogoIcon from "../assets/LogoIconELDT";
import {brandColors} from "../styles/brandColors";
import * as React from "react";

interface FullpageLoaderProps {
  loadingText?: string;
}

const FullpageLoader: React.FC<FullpageLoaderProps> = ({ loadingText }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <Box>
        <LogoIcon
          sx={{
            width: "250px",
            height: "55px",
            color: brandColors.cdlDarkBlue,
          }}
        />
        <LinearProgress sx={{
          width: '100%',
          backgroundColor: 'white',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#000536',
            height: '2px'
          }
        }}
        />
        { loadingText ? ( <Typography sx={{textAlign: 'center'}}>{ loadingText }</Typography> ) : '' }
      </Box>
    </div>
  )
}

export default FullpageLoader;
