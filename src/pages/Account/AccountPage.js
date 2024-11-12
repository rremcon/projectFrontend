import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import './Accountpage.css'


    function AccountPage() {

        const {user} = useContext(AuthContext)

        return (
        <>
            <main className="outer-content-container">
            <div className="inner-content-container">
            <h1 className="page-title">Account</h1>
                <br/>
                <br/>
                <h2>Hi! {user.username}</h2>
                <br/>
                <h3>AccountDetails</h3>
                <br/>
                <span>AccountNr. {user.id}</span>
                <span>Email: {user.email}</span>
                <br/>
                <span>{user.firstname}</span>
                <span>{user.lastname}</span>
                <span>{user.address}</span>
                <span>{user.zipcode}</span>
                <span>{user.city}</span>
                <span>{user.country}</span>
            </div>
            </main>
        </>
    );
}

export default AccountPage;
