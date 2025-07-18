import { useCities } from "../../contexts/CityContext"
// import City from "../../types/city"
import CountryItem from "../CountryItem/CountryItem"
import Message from "../Message/Message"
import Spinner from "../Spinner/Spinner"
import styles from "./CountryList.module.css"

const CountryList = () => {
    const { cities, isLoading } = useCities();

    if (isLoading) {
        return <Spinner />
    }

    if (!cities?.length) {
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        )
    }

    const countries = cities.reduce<{ country: string; emoji: string }[]>((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }]
        } else {
            return arr
        }
    }, []);
    return (
        <ul className={styles.countryList}>
            {countries?.map((country) => (
                <CountryItem country={country} key={`${country.country}-${country.emoji}`} />
            ))}
        </ul>
    )
}

export default CountryList