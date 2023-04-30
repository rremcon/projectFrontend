import React, {useContext, useState} from 'react';
import Button from "../../components/Button/Button";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";


function Registration() {

    const {login} = useContext(AuthContext)
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function registerUser(e) {
        e.preventDefault()

        setErrorMessage(null)
        if (username === ''|| password === '' || email === '') {
            setErrorMessage ("*REQUIRED FIELDS INVALID")
            console.log("*REQUIRED FIELDS INVALID")
                return false;
        }

            try{
            const response = await axios.post('http://localhost:8080/users/register', {
                firstname: firstname,
                lastname: lastname,
                birthdate: birthdate,
                address: address,
                zipcode: zipcode,
                city: city,
                country: country,
                email: email,
                username: username,
                password: password,
            })
            // login(response.data.jwt)
            console.log(response.data)
            console.log("USER REGISTRATED")
            navigate('/')

        } catch (e) {
            console.error(e)
        }
    }


    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }


    async function sendImage(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        try{
            const result = await axios.post('http://localhost:8080/upload', formData,{
            // const result = await axios.post('http://localhost:8080/accounts/0/photo', formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            setConfirm(true);
            console.log(result.data);

        } catch (e) {
            console.error(e)
        }
    }


        async function getImage(e) {
            e.preventDefault()
            const formData = new FormData();
            formData.append("file", file);
            try{
                // const result = await axios.get('http://localhost:8080/download/{fileName}', formData,{
                const result = await axios.get('http://localhost:8080/download/image0.jpeg', formData,{
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    })
                setConfirm(true);
                console.log(result.data);

                } catch (e) {
                    console.error(e)
                }
            }


    return (
        <>
            <main>
            <div className="form-container">
                <form onSubmit={registerUser}>
                    <h1 className="form-title">Registration</h1>
                    <br/>
                    <label htmlFor="firstname-field">Firstname</label>
                    <br/>
                    <input
                        type="text"
                        id="firstname-field"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        name="firstname"
                        placeholder="Firstname"/>
                    <br/>
                    <label htmlFor="lastname-field">Lastname</label>
                    <br/>
                    <input
                        type="text"
                        id="lastname-field"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        name="lastname"
                        placeholder="Lastname"/>
                    <br/>
                    <label htmlFor="birthdate-field">Birthdate (yyyy-mm-dd)</label>
                    <br/>
                    <input
                        type="text"
                        id="birthdate-field"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        name="birthdate"
                        placeholder="Birthdate"/>
                    <br/>
                    <label htmlFor="address-field">Address</label>
                    <br/>
                    <input
                        type="text"
                        id="address-field"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name="address"
                        placeholder="Address"/>
                    <br/>
                    <label htmlFor="zipcode-field">Zipcode</label>
                    <br/>
                    <input
                        type="text"
                        id="zipcode-field"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        name="zipcode"
                        placeholder="Zipcode"/>
                    <br/>
                    <label htmlFor="city-field">City</label>
                    <br/>
                    <input
                        type="text"
                        id="city-field"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        name="city"
                        placeholder="City"/>
                    <br/>
                    <label htmlFor="country-field">Country</label>
                    <br/>
                    <input
                        type="text"
                        id="country-field"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        name="country"
                        placeholder="Country"/>
                    <br/>
                    <br/>
                    <br/>
                    <label htmlFor="email-field">*Email</label>
                    <br/>
                    <input
                        type="email"
                        id="email-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Email"/>
                    <br/>
                    <label htmlFor="username-field">*Username</label>
                    <br/>
                    <input
                        type="text"
                        id="username-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        placeholder="Username"/>
                    <br/>
                    <label htmlFor="choose-password-field">*Password</label>
                    <br/>
                    <input
                        type="password"
                        id="password-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Password"/>
                    <br/>
                    <br/>
                </form>

                <div>{errorMessage}</div>
                <Button
                    className="sign-up-button"
                    type="submit"
                    onClick={registerUser}
                >Sign Up
                </Button>


            </div>
                <br/>
                <br/>
                <div>
                    <form onSubmit={sendImage}>
                        <label htmlFor="account-image">
                            Choose picture
                            <input type="file" name="account-image-field" id="account-image-upload" onChange={handleImageChange}/>
                        </label>
                        {previewUrl &&
                            <label>
                                Preview:
                                <img src={previewUrl} alt="Example of image"
                                     className="image-preview"/>
                            </label>
                        }

                        <Button
                            type="submit"
                            onClick={sendImage}
                        >Upload
                            {confirm === true && <p>Nice!</p>}
                        </Button>

                    </form>
                </div>
                <br/>
                <br/>
                <div>
                    <form onSubmit={getImage}>
                        {/*<form onSubmit={registerUser}>*/}
                        <label htmlFor="account-image">
                            Choose picture
                            <input type="file" name="account-image-field" id="account-image-download" onChange={handleImageChange}/>
                        </label>
                        {previewUrl &&
                            <label>
                                Preview:
                                <img src={previewUrl} alt="Example of image"
                                     className="image-preview"/>
                            </label>
                        }
                        <Button
                            type="submit"
                            onClick={getImage}
                        >Download
                        </Button>

                    </form>
                </div>
            </main>
        </>
    );
}

export default Registration;
