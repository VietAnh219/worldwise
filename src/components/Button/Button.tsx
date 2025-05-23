import { ReactNode } from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type }: { children: ReactNode; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; type: string }) => {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
}

export default Button