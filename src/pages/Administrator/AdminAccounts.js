import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "../../components/Button/Button";


function AdminAccounts() {

    const token = localStorage.getItem('token');
    const [accounts, setAccounts] = useState([]);
    const [selectDelete, setDelete] = useState(false);


    useEffect(()=> {
        const controller = new AbortController();
        async function fetchAccounts() {

            try {
                const response = await axios.get('http://localhost:8080/accounts', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                setAccounts(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchAccounts();
        return function cleanup() {
            controller.abort();
        }
    }, [selectDelete]);


    function deleteSelected(accountId) {
        setDelete(!selectDelete);
        deleteAccount(accountId)
    }


    async function deleteAccount(id) {

        try {
            const response = await axios.delete(`http://localhost:8080/accounts/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            console.log(response.data);

        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <main>
                <div className="inner-container">
                    <h1 className="page-title">Accounts</h1>
                    <h5>(Only accessible for administrator)</h5>
                    <br/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Birthdate</th>
                            <th>Address</th>
                            <th>Zipcode</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Email</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>

                        {accounts.map((account) => {
                            return <tr key={account.id}>
                                {/*afbeelding van account tonen*/}
                                {/*<td>{account.file && <img src={account.file.url} alt={account.name}/>}</td>*/}
                                <td>{account.id}</td>
                                <td>{account.firstname}</td>
                                <td>{account.lastname}</td>
                                <td>{account.birthdate}</td>
                                <td>{account.address}</td>
                                <td>{account.zipcode}</td>
                                <td>{account.city}</td>
                                <td>{account.country}</td>
                                <td>{account.email}</td>
                                <td>{account.username}</td>

                                <Button
                                    type="submit"
                                    // onClick={(e) => changeSelected(e, account.id)}
                                >change
                                </Button>

                                <Button
                                    type="button"
                                    onClick={() => deleteSelected(account.id)}
                                >delete
                                </Button>

                            </tr>
                        })}
                        </tbody>
                    </table>
                    <br/>
                </div>
            </main>
        </>
    );
}

export default AdminAccounts;