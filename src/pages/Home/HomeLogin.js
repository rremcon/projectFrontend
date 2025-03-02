import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button";
import './HomeLogin.css'


function HomeLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    async function handleSubmit(e) {
        // preventing from refresh
        e.preventDefault();

        setErrorMessage(null)
        if (username === ''|| password === '') {
            setErrorMessage ("*REQUIRED FIELDS INVALID")
            return false;
        }
        try {
            const response = await axios.post('http://localhost:8080/login',
                {
                username: username,
                password: password,
            })
            login(response.data.jwt)
            navigate('/account')

        } catch(e) {
            console.error(e)
        }
    }


  return (
      <>
          <main className="outer-content-container">
              <div className="inner-content-container">

                  <div className="form-container">
                      <form className="form" onSubmit={handleSubmit}>
                          <h1 className="form-title">Welcome!</h1>
                          <br/>
                          {/*<br/>*/}
                          {/*<label htmlFor="username-field">*Username</label>*/}
                          {/*<br/>*/}
                          <input
                              type="text"
                              id="username-field"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              name="Username"
                              placeholder="Username"/>
                          {/*<br/>*/}
                          {/*<label htmlFor="password-field">*Password</label>*/}
                          {/*<br/>*/}
                          <input
                              type="password"
                              id="password-field"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              name="password"
                              placeholder="Password"/>
                          <br/>
                          {/*<br/>*/}

                          <div>{errorMessage}</div>

                          <Button
                              className="login-button"
                              type="submit"
                              onClick={handleSubmit}
                              visibleText="Login"
                          />

                      </form>

                  </div>
              </div>
          </main>
      </>
  );
}

export default HomeLogin;