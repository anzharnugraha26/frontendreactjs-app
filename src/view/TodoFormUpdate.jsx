import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

const TodoFormUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({
        id: null,
        title: '',

    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        setLoading(true)
        axiosClient.get(`/getdataDetail/${id}`)
            .then(({ data }) => {
                setLoading(false)
                setTodo(data)
                console.log(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    const onSubmit = ev => {
        ev.preventDefault()

        axiosClient.post(`/update/${todo.id}`, todo)
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

    return (
        <>
            <h1>Update Todo </h1>

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
                        <input value={todo.title} onChange={ev => setTodo({ ...todo, title: ev.target.value })} placeholder="Name" />

                        <button className="btn">Update</button>
                    </form>
                )}
            </div>
        </>
    )
}

export default TodoFormUpdate