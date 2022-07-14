// import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
import { FaGithub } from "react-icons/fa";
import styles from '../styles/Navbar.module.css';

export default function Nav() {
    // const { data: secretMessage, isLoading } = trpc.useQuery([
    //   "auth.getSecretMessage",
    // ]);
  
    const { data: sessionData } = useSession();
  
    const options = [
      {
        content: 'Signout',
        onClick: () => signOut()
      }
    ];
  
    const img = <img className={styles.authImage} src={sessionData?.user?.image as string|undefined}></img>
  
    return (
      <div className={styles.Navbar}>
        <a className="underline">t3-todolist</a>
        {/* {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
        {secretMessage && <p>{secretMessage}</p>} */}
        
        {sessionData?.user ?
          <Dropdown preview={img} options={options}></Dropdown> :
          <button className={styles.authButton} onClick={sessionData ? () => signOut() : () => signIn("github")}>
            <div><FaGithub /><p>Sign in with Github</p></div>
          </button>
        }
      </div>
    );
  };