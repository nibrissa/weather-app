import './App.css';
import RegionCitySelector from "./components/RegionCitySelector/RegionCitySelector";
import Layout from "./components/layout/Layout";
import TableCityWeather from "./components/TableCityWeather/TableCityWeather";

function App() {
  return (
    <div className="App">
        <Layout>
            <RegionCitySelector/>
            <TableCityWeather/>
        </Layout>

    </div>
  );
}

export default App;
