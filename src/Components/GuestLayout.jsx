import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/contextProvider";

const GuestLayout = () => {
    const { user, token } = useStateContext();
    if (token) {
        return <Navigate to='/todo' />
    }
    return (
        <>
            <div></div>
            <Outlet />
        </>
    )
}

export default GuestLayout