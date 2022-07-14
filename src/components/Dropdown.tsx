import { useState } from 'react';
import styles from '../styles/Dropdown.module.css'

export default function Dropdown(props: any) {

    const [open, setOpen] = useState(false)

    function toggle() {
        if(open) setOpen(false)
        else setOpen(true);
    }

    return (
        <div className={styles.Dropdown}>
            <div className={styles.preview} onClick={() => toggle()}>
                {props?.preview}
            </div>
            {open ? <div className={styles.options}>
                {props.options.map((option: any) => {
                    return <div className={styles.option} onClick={option?.onClick}>{option.content}</div>
                })}
            </div> : <></>}
        </div>
    )
}