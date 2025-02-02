import { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import data from "../assets/files/city-list.json";

const Search = ({ getWeatherDetails, cityName, setCityName, setCityID }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [city, setcity] = useState("");
    const lastSave = localStorage.getItem("lastLocationData");

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            getWeatherDetails(cityName);
        }
    };

    return (
        <div className={`z-20 w-[80%] md:w-[350px]  absolute ${lastSave !== null ? " top-28 sm:top-24 " : "top-1/3"} `}>
            <div className="relative h-full shadow-lg text-white">
                <input
                    onChange={(e) => {
                        setCityName(e.target.value);
                    }}
                    onKeyDown={handleKeyPress}
                    onFocus={() => {
                        setIsFocus(true);
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            setIsFocus(false);
                        }, 200);
                    }}
                    value={cityName}
                    type="text"
                    spellCheck="false"
                    className={`bg-[#ffffff39] text-white pr-[88px] p-2 text-xl rounded-md w-full  focus:outline-none`}
                ></input>
                {cityName && (
                    <IoClose
                        className="absolute size-7 top-[50%] translate-y-[-50%] right-[58px]"
                        onClick={() => {
                            setCityName("");
                        }}
                    />
                )}
                <button
                    onClick={() => {
                        setCityID(city);
                        getWeatherDetails(cityName);
                    }}
                    className="absolute top-[50%] right-0 bg-darker rounded-r-md h-[96%] px-4 translate-y-[-50%]"
                >
                    <IoSearch className="size-5 text-bgCol" />
                </button>
            </div>
            {isFocus && (
                <div className="  md:w-[350px] flex flex-col bg-white/35 backdrop-blur-md w-full text-darkest px-3 rounded-b-xl">
                    {data
                        .filter((item) => {
                            const searchTerm = cityName.toLowerCase();
                            const cityNameJson = item.name.toLowerCase();

                            return searchTerm && cityNameJson.startsWith(searchTerm);
                        })
                        .slice(0, 7)
                        .map((item) => (
                            <div
                                onClick={() => {
                                    setCityName(item.name);
                                    setcity(item.id);
                                }}
                                key={item.id}
                                className="text-lg border-b-[1px] border-slate-200 m-1 cursor-pointer"
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Search;
