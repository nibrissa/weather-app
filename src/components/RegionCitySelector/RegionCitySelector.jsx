import React, {useState, useEffect} from 'react';
import data from './../../state/regionsAndCities';
import TableCityWeather from "../TableCityWeather/TableCityWeather";

const RegionCitySelector = () => {
    const [regions] = useState(data.regions);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        if (selectedRegion) {
            setCities(regions.find(region => region.id.toString() === selectedRegion).cities);
        } else {
            setCities([]);
        }
    }, [selectedRegion, regions]);

    return (
        <div>
            <label>
                Выберите регион:
                <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
                    <option value="">--Пожалуйста выберите регион--</option>
                    {regions.map(region =>
                        <option key={region.id} value={region.id}>{region.name}</option>
                    )}
                </select>
            </label>
            {selectedRegion && (
                <label>
                    Выберите город:
                    <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                        <option value="">--Пожалуйста выберите город--</option>
                        {cities.map(city =>
                            <option key={city.id} value={city.id}>{city.name}</option>
                        )}
                    </select>
                </label>
            )}
            {selectedCity && <TableCityWeather city={selectedCity}/>}
        </div>
    );
};

export default RegionCitySelector;
