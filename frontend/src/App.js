import './App.css';
import { useState, useEffect } from 'react';
import CustomModal from './components/Modal.js';
import axios from 'axios';

const todoItems = [
    {
        id: 1,
        title: 'Go to Market',
        description: 'Buy ingredients to prepare dinner',
        completed: true,
    },
    {
        id: 2,
        title: 'Study',
        description: 'Read Algebra and History textbook for the upcoming test',
        completed: false,
    },
    {
        id: 3,
        title: "Sammy's books",
        description: "Go to library to return Sammy's books",
        completed: true,
    },
    {
        id: 4,
        title: 'Article',
        description: 'Write article on how to use Django with React',
        completed: false,
    },
    {
        id: 5,
        title: 'React',
        description: 'Study React harder!!!!',
        completed: true,
    },
];

function Tap({ func }) {
    const [completed, setCompleted] = useState(false);

    const completeTap = () => setCompleted(true);
    const incompleteTap = () => setCompleted(false);

    useEffect(() => {
        func(completed);
    }, [completed]);

    return (
        <div className='nav nav-tabs'>
            <span
                onClick={completeTap}
                className={completed ? 'nav-link active' : 'nav-link'}
            >
                Complete
            </span>
            <span
                onClick={incompleteTap}
                className={completed ? 'nav-link' : 'nav-link active'}
            >
                Incomplete
            </span>
        </div>
    );
}

function List({
    completedData,
    pullTodo,
    pullModal,
    pullModalValue,
    pullFunction,
}) {
    const [todoList, setTodoList] = useState([]);

    const refreshList = () => {
        axios
            .get('http://127.0.0.1:8000/todo-list/')
            .then((response) => {
                setTodoList(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        pullFunction(refreshList);
    }, []);
    useEffect(() => {
        refreshList();
    }, []);

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/todo-list/').then((response) => {
    //         setTodoList(response.data);
    //     });
    // });

    const editTodo = (id) => {
        pullTodo(todoList[id]);
        pullModal(!pullModalValue);
    };

    const deleteTodo = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/todo-delete/${id}/`)
            .then((response) => {
                refreshList();
            });
    };

    return todoList.map((item) =>
        item.completed === completedData ? (
            <li
                key={item.id}
                className='list-group-item d-flex justify-content-between align-items-center'
            >
                <span
                    className={`todo-title mr-2 ${
                        item.completed ? 'completed-todo' : ''
                    }`}
                    title={item.description}
                >
                    {item.title}
                </span>
                <span>
                    <button
                        className='btn btn-secondary mr-2'
                        onClick={() => {
                            editTodo(item.id);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className='btn btn-danger'
                        onClick={() => {
                            deleteTodo(item.id);
                        }}
                    >
                        Delete
                    </button>
                </span>
            </li>
        ) : (
            <div style={{ display: 'none' }}></div>
        )
    );
}

function App() {
    const [comp, setComp] = useState(false);
    const [activeTodo, setActiveTodo] = useState({});
    const [pullingModal, setPullingModal] = useState(false);
    const [todos, setTodos] = useState({});

    const toggle = () => {
        setPullingModal((pullingModal) => !pullingModal);
    };
    const handleSubmit = (item) => {
        toggle();
        if (item.id) {
            axios
                .put(`http://127.0.0.1:8000/todo-update/${item.id}/`, item)
                .then((response) => {
                    axios
                        .get('http://127.0.0.1:8000/todo-list/')
                        .then((response) => {
                            setTodos(response.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    return;
                });
        }
        axios
            .post(`http://127.0.0.1:8000/todo-create/`, item)
            .then((response) => {
                axios
                    .get('http://127.0.0.1:8000/todo-list/')
                    .then((response) => {
                        setTodos(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
    };

    const pullTodos = (data) => {
        setTodos(data);
    };
    const pullData = (data) => {
        setComp(data);
    };
    const pullTodo = (data) => {
        setActiveTodo(data);
    };
    const pullModal = (data) => {
        setPullingModal(data);
    };

    const createTodo = () => {
        const newItem = {
            title: '',
            description: '',
            completed: false,
        };
        setActiveTodo({
            ...newItem,
        });
        setPullingModal(!pullingModal);
    };

    return (
        <main className='container'>
            <h1 className='text-white text-uppercase text-center my-4'>
                Todo app
            </h1>
            <div className='row'>
                <div className='col-md-6 col-sm-10 mx-auto p-0'>
                    <div className='card p-3'>
                        <div className='mb-4'>
                            <button
                                onClick={createTodo}
                                className='btn btn-primary'
                            >
                                Add task
                            </button>
                        </div>

                        <Tap func={pullData} />
                        <ul className='list-group list-group-flush border-top-0'>
                            <List
                                completedData={comp}
                                pullTodo={pullTodo}
                                pullModal={pullModal}
                                pullModalValue={pullingModal}
                                pullFunction={pullTodos}
                            />
                        </ul>
                    </div>
                </div>
                {pullingModal ? (
                    <CustomModal
                        activeItem={activeTodo}
                        toggle={toggle}
                        onSave={handleSubmit}
                    />
                ) : null}
            </div>
        </main>
    );
}

export default App;
