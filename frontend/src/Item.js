import { useState } from 'react';

function Item({ list, viewCompleted }) {
    console.log(list);
    return list.map((item) =>
        item.completed === viewCompleted ? (
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
                    <button className='btn btn-secondary mr-2'>Edit</button>
                    <button className='btn btn-danger'>Delete</button>
                </span>
            </li>
        ) : null
    );
}

export default Item;
