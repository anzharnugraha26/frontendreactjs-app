import { createBrowserRouter } from 'react-router-dom'
import Login from './view/login'
import Register from './view/register'
import DeafaultyLayout from './Components/DeafaultyLayout'
import Users from './view/users'
import GuestLayout from './Components/GuestLayout'
import TodoForm from './view/TodoForm'
import TodoFormUpdate from './view/TodoFormUpdate'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DeafaultyLayout />,
        children: [
            {
                path: '/todo',
                element: <Users />
            },
            {
                path: '/todo/new',
                element: <TodoForm  key="TodoCreate"/>
            },
            {
                path: '/todo/:id',
                element: <TodoFormUpdate  key="TodoUpdate"/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }


])
