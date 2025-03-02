import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";


function AdminPage() {

    return (
        <>
            <main className="outer-content-container">
                <div className="inner-content-container">
                    <h1 className="page-title">Admin Portal</h1>
                    <br/>
                    <Link to={`/admin/accounts`}>
                        <Button
                            type="button"
                            visibleText="get accounts"
                        />
                    </Link>
                    <br/>
                    <br/>
                    <Link to={`/admin/orders`}>
                        <Button
                            type="button"
                            visibleText="get orders"
                        />
                    </Link>
                    <br/>
                    <br/>
                    <Link to={`/admin/tickets`}>
                        <Button
                            type="button"
                            visibleText="get tickets"
                        />
                    </Link>
                    <br/>
                    <br/>
                    <Link to={`/admin/add/ticket`}>
                        <Button
                            type="button"
                            visibleText="Add ticket"
                        />
                    </Link>
                </div>
            </main>
        </>
    );
}

export default AdminPage;
