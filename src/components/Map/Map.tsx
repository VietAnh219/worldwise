import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CityContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

const Map = () => {
    const [position, setPosition] = useState<[number, number]>([40, 0]);
    const { cities } = useCities();
    const {
        isLoading: isLoadingPosition,
        position: geoloactionPosition,
        getPosition
    } = useGeolocation();

    const [lat, lng] = useUrlPosition();

    useEffect(() => {

        if (!isNaN(lat) && !isNaN(lng)) {
            setPosition([lat, lng]);
        }
    }, [lat, lng]);

    useEffect(() => {
        if (geoloactionPosition) {
            setPosition([geoloactionPosition.lat, geoloactionPosition.lng])
        }
    }, [geoloactionPosition])


    return (
        <div className={styles.mapContainer}>
            {!geoloactionPosition && (
                <Button type="position" onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use your position'}</Button>
            )}
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities?.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <img src={`https://flagcdn.com/24x18/${city.emoji.toLowerCase()}.png`} /> {city.cityName}
                        </Popup>
                    </Marker>

                ))}
                {geoloactionPosition && (
                    <Marker position={[geoloactionPosition.lat, geoloactionPosition.lng]}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}
                <ChangeCenter position={position} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

const ChangeCenter = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    map.setView(position);
    return null;
}
const DetectClick = () => {
    const navigate = useNavigate();
    useMapEvents({
        click: (e: { latlng: { lat: number; lng: number; }; }) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })

    return null
}

export default Map