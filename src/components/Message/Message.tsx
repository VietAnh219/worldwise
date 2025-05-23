import styles from "./Message.module.css";

const Message = ({ message }: { message: string }) => {
    return (
        <p className={styles.message}>
            <span role="img">👋</span> {message}
        </p>
    )
}

export default Message