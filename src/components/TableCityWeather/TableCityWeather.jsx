import React, {useState,useEffect} from 'react';
import './TableCityWeather.sass'
import regionsAndCities from '../../state/regionsAndCities';

const TableCityWeather = ({region,city}) => {
    const [selected, setSelected] = useState('')
    useEffect(()=>{
        if (city) {
            regionsAndCities[city[0]].cities.map((el) => {
                if (el.id == city) {
                    setWeather(el.weather)
                }
            })
        } else if (region) {
            setWeather(regionsAndCities[region].weather)
        }
    },[region, city])
    const [weather, setWeather] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState(null);

    const handleEdit = (index) => {
        setEditMode(true);
        setEditIndex(index);
        setEditedData({...weather[index]});
    };

    const handleSave = () => {
        setWeather(prevWeather => prevWeather.map((item, index) => index === editIndex ? editedData : item));
        setEditMode(false);
        setEditedData(null);
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        setWeather(prevWeather => prevWeather.filter((item, i) => i !== index));
        if(editMode && index === editIndex) {
            setEditMode(false);
            setEditedData(null);
            setEditIndex(null);
        }
    };

    const handleCancel = () => { // функция для обработки события отмены
        setEditMode(false);
        setEditedData(null);
        setEditIndex(null);
    };

    return (
        <div>
            {/* <h3 className="leaders__header">Погода в ..............</h3> */}

            <div className="table__wrapper">
                <table className="table" style={{ borderSpacing: '15px' }}>
                    <thead>
                    <tr>
                        <th></th>
                        <th className="table__head">Температура воздуха</th>
                        <th className="table__head">Направление ветра</th>
                        <th className="table__head">Скорость ветра</th>
                        <th className="table__head">Атмосферное давление</th>
                        <th className="table__head">Дата</th>
                        <th className="table__head">Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    {weather.map((data, index) => (
                        <tr key={index} className="table_tr">
                            <td >{index + 1}</td>
                            {editMode && editIndex === index ? (
                                <>
                                    <td ><input className='inputWhite' type='text' value={editedData.temperature} onChange={(e) => setEditedData({...editedData, temperature: e.target.value})} /></td>
                                    <td ><input className='inputWhite' type='text' value={editedData.windDirection} onChange={(e) => setEditedData({...editedData, windDirection: e.target.value})} /></td>
                                    <td ><input className='inputWhite' type='text' value={editedData.windSpeed} onChange={(e) => setEditedData({...editedData, windSpeed: e.target.value})} /></td>
                                    <td ><input className='inputWhite' type='text' value={editedData.pressure} onChange={(e) => setEditedData({...editedData, pressure: e.target.value})} /></td>
                                </>
                            ) : (
                                <>
                                    <td className='table__cell'>{data.t}</td>
                                    <td className='table__cell'>{data.wind}</td>
                                    <td className='table__cell'>{data.speed}</td>
                                    <td className='table__cell'>{data.pressure}</td>
                                    <td className='table__cell'>{data.date}</td>
                                </>
                            )}
                            <td className='table__cellAction'>
                                {editMode && editIndex === index ? (
                                    <>
                                        <button onClick={handleSave} className="btnSave">Сохранить</button>
                                        <button onClick={handleCancel} className="btnCancel">Отменить</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(index)} className="btnEdit">Редактировать</button>
                                        <button onClick={() => handleDelete(index)} className="btnDelete">Удалить</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableCityWeather;
