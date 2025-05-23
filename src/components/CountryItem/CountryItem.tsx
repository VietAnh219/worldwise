import styles from "./CountryItem.module.css";

interface Coutry {
    country: string;
    emoji: string
}

const CountryItem = ({ country }: { country: Coutry }) => {
    return (
        <li className={styles.countryItem}>
            <img src={`https://flagcdn.com/24x18/${country.emoji.toLowerCase()}.png`} className={styles.emoji} />
            <span>{country.country}</span>
        </li>
    )
}

export default CountryItem