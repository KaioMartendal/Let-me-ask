import {useState, useEffect} from 'react'
import {auth, firebase} from '../services/firebase'
import { createContext, ReactNode } from "react"

export const AuthContext = createContext({} as AuthContextType)

type AuthContextType={
     user: User | undefined
     signInWithGoogle: () => Promise<void>
   }
   
   type User={
     id: string,
     name: string,
     avatar: string
   }


type AuthContextProviderProps = {
     children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps){

const [user, setUser] = useState<User>()

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if(user){
      const {displayName, photoURL, uid} = user

      if(!displayName || !photoURL){
        throw new Error('Missing Information from Google Account.')
    }

    setUser({
      id: uid,
      avatar: photoURL,
      name: displayName

    })
  }
  })

  return() => {
    unsubscribe()
  }
}, [])

async function signInWithGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider()

const result = await auth.signInWithPopup(provider)

    if(result.user){
      const {displayName, photoURL, uid} = result.user

      if(!displayName || !photoURL){
          throw new Error('Missing Information from Google Account.')
      }

      setUser({
        id: uid,
        avatar: photoURL,
        name: displayName

      })
    }
}


return(
     <AuthContext.Provider value={{user, signInWithGoogle}}>{props.children}

     </AuthContext.Provider>      
)
}