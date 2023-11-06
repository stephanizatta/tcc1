const getTokenIfLogged = () => {
    try {
        return {
            'x-token': JSON.parse(localStorage.user_session)?.data.token
        }
    } catch (err) {
        return {}
    }
    
}

export const fetchAutenticated = (url, params) => fetch(process.env.REACT_APP_API_URL || "http://localhost:3001"+url, {
    ...params,
    headers: {
        ...params.headers,
        ...(getTokenIfLogged())
    }
})