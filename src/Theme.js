import { createGlobalStyle } from "styled-components"

export const lightTheme =  {
    background: '#fff',
    text: '#000',
    hue: '#d7d8d9',
    load: '#14171c',
    loadCol: '#f1f5f9',
}

export const darkTheme = {
    background: '#000',
    text: '#fff',
    hue: '#2e2e2e',
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