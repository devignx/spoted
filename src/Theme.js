import { createGlobalStyle } from "styled-components"

export const lightTheme =  {
    background: '#fff',
    text: '#000',
    hue: '#fff',
    load: '#14171c',
    loadCol: '#f1f5f9',
}

export const darkTheme = {
    background: 'rgba(38, 36, 45)',
    text: '#fff',
    hue: '#0d0d0d',
    load: '#f1f5f9',
    loadCol: '#363537',
}

export const GlobalStyles = createGlobalStyle`
    body{
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }

    .backhue{
        background-color: ${({ theme }) => theme.hue};
    }

    .lds-ripple div{
        border: 4px solid ${({ theme }) => theme.text};
    }
`