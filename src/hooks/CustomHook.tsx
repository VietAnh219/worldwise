import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CityType from "../types/city";
import axios from "axios";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

export const useGetCities = () => {
    return useQuery<CityType[], Error>({
        queryKey: ['cities'],
        queryFn: () =>
            axios.get('http://localhost:9000/cities').then((res) => res.data),
    });
};

export const useGetCurrentCity = (id: string | undefined) => {
    return useQuery<CityType, Error>({
        queryKey: ['city', id],
        queryFn: () =>
            axios.get(`http://localhost:9000/cities/${id}`).then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetGeo = (lat: number, lng: number) => {
    return useQuery<CityType, Error>({
        queryKey: ['geo', lat, lng],
        queryFn: () =>
            axios.get(`${BASE_URL}?latitude=${lat}&longitude=${lng}`).then((res) => res.data),
    });
}

export const useCreateCity = () => {
    const queryClient = useQueryClient();
    return useMutation<CityType, Error, CityType>({
        mutationFn: (newCity) =>
            axios.post(`http://localhost:9000/cities`, newCity).then((res) => res.data),

        onSuccess: (data) => {
            console.log('City created:', data);
            queryClient.invalidateQueries({ queryKey: ['cities'] });
        },
    });
};

export const useDeleteCity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number | undefined) =>
            axios.delete(`http://localhost:9000/cities/${id}`),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cities'] });
        },
    });
};

