import { useCities } from "../../contexts/CityContext"
// import City from "../../types/city"
import CityItem from "../CityItem/CityItem"
import Message from "../Message/Message"
import Spinner from "../Spinner/Spinner"
import styles from "./CityList.module.css"

const CityList = () => {
    const { cities, isLoading } = useCities();

    if (isLoading) {
        return <Spinner />
    }

    if (!cities?.length) {
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        )
    }
    return (
        <ul className={styles.cityList}>
            {cities?.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    )
}

export default CityList