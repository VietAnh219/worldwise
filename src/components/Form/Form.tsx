import { SetStateAction, useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useCreateCity, useGetGeo } from "../../hooks/CustomHook";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import DateTime from "../Date/DatePicker"


const Form = () => {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [flag, setFlag] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [lat, lng] = useUrlPosition();
    const naviagte = useNavigate();

    const { mutate: createCity, isPending } = useCreateCity();


    const { data: currentLocation, isLoading, error } = useGetGeo(lat, lng)

    useEffect(() => {
        if (currentLocation) {
            setCityName(currentLocation?.city || currentLocation?.locality || "");
            setCountry(currentLocation?.countryName);
            setFlag(currentLocation?.countryCode)
        }
    }, [currentLocation]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!cityName || !date) {
            return;
        }

        const newCity = {
            cityName,
            country,
            emoji: flag,
            date,
            notes,
            position: { lat, lng },
        }
        createCity(newCity);
        naviagte("/app/cities");
    }


    const navigate = useNavigate();

    if (isLoading) {
        return <Spinner />
    }

    if (!lat && !lng) {
        return <Message message="Start by clicking somewhere on the map" />
    }

    if (error) {
        return <Message message="That doesn't seem to be a city Click some where else" />
    }

    return (
        <form className={`${styles.form} ${isPending ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
                <span className={styles.flag}>
                    <img src={`https://flagcdn.com/24x18/${flag?.toLowerCase()}.png`} />
                </span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DateTime
                    value={date}
                    onChange={(date: SetStateAction<Date>) => setDate(date)} disable={undefined} datePlc={undefined} />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <Button type="back" onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}>&larr; Back</Button>
            </div>
        </form>
    )
}

export default Form