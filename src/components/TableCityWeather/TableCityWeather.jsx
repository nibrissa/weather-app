import React, {useState,useEffect} from 'react';
import './TableCityWeather.sass'
import regionsAndCities from '../../state/regionsAndCities';

const TableCityWeather = ({region,city,handleDelete, update}) => {
    const [selected, setSelected] = useState('')
    useEffect(()=>{
        if (city) {
            console.log(regionsAndCities[city.split('.')[0]].cities[city].weather)
            setWeather(regionsAndCities[city.split('.')[0]].cities[city].weather)
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
        // setWeather(prevWeather => prevWeather.map((item, index) => index === editIndex ? editedData : item));
        setEditMode(false);
        setEditedData(null);
        setEditIndex(null);
    };

    // const handleDelete = (index) => {
    //     console.log(index)
    //     setWeather(prevWeather => prevWeather.filter((item, i) => i !== index));
    //     if(editMode && index === editIndex) {
    //         setEditMode(false);
    //         setEditedData(null);
    //         setEditIndex(null);
    //     }
    // };

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

                    {weather&&weather.map((data, index) => (
                        <tr key={index} className="table_tr">
                            <td >{index + 1}</td>
                            {editMode && editIndex === index ? (
                                <>
                                    <td ><input className='inputWhite' type='text' value={editedData.t} onChange={(e) => setEditedData({...editedData, t: e.target.value})} /></td>
                                    <td ><input className='inputWhite' type='text' value={editedData.wind} onChange={(e) => setEditedData({...editedData, wind: e.target.value})} /></td>
                                    <td ><input className='inputWhite' type='text' value={editedData.speed} onChange={(e) => setEditedData({...editedData, speed: e.target.value})} /></td>
                                    <td ><input className='inputWhite' type='text' value={editedData.pressure} onChange={(e) => setEditedData({...editedData, pressure: e.target.value})} /></td>
                                    <td ><input className='inputWhite' type='date' value={editedData.date} onChange={(e) => setEditedData({...editedData, date: e.target.value})} /></td>
                                </>
                            ) : (
                                <>
                                    <td className='table__cell'>{data.t}°C</td>
                                    <td className='table__cell'>{data.wind}</td>
                                    <td className='table__cell'>{data.speed} м/с</td>
                                    <td className='table__cell'>{data.pressure} мм рт. ст.</td>
                                    <td className='table__cell'>{data.date}</td>
                                </>
                            )}
                            <td className='table__cellAction'>
                                {editMode && editIndex === index ? (
                                    <>
                                        <button onClick={()=>update(editedData)} className="btnSave">Сохранить</button>
                                        <button onClick={handleCancel} className="btnCancel">Отменить</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(index)} className="btnEdit">Редактировать</button>
                                        <button onClick={() => handleDelete(data.id)} className="btnDelete">Удалить</button>
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
