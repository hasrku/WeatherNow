import { useEffect, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import bgimg from "./assets/img/blue-bg.jpg";
import Favs from "./components/Favs";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSavePresent, setIsSavePresent] = useState(false);
    const [savesArray, setSavesArray] = useState([]);
    const [cityName, setCityName] = useState("");
    const [cityID, setCityID] = useState("");
    const lastSave = localStorage.getItem("lastLocationData");

    useEffect(() => {
        if (lastSave !== null) {
            setIsSavePresent(true);
        }
        setSavesArray(() => {
            return (
                JSON.parse(localStorage.getItem("favorites")) || [
                    { name: "Maharashtra", id: 1264418 },
                    { name: "Mumbai", id: 1275339 },
                ]
            );
        });
    }, []);

    const addToFavs = (name, id) => {
        if (savesArray.find((item) => item.name === name)) return true;

        setSavesArray((prev) => {
            const updatedArray = [...prev, { name, id }];
            localStorage.setItem("favorites", JSON.stringify(updatedArray));
            return updatedArray;
        });

        return true;
    };

    const removeFromFavs = (id) => {
        setSavesArray((prev) => {
            const updatedArray = prev.filter((item) => item.id !== id);
            localStorage.setItem("favorites", JSON.stringify(updatedArray));
            return updatedArray;
        });
    };

    const getWeatherDetails = async (cityname) => {
        if (cityname === "") return;
        setCityName(cityname);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
        const url2 = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
        console.log("name: " + cityName);
        setIsLoading(true);
        try {
            let response = await fetch(url);
            if (response.status === 404) {
                response = await fetch(url2);
            }
            const dataJson = await response.json();
            const icon = dataJson.weather[0].icon;
            const desc = dataJson.weather[0].description;

            const searchData = {
                name: dataJson.name,
                country: dataJson.sys.country,
                temp: Math.floor(dataJson.main.temp),
                humidity: dataJson.main.humidity,
                wind: dataJson.wind.speed,
                icon: icon,
                desc: desc,
                id: dataJson.id,
            };
            console.log(searchData);
            localStorage.setItem("lastLocationData", JSON.stringify(searchData));
            setIsSavePresent(true);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="flex justify-center items-center relative bg-darker min-h-screen overflow-x-hidden">
                <img
                    src={bgimg}
                    alt=""
                    className="fixed h-screen top-0 filter blur-[3px] object-cover w-full sm:w-screen"
                />
                <div className="absolute top-0 flex gap-2 justify-center items-center w-full h-16 bg-white/20 text-white">
                    <TiWeatherPartlySunny className="size-8" />
                    <h1 className=" font-extrabold text-2xl font-poppins"> Weather Now</h1>
                    <Favs
                        savesArray={savesArray}
                        removeFromFavs={removeFromFavs}
                        getWeatherDetails={getWeatherDetails}
                        setCityID={setCityID}
                    />
                </div>
                <Search
                    getWeatherDetails={getWeatherDetails}
                    setCityName={setCityName}
                    cityName={cityName}
                    setCityID={setCityID}
                />
                {isLoading && <LoadingSpinner />}
                {isSavePresent && (
                    <WeatherCard
                        addToFavs={addToFavs}
                        savesArray={savesArray}
                        setIsSavePresent={setIsSavePresent}
                        removeFromFavs={removeFromFavs}
                        cityID={cityID}
                    />
                )}
            </div>
        </>
    );
};

export default App;
