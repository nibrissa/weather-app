import React, {useState, useEffect} from 'react';
import data from './../../state/regionsAndCities';
import TableCityWeather from "../TableCityWeather/TableCityWeather";
import './RegionCitySelector.sass'
const RegionCitySelector = ({
        selectedCity,
        selectedRegion,
        setSelectedCity,
        setSelectedRegion,
        addRegions,
        addCities
    }) => {
    const [modal, setModal] = useState(false)
    const [regions] = useState(data);
    const [cities, setCities] = useState([]);
    const [pressure, setPressure] = useState([]);
    const [regionsAdd] = useState(data);
    const [selectedRegionAdd, setSelectedRegionAdd] = useState("");
    const [citiesAdd, setCitiesAdd] = useState([]);
    const [selectedCityAdd, setSelectedCityAdd] = useState("");
    const [t, setT] = useState('')
    const [wind, setWind] = useState('')
    const [speed, setSpeed] = useState('')
    const [date, setDate] = useState('')
    useEffect(() => {
        if (selectedRegion) {
            setCities(regions[Object.keys(regions).find(name =>(console.log(name),regions[name].id.toString()) === selectedRegion)].cities);
        } else {
            setCities([]);
        }
        if (selectedRegionAdd) {
            setCitiesAdd(regions[Object.keys(regionsAdd).find(name => regionsAdd[name].id.toString() === selectedRegionAdd)].cities);
        } else {
            setCitiesAdd([]);
        }
    }, [selectedRegion, regions, selectedRegionAdd, regionsAdd]);
    const addToDB = () => {
        if (selectedCityAdd) {
            addCities({
                city: selectedCityAdd,
                t:t,
                wind:wind,
                speed:speed,
                pressure:pressure,
                date:date
            })
        } else {
            addRegions({
                region: selectedRegionAdd,
                t:t,
                wind:wind,
                speed:speed,
                pressure:pressure,
                date:date
            })
        }
    }
    return (
        <div className='selectorWrapper'>
            <div></div>
            <label>
                Выберите регион:
                <select className='selector' value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
                    <option value="">--Пожалуйста выберите регион--</option>
                    {Object.keys(regions).map(name =>
                        <option key={regions[name].id} value={regions[name].id}>{regions[name].name}</option>
                    )}
                </select>
            </label>
            {selectedRegion && (
                <label>
                    Выберите город:
                    <select className='selector' value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                        <option value="">--Пожалуйста выберите город--</option>
                        {Object.keys(cities).map(city =>
                            <option key={cities[city].id} value={cities[city].id}>{cities[city].name}</option>
                        )}
                    </select>
                </label>
            )}

<div id="myModal" class={`modal ${modal?'show':'hide'}`}>
  <div class="modal-content">
    <span class="close" onClick={()=>setModal(!modal)}>&times;</span>
    <label>
                Выберите регион:
                <select className='selector' value={selectedRegionAdd} onChange={e => setSelectedRegionAdd(e.target.value)}>
                    <option value="">--Пожалуйста выберите регион--</option>
                    {Object.keys(regionsAdd).map(name =>
                        <option key={regionsAdd[name].id} value={regionsAdd[name].id}>{regionsAdd[name].name}</option>
                    )}
                </select>
            </label>
            {selectedRegionAdd && (
                <label>
                    Выберите город:
                    <select className='selector' value={selectedCityAdd} onChange={e => setSelectedCityAdd(e.target.value)}>
                        <option value="">--Пожалуйста выберите город--</option>
                        {citiesAdd.map(city =>
                            <option key={city.id} value={city.id}>{city.name}</option>
                        )}
                    </select>
                </label>
            )}
    <input placeholder='температура' value={t} onChange={e=>setT(e.target.value)}/>
    <input placeholder='направление ветра' value={wind} onChange={e=>setWind(e.target.value)}/>
    <input placeholder='скорость ветра' value={speed} onChange={e=>setSpeed(e.target.value)}/>
    <input placeholder='давление' value={pressure} onChange={e=>setPressure(e.target.value)}/>
    <input placeholder='дата' value={date} type='date' onChange={e=>setDate(e.target.value)}/>
    <button onClick={addToDB}>Добавить запись</button>
  </div>
  </div>
            {selectedCity && <TableCityWeather city={selectedCity}/>}
    <button onClick={()=>setModal(!modal)}>Open Modal</button>
        </div>
    );
};

export default RegionCitySelector;
