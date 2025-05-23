interface Position {
    lat: number;
    lng: number;
}

export default interface City {
    id: number;
    cityName: string;
    country: string;
    position: Position;
    emoji: string;
    date: string;
    notes: string;
    city?: string;
    locality?: string;
    countryName: string;
    countryCode: string;
}

