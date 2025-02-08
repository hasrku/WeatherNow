import { useEffect, useState } from "react";
import { FaWind, FaWater, FaArrowLeftLong, FaRegStar, FaStar } from "react-icons/fa6";
import clear from "../assets/img/clear.png";
import clearN from "../assets/img/clear-night.png";
import fewClouds from "../assets/img/few-clouds.png";
import fewCloudsN from "../assets/img/few-clouds-night.png";
import clouds from "../assets/img/clouds.png";
import rain from "../assets/img/rain.png";
import thunder from "../assets/img/thunderstrom.png";
import snow from "../assets/img/snow.png";
import mist from "../assets/img/mist.png";

const WeatherCard = ({ setIsSavePresent, savesArray, addToFavs, removeFromFavs, cityID }) => {
    const [isFav, setIsFav] = useState(false);
    const lastSave = JSON.parse(localStorage.getItem("lastLocationData"));

    const allIcons = {
        "01d": clear,
        "01n": clearN,
        "02d": fewClouds,
        "02n": fewCloudsN,
        "03d": clouds,
        "03n": clouds,
        "04d": clouds,
        "04n": clouds,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "11d": thunder,
        "11n": thunder,
        "13d": snow,
        "13n": snow,
        "50d": mist,
        "50n": mist,
    };
    const setIcon = allIcons[lastSave.icon] || clear;
    useEffect(() => {
        if (savesArray.find((item) => item.id === (cityID || lastSave.id))) setIsFav(true);
        else {
            setIsFav(false);
        }
    });

    return (
        <div className="z-10 py-5 mt-20 sm:mt-28 w-[90%] sm:w-[400px] min-h-96 bg-white/10 backdrop-blur-md backdrop-opacity-70 rounded-xl shadow-md">
            <div className="flex relative justify-center items-center flex-col w-full px-6 py-4 text-white">
                <FaArrowLeftLong
                    className="absolute left-6 top-0 size-6 cursor-pointer"
                    onClick={() => {
                        localStorage.removeItem("lastLocationData");
                        setIsSavePresent(false);
                    }}
                />
                {isFav ? (
                    <FaStar
                        onClick={() => {
                            removeFromFavs(lastSave.id);
                            setIsFav(false);
                        }}
                        className="absolute right-6 top-0 size-7 cursor-pointer text-yellow-300"
                    />
                ) : (
                    <FaRegStar
                        onClick={() => {
                            addToFavs(lastSave.name, lastSave.id);
                            setIsFav(true);
                        }}
                        className="absolute right-6 top-0 size-7 cursor-pointer"
                    />
                )}
                <img
                    src={setIcon}
                    className="h-[150px] mb-6"
                    alt=""
                />
                <p className="text-5xl font-poppins">
                    <span>{lastSave.temp}</span>
                    <span className="text-4xl"> °C</span>
                </p>
                <p className="text-xl mb-5 mt-1">{lastSave.desc}</p>
                <h1 className="text-2xl font-bold font-poppins ">
                    <span>{lastSave.name}</span> , <span>{lastSave.country}</span>
                </h1>

                <div className="grid w-full grid-cols-[auto_1fr_auto] mt-7 px-4">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center text-2xl">
                            <FaWind className="size-7 mr-3" />
                            <p>
                                <span>{lastSave.wind}</span>
                                <span className="text-lg"> Km/hr</span>
                            </p>
                        </div>
                        <span className="text-lg">wind speed</span>
                    </div>
                    <div></div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center text-2xl">
                            <FaWater className="size-7 mr-3" />
                            <p>
                                <span>{lastSave.humidity}</span>
                                <span className="text-lg"> %</span>
                            </p>
                        </div>
                        <span className="text-lg">humidity</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
