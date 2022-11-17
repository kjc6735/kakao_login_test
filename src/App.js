import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { redirect } from "react-router-dom";

const {
  REACT_APP_REST_API_KEY,
  REACT_APP_REDIRECT_URI,
  REACT_APP_GET_ACCESS_TOKEN_URL
} = process.env
const GET_CODE_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`;


function App() {
  const [searchParams,setSearchParams] = useSearchParams();
  const [user, setUser] = useState();
  console.log(process.env)
  useEffect(() => {
    if (!searchParams.get("code")) { 
      return;
    }
    const getUser = async () => {
      const { data } = await axios.post( REACT_APP_GET_ACCESS_TOKEN_URL, {
        grant_type: 'authorization_code',
        client_id: REACT_APP_REST_API_KEY,
        redirect_uri:  REACT_APP_REDIRECT_URI,
        code: searchParams.get("code")
      }, {
        headers:{
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
      console.log(data);
      const {access_token} = data;
      const response = await axios.get(`http://localhost:8000/account/kakao/login?access_token=${access_token}}`)
      console.log(`response.data is ${response.data}`)
      setUser(response.data);
    }
    getUser();
  }, [searchParams])
  // useEffect(() => {

  // })
  return (
    <>
      <a href={GET_CODE_URL}>
          test
      </a>
      {
        user && <div>
          로그인했습니다.
        </div>
      }
    </>
  );
}

export default App;
/*


*/