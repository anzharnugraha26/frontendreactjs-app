import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axiosClient";


const TodoForm = () => {
    const { id } = useParams();
    const [users, setUser] = useState({});
    const title = useRef();
    const userid = useRef();
    const navigate = useNavigate();

    const [todo, setTodos] = useState({
        id: null,
        title: '',
        userid: ''
    });


    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])


    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/getdataDetail/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setTodos(data)
                    console.log(data);
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (todo.id) {
            axiosClient.put(`/users/${todo.id}`, todo)
                .then(() => {
                    navigate('/todo')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            const payload = {
                title: title.current.value,
                userid: userid.current.value,
            }
            axiosClient.post('/create', payload)
                .then(() => {
                    navigate('/todo')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {todo.id && <h1>Update User: {todo.title}</h1>}
            {!todo.id && <h1>New Todo</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                         
                        <input ref={title} type="text" placeholder="Title" required/>
                        <input ref={userid} type="hidden" value={users.id} placeholder="Password" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}

export default TodoForm