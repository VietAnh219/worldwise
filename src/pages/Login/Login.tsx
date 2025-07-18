import React, { useEffect, useState } from 'react'
import styles from "./Login.module.css";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Login = () => {
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (email && password) {
            login(email, password)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/app", { replace: true })
        }
    }, [isAuthenticated, navigate])
    return (
        <main className={styles.login}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type='primary'>Login</Button>
                </div>
            </form>
        </main>
    )
}

export default Login