import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";

import { Link, Navigate } from "react-router-dom";
import moment from "moment";


const users = () => {
  const [users, setUser] = useState({});
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, [])


  const onDeleteClick = todos => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.get(`/destroy/${todos.id}`)
      .then(() => {
        window.location.reload();
      })
  }

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    const id = users.id

    fetch(`http://localhost:8000/api/getdata/` + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        setTodos(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted.");
        }
      });
  }, [users]);

  return (
    <div>
      <h2>Welcome {users.name}</h2>

      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Title</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>

                <td>{moment(todo.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{todo.title}</td>
                {/* <td>{u.email}</td> */}
                <td>
                  <Link className="btn-edit" to={'/todo/' + todo.id}>Edit</Link>
                  &nbsp;

                  <button className="btn-delete" onClick={ev => onDeleteClick(todo)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default users