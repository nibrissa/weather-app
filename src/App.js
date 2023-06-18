import { useState, useEffect } from 'react';
import './App.css';
import RegionCitySelector from "./components/RegionCitySelector/RegionCitySelector";
import Layout from "./components/layout/Layout";
import TableCityWeather from "./components/TableCityWeather/TableCityWeather";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import firebase from "firebase/compat/app";
import "firebase/firestore";
import regionsAndCities from './state/regionsAndCities';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAzIlJCBeHTBuIg2hGRFk7dFyyi5OTEShs",
    authDomain: "weather-rinh.firebaseapp.com",
    projectId: "weather-rinh",
    storageBucket: "weather-rinh.appspot.com",
    messagingSenderId: "748710762925",
    appId: "1:748710762925:web:a7b81da8126251edd06924",
    measurementId: "G-8K8N0VK4GR"
  };
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [data, setData] = useState([])
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(()=>{
    getRegions(db)
    getCities(db)
  },[])

  useEffect(()=>{
    if (regions.length && cities.length) {
      console.log(regions)
      console.log(cities)
      regions.map(region => {
        if (regionsAndCities[region.region].weather) {
          regionsAndCities[region.region].weather.push(region)
        } else {
          regionsAndCities[region.region].weather = [region]
        }
      })
      cities.map(city => {
        console.log(city.city)
        console.log(city.city.split('.')[0])
        console.log(regionsAndCities[city.city.split('.')[0]])
        console.log(regionsAndCities[city.city.split('.')[0]].cities[city])
        if (regionsAndCities[city.city.split('.')[0]].cities[city.city].weather) {
          regionsAndCities[city.city.split('.')[0]].cities[city.city].weather.push(city)
        } else {
          regionsAndCities[city.city.split('.')[0]].cities[city.city].weather = [city]
        }
      })
      console.log(regionsAndCities)
    }
  },[regions, cities])

  async function update (data) {
    try {
    await updateDoc(doc(db, "regions", data.id), {
      t:data.t,
      wind:data.wind,
      speed:data.speed,
      pressure:data.pressure
    }).then(() => window.location.reload());} catch {
      console.log('error')
    }
    try{
    await updateDoc(doc(db, "cities",data.id), {
      t:data.t,
      wind:data.wind,
      speed:data.speed,
      pressure:data.pressure
    });
    } catch {
      console.log('error')
    }
  }
  async function handleDelete(id) {
    console.log(id)
    await deleteDoc(doc(db, "regions", id));
    await deleteDoc(doc(db, "cities", id));
    window.location.reload()
  }

  async function addCities(data) {
    console.log(data)
    await addDoc(collection(db, "cities"), {
      city:data.city,
      t:data.t,
      wind:data.wind,
      speed:data.speed,
      pressure:data.pressure,
      date:data.date,
    }).then(()=>window.location.reload());
  }

  async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    console.log(citySnapshot.docs.map(doc => doc.id));
    setCities(citySnapshot.docs.map(doc => {
      const result = doc.data()
      result.id = doc.id
      return result
    }));
  }

  async function addRegions(data) {
    await addDoc(collection(db, "regions"), {
      region:data.region,
      t:data.t,
      wind:data.wind,
      speed:data.speed,
      pressure:data.pressure,
      date:data.date,
    }).then(()=>window.location.reload())
  }

  async function getRegions(db) {
    const regionsCol = collection(db, 'regions');
    const regionSnapshot = await getDocs(regionsCol);
    setRegions(regionSnapshot.docs.map(doc => {
      const result = doc.data()
      result.id = doc.id
      return result
    }))
  }


  return (
    <div className="App">
        <Layout>
            <RegionCitySelector
              selectedCity={selectedCity}
              selectedRegion={selectedRegion}
              setSelectedCity={setSelectedCity}
              setSelectedRegion={setSelectedRegion}
              addRegions={addRegions}
              addCities={addCities} />
            <TableCityWeather
                update={update}
                handleDelete={handleDelete}
              region={selectedRegion}
              city={selectedCity} />
        </Layout>

    </div>
  );
}

export default App;
