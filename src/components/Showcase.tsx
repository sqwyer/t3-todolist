import { useSession } from "next-auth/react";
import styles from "../styles/Showcase.module.css"
import { trpc } from "../utils/trpc";
import Create from "./Create";
import Todo from "./Todo";

export default function Showcase() {
    const { data: sessionData } = useSession();
    const { data, refetch } = trpc.useQuery(["todos.getTodos", {owner: sessionData?.user?.email as string}])
  
    return (
      <div className={styles.Showcase}>
        {sessionData?.user
        ? <div>
                <Create refetch={refetch} />
                <br />
                {data ? data?.map((todo: any) => (
                    <Todo key={todo.id} refetch={refetch} id={todo.id} created={todo.created} done={todo.done} label={todo.label}></Todo>
                )) : 'Loading...'}
                {/* {data?.map((todo: any) => (
                    <Todo key={todo.id} refetch={refetch} id={todo.id} created={todo.created} done={todo.done} label={todo.label}></Todo>
                ))} */}
            </div>
          : <h2>You need to sign in to use <span className="underline">t3-todolist.</span></h2>
        }
      </div>
    )
  }