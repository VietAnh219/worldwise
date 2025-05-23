// import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react"
import CityType from '../types/city';
import axios from "axios";
import { useGetCities } from "../hooks/CustomHook";

type CitiesContextType = {
    cities: CityType[] | undefined;
    isLoading: boolean;
    currentCity: CityType | undefined;
    isFetching: boolean;
    getCity: (id: string | undefined) => void
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const CitiesProvider = ({ children }: { children: ReactNode }) => {
    const [currentCity, setCurrentCity] = useState<CityType | undefined>(undefined);
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const { data: cities, isLoading, error } = useGetCities();

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    // console.log(cities);
    // const getCity = (id: string | undefined) => {
    //     const { data: currentCities, isLoading, error } = useQuery<CityType, Error>({
    //         queryKey: ["currentCities"],
    //         queryFn: () => axios.get(`http://localhost:9000/cities/${id}`).then((res) => res.data),
    //     });

    //     if (isLoading) return 'Loading...';

    //     if (error) return 'An error has occurred: ' + error.message;
    //     // return useQuery<CityType, Error>({
    //     //     queryKey: ['currentCity', id],
    //     //     queryFn: () =>
    //     //         axios.get(`http://localhost:9000/cities/${id}`).then((res) => res.data),
    //     // });
    // }

    const getCity = async (id: string | undefined) => {
        try {
            setIsFetching(true)
            const respone = await axios.get(`http://localhost:9000/cities/${id}`);
            setCurrentCity(respone.data)
        } catch {
            alert("There was an error loading data....")
        } finally {
            setIsFetching(false)
        }
    }


    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, isFetching, getCity }}>
            {children}
        </CitiesContext.Provider>
    )
}

const useCities = () => {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("CitiesContext was used outside the CitiesProvider")
    }
    return context;
}

export { CitiesProvider, useCities }