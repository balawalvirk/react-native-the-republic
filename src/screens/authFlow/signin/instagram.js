import React, { useRef } from 'react'
import InstagramLogin from 'react-native-instagram-login';

export default Instagram=({instagramRef,onLoginSuccess})=>{

    //const instagramLogin=useRef(null)
    return(
        <>
         <InstagramLogin
          ref={instagramRef}
          appId='1619324318420647'
          appSecret='1a649971c966fdf8369e4d41db8fa7dd'
          redirectUrl='https://republic.co/'
          scopes={['user_profile']}
          onLoginSuccess={onLoginSuccess}
          onLoginFailure={(data) => console.log(data)}
          language='en' //default is 'en' for english
        />
        </>
    )
}