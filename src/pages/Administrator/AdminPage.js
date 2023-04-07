import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";


function AdminPage() {


    return (
        <>
            <main>
                <div className="inner-container">
                    <h1 className="page-title">Admin Portal</h1>
                    <br/>
                    <Link to={`/admin/accounts`}>
                        <button
                            type="button">
                            get accounts
                        </button>
                    </Link>
                    <br/>
                    <br/>
                    <Link to={`/admin/orders`}>
                        <button
                            type="button">
                            get orders
                        </button>
                    </Link>
                    <br/>
                    <br/>
                    <Link to={`/admin/tickets`}>
                        <button
                            type="button">
                            get tickets
                        </button>
                    </Link>
                    <br/>
                    <br/>
                    <Link to={`/admin/add/ticket`}>
                        <button
                            type="button">
                            Add ticket
                        </button>
                    </Link>
                </div>
            </main>
        </>
    );
}

export default AdminPage;
