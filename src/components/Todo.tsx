import { useState } from 'react';
import styles from '../styles/Todo.module.css';
import { trpc } from '../utils/trpc';

export default function Todo(props: {done: boolean, label: string, created: string, id: string, refetch: Function}) {

    const [done, setDone] = useState(props.done);
    const deleteTodoMut = trpc.useMutation(["todos.deleteTodo"], { onSuccess: () => props.refetch() });
    const updateTodoMut = trpc.useMutation(["todos.updateTodo"], { onSuccess: () => props.refetch() });

    function toggleDone() {
        setDone(!done)
        updateTodoMut.mutate({id: props.id, data: {done}})
    }

    function deleteTodo() {
        deleteTodoMut.mutate({id: props.id})
    }

    return (
        <div className={done ? `${styles.Todo} ${styles.done}` : styles.Todo} onClick={() => toggleDone()}>
            <div className={`${styles.Row} row`}>
                <label>{props.label}</label>
                {done ? <div className={styles.trash} onClick={() => deleteTodo()}>&#215;</div> : <></>}
            </div>
            <span>Created {props.created}</span>
        </div>
    )
}