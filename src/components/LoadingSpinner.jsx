import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="absolute flex justify-center items-center z-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl p-6 bg-white/30">
            <div className="relative w-16 h-16">
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="block absolute w-16 h-16 border-[7px] border-lightbg border-t-darkbg rounded-full"
                ></motion.span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
