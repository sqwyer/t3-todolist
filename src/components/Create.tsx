import { useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc"

import styles from "../styles/Create.module.css"

export default function Create(props: {refetch: Function}) {
    const [label, setLabel] = useState('')
    const createTodo = trpc.useMutation(["todos.createTodo"], { onSuccess: () => props.refetch() });
    const { data: sessionData } = useSession();

    function handleChange(event: any) {
        setLabel(event.target.value)
    }

    function create() {
        if(label.trim() != '') createTodo.mutate({
            label,
            created: new Date().toDateString(),
            owner: sessionData?.user?.email as string
        })
        setLabel('')
    }

    return (
        <div className={styles.Create}>
            <h3>Create some to-do&apos;s.</h3>
            <div className="row">
                <input onChange={handleChange} value={label} type="text" />
                <button onClick={() => create()}>Create</button>
            </div>
        </div>
    )
}