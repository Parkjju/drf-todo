import './App.css';
import { useState, useEffect } from 'react';
import Tap from './Tap';
import Item from './Item';
import CustomModal from './components/Modal';
import axios from 'axios';
import { NavbarToggler } from 'reactstrap';

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

function App() {
    const [viewCompleted, setViewCompleted] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [activeTodo, setActiveTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });
    const [modal, setModal] = useState(false);

    // API 요청 처리 후 투두리스트 전체 목록 데이터베이스로부터 불러오는 함수
    const refreshList = () => {
        axios.get(`/todo-list/`).then((response) => {
            setTodoList(response.data);
        });
    };

    // App렌더링 후 초기 리스트 불러오는 함수
    useEffect(() => {
        axios.get(`/todo-list/`).then((response) => {
            setTodoList(response.data);
        });
    }, []);

    const handleSubmit = (activeTodo) => {
        if (activeTodo.id) {
            axios
                .put(`/todo-update/${activeTodo.id}/`, activeTodo)
                .then((response) => {
                    refreshList();
                })
                .catch((err) => {
                    console.log(err);
                });
            setModal((modal) => !modal);
            return;
        }
        axios.post(`/todo-create/`, activeTodo).then((response) => {
            refreshList();
        });
        setModal((modal) => !modal);
    };

    const handleCreate = () => {
        const newItem = {
            title: '',
            description: '',
            completed: false,
        };
        setActiveTodo(newItem);
        setModal((modal) => !modal);
    };
    const handleDelete = (item) => {
        axios.delete(`/todo-delete/${item.id}`).then((response) => {
            refreshList();
        });
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
                                onClick={handleCreate}
                                className='btn btn-primary'
                            >
                                Add task
                            </button>
                        </div>
                        <Tap
                            viewCompleted={viewCompleted}
                            handleViewCompleted={setViewCompleted}
                        />
                        <ul className='list-group list-group-flush border-top-0'>
                            <Item
                                list={todoList}
                                viewCompleted={viewCompleted}
                                openModal={setModal}
                                setActiveItem={setActiveTodo}
                                handleDelete={handleDelete}
                            />
                        </ul>
                    </div>
                </div>
            </div>
            {modal ? (
                <CustomModal
                    activeItem={activeTodo}
                    setActiveItem={setActiveTodo}
                    isModalOpened={[modal, setModal]}
                    onSave={handleSubmit}
                />
            ) : null}
        </main>
    );
}

export default App;
