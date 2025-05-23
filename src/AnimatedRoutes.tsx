import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import Product from './pages/Product/Product'
import Pricing from './pages/Pricing/Pricing'
import AppLayout from './pages/AppLayout/AppLayout'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Login/Login'
import CityList from './components/CityList/CityList'
import CountryList from './components/CountryList/CountryList';
import { CSSProperties, ReactNode } from 'react';
import City from './components/City/City';
import Form from './components/Form/Form';
import ProtectedRouted from './ProtectedRouted';

const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

const pageTransition = { duration: 0.4 };

const AnimatedDiv = ({ children, style }: { children: ReactNode, style?: CSSProperties }) => {
    return (
        <motion.div
            style={style}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}>
            {children}
        </motion.div>
    )
}

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedDiv><Homepage /></AnimatedDiv>} />
                <Route path="product" element={<AnimatedDiv><Product /></AnimatedDiv>} />
                <Route path="pricing" element={<AnimatedDiv><Pricing /></AnimatedDiv>} />
                <Route path="login" element={<AnimatedDiv><Login /></AnimatedDiv>} />
                <Route path="app" element={<ProtectedRouted><AppLayout /></ProtectedRouted>}>
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<AnimatedDiv style={{ width: "450px" }}><CityList /></AnimatedDiv>} />
                    <Route path="cities/:id" element={<AnimatedDiv style={{ width: "450px" }}><City /></AnimatedDiv>} />
                    <Route path="countries" element={<AnimatedDiv style={{ width: "450px" }}><CountryList /></AnimatedDiv>} />
                    <Route path="form" element={<AnimatedDiv style={{ width: "450px" }}><Form /></AnimatedDiv>} />
                </Route>
                <Route path="*" element={<AnimatedDiv><PageNotFound /></AnimatedDiv>} />
            </Routes>
        </AnimatePresence >
    );
}

export default AnimatedRoutes