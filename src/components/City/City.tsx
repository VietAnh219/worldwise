import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../contexts/CityContext";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

const City = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCity, currentCity, isFetching } = useCities();


    useEffect(() => {
        getCity(id);
    }, [id])

    if (isFetching) {
        return <Spinner />
    }

    if (!currentCity) {
        return <p>No city selected</p>;
    }

    const { cityName, emoji, date, notes } = currentCity;


    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <img src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`} /> {cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <Button type="back" onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}>&larr; Back</Button>
            </div>
        </div>
    )
}

export default City