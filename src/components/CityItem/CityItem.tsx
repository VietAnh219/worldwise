import { Link } from "react-router-dom"
import City from "../../types/city"
import styles from "./CityItem.module.css"
import { useCities } from "../../contexts/CityContext"
import { useDeleteCity } from "../../hooks/CustomHook"
import Spinner from "../Spinner/Spinner"

const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date))
}

const CityItem = ({ city }: { city: City }) => {
    const { cityName, emoji, date, id, position } = city;
    const { currentCity } = useCities();

    const { mutate: deleteCity, isPending } = useDeleteCity();

    console.log(currentCity?.id)

    const handleDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        deleteCity(currentCity?.id)
    }


    if (isPending) {
        return <Spinner />
    }


    return (
        <li >
            <Link className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <img src={`https://flagcdn.com/24x18/${emoji?.toLowerCase()}.png`} className={styles.emoji} />
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
            </Link>
        </li >
    )
}

export default CityItem