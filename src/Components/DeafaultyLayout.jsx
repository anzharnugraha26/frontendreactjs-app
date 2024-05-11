import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/contextProvider"
import axiosClient from "../axiosClient";
import { useEffect } from "react";

const DeafaultyLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();
    // const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />
    }
    // if (token) {
    //     return <Navigate to='/users' />
    // }
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get('/logout')
            .then(({ }) => {
                setUser(null)
                setToken(null)
            })
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])
    return (

        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        <Link to='todo/new' className="btn btn-primary">
                            Tambah Todo
                        </Link>


                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>

    )
}

export default DeafaultyLayout