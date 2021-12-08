import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router } from "react-router-dom"

import Amplify, { Auth } from "aws-amplify"
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react"
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components"
import awsconfig from "../aws-exports"

import Wrapper from "./layouts/Wrapper"

// Cognitoで作成したユーザー情報
type User = {
  id: string,
  username: string,
  attributes: {
    email: string
    sub: string // いわゆるUID的なもの（一意の識別子）
  }
}

// 認証済みユーザーの情報はグローバルで取り扱いたいのでContextを使用
export const UserContext = createContext({} as {
  userInfo: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<object | undefined>>
})

Amplify.configure(awsconfig)

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>()
  const [currentUser, setCurrentUser] = useState<object | undefined>()
  const [userInfo, setUserInfo] = useState<User>()

  const getUserInfo = async () => {
    const currentUserInfo = await Auth.currentUserInfo()
    setUserInfo(currentUserInfo)
  }

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setCurrentUser(authData)
    })
  }, [])

  useEffect(() => {
    getUserInfo()
  }, [])

  // 未認証のユーザーはサインインページへ飛ばされるようにする
  return authState === AuthState.SignedIn && currentUser ? (
    <Router>
      <UserContext.Provider value={{ userInfo, setCurrentUser }}>
        <Wrapper>
          <h1>You have successfully signed in</h1>
        </Wrapper>
      </UserContext.Provider>
    </Router>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: "username" },
          { type: "email" },
          { type: "password" }
        ]}
      >
      </AmplifySignUp>
    </AmplifyAuthenticator>
  )
}

export default App