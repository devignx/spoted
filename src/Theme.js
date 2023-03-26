import { createGlobalStyle } from "styled-components"

export const lightTheme =  {
    background: '#E6E2F3',
    text: '#000',
    hue: '#fff',
    load: '#14171c',
    loadCol: '#f1f5f9',
}

export const darkTheme = {
    background: '#26242d',
    text: '#fff',
    hue: '#1A1921',
    load: '#f1f5f9',
    loadCol: '#363537',
}

export const GlobalStyles = createGlobalStyle`
    body{
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }

    .backd{
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }

    .backhue{
        background-color: ${({ theme }) => theme.hue};
    }

    .lds-ripple div{
        border: 3px solid ${({ theme }) => theme.text};
    }
`