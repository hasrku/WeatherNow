import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const SavedItem = ({ name, id, removeFromFavs, getWeatherDetails, setIsOpen, setCityID }) => {
    const [openOptions, setOpenOptions] = useState(false);
    return (
        <div className="relative">
            <div className="relative z-[60] flex items-center px-4 w-full h-16 bg-bgCol rounded-2xl">
                <p
                    className="text-xl cursor-pointer flex-grow"
                    onClick={() => {
                        // getWeatherDetails(name);
                        setCityID(id);
                        setIsOpen(false);
                        setTimeout(() => getWeatherDetails(name), 0);
                    }}
                >
                    {name}
                </p>
                <div className="absolute z-[60] right-4 top-[50%] translate-y-[-50%] w-9 h-full flex justify-end items-center">
                    <HiDotsVertical
                        onClick={() => setOpenOptions(true)}
                        className="cursor-pointer size-6"
                    />
                </div>
            </div>
            {openOptions && (
                <>
                    <div
                        onClick={() => removeFromFavs(id)}
                        className="absolute z-[70] right-5 top-[80%] w-32 px-4 py-2 cursor-pointer text-lg bg-white grid grid-cols-[1fr_auto] rounded-md shadow-md"
                    >
                        <IoIosRemoveCircleOutline className="text-red-500 size-6" /> <p> remove</p>
                    </div>
                </>
            )}
            {openOptions && (
                <div
                    onClick={() => setOpenOptions(false)}
                    className="absolute z-[65] translate-x-[-30%] translate-y-[-20%] w-screen h-screen bg-transparent"
                ></div>
            )}
        </div>
    );
};

export default SavedItem;
