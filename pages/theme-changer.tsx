import { FC } from 'react';
import { Layout } from '../components/layouts';
import {
    Card,
    CardContent,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface Props {
    theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
    const [ currentTheme, setCurrentTheme] = useState(theme)

    const hanldeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value;
        console.log('theme', selectedTheme)
        setCurrentTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        Cookies.set('theme', selectedTheme)
    }

    const onClick = async () => {
        const { data } = await axios.get('/api/hello')
        console.log( 'data', data );
    }

    useEffect( () => {
        const theme = localStorage.getItem('theme');
        console.log('localStorage', theme);
        console.log('Cookies', Cookies.get('theme'));
    }, [])

    return (
        <>
        <Layout title="theme changer page">
            <Card>
                <CardContent >
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup value={currentTheme} onChange={hanldeChange}>
                            <FormControlLabel value="light" control={<Radio />} label="light"/>
                            <FormControlLabel value="dark" control={<Radio />} label="dark" />
                            <FormControlLabel value="custom" control={<Radio />} label="custom" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={onClick}>
                        Test
                    </Button>
                </CardContent>
            </Card>
        </Layout>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ( { req } ) => {
    const {theme = 'dark', name = "no name"} = req.cookies;
    const validThemes = ['light', 'dark', 'custom'];

    return {
        props: {
            theme: validThemes.includes(theme) ? theme : 'dark',
            name
        }
    }
}

export default ThemeChangerPage; 