import React, {useState} from 'react';
import './TableCityWeather.sass'

const TableCityWeather = ({city}) => {
    const [weather, setWeather] = useState([
        {temperature: "10", windDirection: "N", windSpeed: "5", pressure: "1013"},
        {temperature: "15", windDirection: "E", windSpeed: "3", pressure: "1011"},
        {temperature: "20", windDirection: "S", windSpeed: "4", pressure: "1012"},
        {temperature: "20", windDirection: "S", windSpeed: "4", pressure: "1012"},
        {temperature: "20", windDirection: "S", windSpeed: "4", pressure: "1012"},
        {temperature: "20", windDirection: "S", windSpeed: "4", pressure: "1012"},
    ]);
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
            <h3 className="leaders__header">Погода в ..............</h3>

            <div className="table__wrapper">
                <table className="table" style={{ borderSpacing: '15px' }}>
                    <thead>
                    <tr>
                        <th></th>
                        <th className="table__head">Температура воздуха</th>
                        <th className="table__head">Направление ветра</th>
                        <th className="table__head">Скорость ветра</th>
                        <th className="table__head">Атмосферное давление</th>
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
                                    <td className='table__cell'>{data.temperature}</td>
                                    <td className='table__cell'>{data.windDirection}</td>
                                    <td className='table__cell'>{data.windSpeed}</td>
                                    <td className='table__cell'>{data.pressure}</td>
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
