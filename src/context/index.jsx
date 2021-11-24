import { createContext, useReducer, useEffect} from 'react'
import { auth} from '../firebase/config'
import {useNavigate} from 'react-router-dom'

export const ThemeContext = createContext()

export default function ContextProvider({children}) {

    const navigate = useNavigate()

    const userReducer = (state, action)=> {
        switch (action.type) {
            case 'LOGIN_SUCCESS':
                return {
                    success: true,
                    data: action.payload
                }
            case 'LOGOUT': 
                return {
                    success: false
                }
            default:
                return state
        }
    }
    
    const [user, dispatch] = useReducer(userReducer, {
        success: false
    })

    const data = {
        UserReducer: {
            user, 
            dispatch
        }
    }


    
    useEffect(()=> {  
        const checkLogin = auth.onAuthStateChanged((user)=>{
            console.log(user)
            if (!user){
                navigate('/login')
            } else {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        displayName: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL,
                    }
                })
                navigate('/')
            }
        })

        return ()=> {
            checkLogin()
        }
    }, [navigate])

    return (
        <ThemeContext.Provider value={data}>
            {children}
        </ThemeContext.Provider>
    )
}
