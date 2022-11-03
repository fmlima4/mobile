import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google"
import  * as AuthSession from "expo-auth-session";
import  * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextProps {
    user: UserProps
    isUserLoading: boolean
    signIn: () => Promise<void>;
}

interface AuthProvaiderProps{
    children: ReactNode;
} 

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthProvaiderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);
    
    const [request, response, prompAsync] = Google.useAuthRequest({
        clientId: '703975454885-keoinevif6l620m10g05j9e509o0q94p.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    })


    async function signIn(){
        try {
            setIsUserLoading(true)
            await prompAsync();


        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInWithGoogleAccount(access_token: string){
        console.log('token google', access_token)
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogleAccount(response.authentication.accessToken)
        }
    },[response])

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
            { children }
        </AuthContext.Provider>
    )
}