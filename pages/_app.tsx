import type { AppContext, AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme, customTheme } from '../themes';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface Props extends AppProps{
  theme: string;
}


function MyApp({ Component, pageProps, theme = 'custom'}: Props) {
  const [selectedTheme, setSelectedTheme] = useState(darkTheme);

  useEffect(()=> {
    const cookiesTheme = Cookies.get('theme') || 'dark'; // error to load - no coinciden el server y el front 
    switch (cookiesTheme) {
      case 'light' : 
        setSelectedTheme(lightTheme);
        break;
      case 'custom':
        setSelectedTheme(customTheme);
        break;
      default:
        setSelectedTheme(darkTheme);
    }
  }, [])

  
  return (
    <ThemeProvider theme={ selectedTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}


// MyApp.getInitialProps = async ( appContext: AppContext ) => {
//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'dark'}
//   console.log('getInitialProps', theme);
//   const validThemes = ['light', 'dark', 'custom'];

//   return { 
//     theme: validThemes.includes( theme ) ? theme : 'dark'
//   }
// }



export default MyApp
