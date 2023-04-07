import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function HomeLogin() {

    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login',
            // const response = await axios.post('http://localhost:8080/login',
                {
                email: email,
                // username: username,
                password: password,
            })
            login(response.data.accessToken)
            console.log( "TOKEN GENERATED" )
            navigate('/account')

        } catch(e) {
            console.error(e)
        }
    }


  return (
      <>
          <main>
              <div className="form-container">
                  <form onSubmit={handleSubmit}>
                      <h1 className="form-title">Welcome!</h1>
                      <br/>
                      <label htmlFor="email-field">Email</label>
                      <br/>
                      <input
                          type="text"
                          id="email-field"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="Email"
                          placeholder="Email"/>
                      <br/>
                      <label htmlFor="email-field">Email</label>
                      {/*<br/>*/}
                      {/*<input*/}
                      {/*    type="text"*/}
                      {/*    id="username-field"*/}
                      {/*    value={username}*/}
                      {/*    onChange={(e) => setUsername(e.target.value)}*/}
                      {/*    name="Username"*/}
                      {/*    placeholder="Username"/>*/}
                      <br/>
                      <label htmlFor="password-field">Password</label>
                      <br/>
                      <input
                          type="text"
                          id="password-field"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          name="password"
                          placeholder="Password"/>
                      <br/>
                      <br/>
                  </form>

                  <button
                      className="login-button"
                          type="submit"
                          onClick={handleSubmit}
                  >Login
                  </button>

              </div>
          </main>
          </>
  );
}

export default HomeLogin;