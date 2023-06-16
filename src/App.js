import './App.css';
import RegionCitySelector from "./components/RegionCitySelector/RegionCitySelector";
import Layout from "./components/layout/Layout";
import TableCityWeather from "./components/TableCityWeather/TableCityWeather";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import firebase from "firebase/compat/app";
import "firebase/firestore";

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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function addCities(data) {
    await addDoc(collection(db, "cities"), {
      city:data.city,
      t:data.t,
      wind:data.wind,
      speed:data.speed,
      date:data.date,
    });
  }

  async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }
  
  async function addRegions(data) {
    await addDoc(collection(db, "regions"), {
      region:data.region,
      t:data.t,
      wind:data.wind,
      speed:data.speed,
      date:data.date,
    });
  }
  
  async function getRegions(db) {
    const regionsCol = collection(db, 'cities');
    const regionSnapshot = await getDocs(regionsCol);
    const regionList = regionSnapshot.docs.map(doc => doc.data());
    return regionList;
  }

  return (
    <div className="App">
        <Layout>
            <RegionCitySelector add={addRegions} />
            <TableCityWeather add={addCities} />
        </Layout>

    </div>
  );
}

export default App;
