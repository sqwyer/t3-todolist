import { useSession } from "next-auth/react";
import styles from "../styles/Showcase.module.css"

export default function Showcase() {
    const { data: sessionData } = useSession();
    console.log(sessionData?.user)
  
    return (
      <div className={styles.Showcase}>
        {sessionData?.user ?
          <></>
          : <h2>You need to sign in to use <span className="underline">t3-todolist.</span></h2>
        }
      </div>
    )
  }