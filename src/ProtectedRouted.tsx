import { ReactNode, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRouted = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])
    return isAuthenticated ? children : null
}

export default ProtectedRouted