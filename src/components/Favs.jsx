import { useRef, useState } from "react";
import SavedItem from "./SavedItem";
import { IoMdClose, IoMdStarOutline, IoLogoGithub } from "react-icons/io";

const Favs = ({ savesArray, removeFromFavs, getWeatherDetails, setCityID }) => {
    const [isOpen, setIsOpen] = useState(false);
    const savedCities = useRef(null);

    const handleIconClick = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };
    return (
        <>
            <div>
                <IoMdStarOutline
                    className={`absolute z-40 right-4 top-3 size-9 cursor-pointer fill-white p-1 rounded-full bg-[#657a99]`}
                    onClick={handleIconClick}
                />
            </div>

            <div
                className={`fixed z-50 right-0 top-0 h-screen py-5 px-3 pt-14 rounded-l-xl flex flex-col text-white bg-darkbg w-[300px] transition-transform duration-300 ${
                    isOpen ? " translate-x-0" : " translate-x-full"
                }`}
            >
                <IoMdClose
                    className={`absolute left-4 top-4 size-7 cursor-pointer`}
                    onClick={handleIconClick}
                />

                <h2 className={`text-2xl font-semibold text-center mb-6`}>Favourites</h2>
                <div
                    ref={savedCities}
                    className="flex relative flex-col justify-center w-full px-1 gap-4 text-textCol"
                >
                    {savesArray.map((item) => {
                        return (
                            <SavedItem
                                name={item.name}
                                id={item.id}
                                key={item.id}
                                removeFromFavs={removeFromFavs}
                                getWeatherDetails={getWeatherDetails}
                                setIsOpen={setIsOpen}
                                setCityID={setCityID}
                            />
                        );
                    })}
                </div>

                <a
                    href="https://github.com/hasrku"
                    className="flex items-center absolute bottom-1 left-1/2 translate-x-[-50%]"
                >
                    <IoLogoGithub /> &nbsp;@
                    <span className="font-mono">hasrku</span>
                </a>
            </div>
            <div
                className={`w-screen h-screen bg-transparent backdrop-blur-sm sm:backdrop-blur-0 absolute top-0 left-0 z-40 ${
                    isOpen ? "block" : "hidden"
                }`}
                onClick={handleIconClick}
            ></div>
        </>
    );
};

export default Favs;
