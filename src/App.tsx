import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from './AnimatedRoutes'
import { CitiesProvider } from './contexts/CityContext'
import { AuthProvider } from './contexts/AuthContext'

function App() {

    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <AnimatedRoutes />
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    )
}

export default App
