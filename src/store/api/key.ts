export const keys = {
    main: process.env.REACT_APP_CLIENT_TOKEN
        ? process.env.REACT_APP_CLIENT_TOKEN
        : '',
    refresh: process.env.REACT_APP_CLIENT_TOKEN_REFRESH
        ? process.env.REACT_APP_CLIENT_TOKEN_REFRESH
        : ''
}