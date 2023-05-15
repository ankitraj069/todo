import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from '@mui/material';

import Modal from "@mui/material/Modal";
import { TextField, CircularProgress } from "@mui/material";
const TodoComp = () => {

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedTodo, setEditedTodo] = useState({});
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        axios
            .get(BACKEND_URL + "getTodos")
            .then((res) => {
                // console.log(res.data);
                setTodos(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = (e, item) => {
        e.preventDefault();
        // console.log(item);
        const maxId = Math.max(...todos.map((todo) => todo.id));
        const maxUserId = Math.max(...todos.map((todo) => todo.userId));
        var newTodoObj = {
            id: maxId + 1,
            userId: maxUserId + 1,
            title: item,
            completed: false,
        };
        axios
            .post(BACKEND_URL + "addTodos", newTodoObj)
            .then((res) => {
                if (res.data.msg === "Added Successfully") {
                    axios
                        .get(BACKEND_URL + "getTodos")
                        .then((res) => {
                            // console.log(res.data);
                            setTodos(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    alert("Some error");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleOpenEditModal = (todoData) => {
        setEditedTodo({
            ...todoData,
        });
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditedTodo({});
        setEditModalOpen(false);
    };

    const handleUpdateTodo = (e) => {
        e.preventDefault();
        axios
            .put(BACKEND_URL + `updateTodo/${editedTodo.id}`, editedTodo)
            .then((res) => {
                if (res.data.msg === "Updated Successfully") {
                    axios
                        .get(BACKEND_URL + "getTodos")
                        .then((res) => {
                            //  console.log(res.data);
                            setTodos(res.data);

                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    alert("Some error");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        handleCloseEditModal();
    };



    const handleDelete = (e, todoId) => {
        axios
            .delete(BACKEND_URL + `deleteTodo/${todoId}`)
            .then((res) => {
                if (res.data.msg === "Deleted Successfully") {
                    console.log(res.data);
                    axios
                        .get(BACKEND_URL + "getTodos")
                        .then((res) => {
                            // console.log(res.data);
                            setTodos(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    alert("Some error");
                }
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div>todoComp</div>
            <form onSubmit={(e) => handleSubmit(e, title)}>
                <input
                    name="title"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <div>
                                <h4>{todo.title}</h4>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOpenEditModal(todo)}
                                >
                                    Update
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={(e) => handleDelete(e, todo.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    );
                })}
            </ul>


            <Modal
                open={editModalOpen}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ p: 2, width: 500, bgcolor: 'white', borderRadius: 4 }}>
                    <Typography variant="h5" component="h2" mb={2}>
                        Edit Task
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <form onSubmit={(e) => handleUpdateTodo(e)}>
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            value={editedTodo.title}
                            autoFocus
                            margin="dense"
                            type="text"
                            autoComplete="off"
                            onChange={(e) =>
                                setEditedTodo({
                                    ...editedTodo,
                                    title: e.target.value,
                                })
                            }
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={handleCloseEditModal} variant="outlined" color="primary" sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>



        </>
    );

};

export default TodoComp;