



import { useState } from "react";
// import img2 from "../../../public/img/map.png";
// import img3 from "../../../public/img/map.png";
// import img4 from "../../../public/img/map.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Suntan",
        position: "Frontend Developer",
        image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
        quote:
            '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
    },
    {
        id: 2,
        name: "Rasif",
        position: "Frontend Developer",
        image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
        quote:
            '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
    },
    {
        id: 3,
        name: "Bijoy Vi",
        position: "Frontend Developer",
        image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/boy-snow-hoodie.jpg",
        quote:
            '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
    },
    {
        id: 4,
        name: "Pappu Bhai",
        position: "Frontend Developer",
        image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/people/kitchen-bar.jpg",
        quote:
            '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
    },
    {
        id: 5,
        name: "Sojib Bhai",
        position: "Frontend Developer",
        image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529167/samples/animals/cat.jpg",
        quote:
            '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
    },
];

const Review = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 600);
    };

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 600);
    };

    const getCardPosition = (index) => {
        const totalItems = testimonials.length;
        const distance = (index - currentIndex + totalItems) % totalItems;
        const shortestDistance = distance <= totalItems / 2 ? distance : distance - totalItems;

        if (shortestDistance === 0) return "center";
        if (shortestDistance === 1 || shortestDistance === -1) return "adjacent";
        return "edge";
    };

    return (
        <div className="py-16 px-4">
            <div className="max-w-[165vh] mx-auto">
                <div className="text-center w-1/2 mx-auto mb-12">
                    <p className="text font-bold text-4xl mb-2">What Our Customers Say</p>
                    <h2 className="md:text-xl   text-gray-400 ">
                        Hear from buyers and sellers who have successfully used GlobalLand to achieve their land ownership goals.
                    </h2>
                </div>

                <div className="relative">
                    <div className="relative h-[500px] flex items-center justify-center overflow-hidden perspective-1000">
                        <div className="absolute w-full flex justify-center items-center">
                            {testimonials.map((testimonial, index) => {
                                const position = getCardPosition(index);

                                let transform = "";
                                switch (position) {
                                    case "center":
                                        transform = "translateX(0%) scale(1) rotateY(0deg)";
                                        break;
                                    case "adjacent":
                                        transform =
                                            (index - currentIndex + testimonials.length) % testimonials.length === 1
                                                ? "translateX(100%) scale(0.85) rotateY(-5deg)"
                                                : "translateX(-100%) scale(0.85) rotateY(5deg)";
                                        break;
                                    case "edge":
                                        transform =
                                            (index - currentIndex + testimonials.length) % testimonials.length <= 2
                                                ? "translateX(185%) scale(0.7) rotateY(-10deg)"
                                                : "translateX(-185%) scale(0.7) rotateY(10deg)";
                                        break;
                                }

                                const cardStyles = {
                                    transform,
                                    transformStyle: "preserve-3d",
                                    zIndex: position === "center" ? 30 : position === "adjacent" ? 20 : 10,
                                    opacity: position === "center" ? 1 : position === "adjacent" ? 0.9 : 0.7,
                                    height: "350px",
                                    width: "100%",
                                    maxWidth: "300px",
                                    transitionProperty: "transform, opacity",
                                };

                                return (
                                    <div
                                        key={testimonial.id}
                                        className="absolute shadow-md transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                        style={cardStyles}
                                    >
                                        <div
                                            className={`rounded-lg shadow-xl p-6 h-full flex flex-col items-center overflow-hidden ${position === "center"
                                                ? "bg-white dark:bg-gray-100" // Active card: blue-500 in dark mode
                                                : "bg-white dark:bg-gray-300" // Inactive cards: gray-800 in dark mode
                                                }`}
                                        >
                                            {/* {position === "center" && (
                        <>
                          <img src={img3} alt="" className="absolute left-5" />
                          <img src={img4} alt="" className="absolute right-5" />
                        </>
                      )} */}
                                            <div
                                                className={`absolute -top-14 rounded-full overflow-hidden border-2 border-blue-100 dark:border-gray-900 ${position === "center"
                                                    ? "w-32 h-32"
                                                    : position === "adjacent"
                                                        ? "w-24 h-24"
                                                        : "w-16 h-16 mt-5"
                                                    }`}
                                            >
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* <div
                                                className={`text-blue-600 dark:text-blue-400 mb-2 ${position === "center"
                                                    ? "h-8 mt-20"
                                                    : position === "adjacent"
                                                        ? "h-6 mt-10"
                                                        : "h-4 mt-2"
                                                    }`}
                                            >
                                                <img src='' alt="Quote decoration" className="w-full h-full object-contain" />
                                            </div> */}

                                            <h3
                                                className={`font-bold mt-14 ${position === "center"
                                                    ? "text-xl text-gray-800" // White text in dark mode for active card
                                                    : position === "adjacent"
                                                        ? "text-lg text-gray-900 "
                                                        : "text-base text-gray-900 "
                                                    }`}
                                            >
                                                {testimonial.name}
                                            </h3>

                                            <p
                                                className={`mb-4 font-bold ${position === "center"
                                                    ? "text-base text-gray-700 " // Adjusted for contrast in dark mode
                                                    : position === "adjacent"
                                                        ? "text-sm text-gray-700 "
                                                        : "text-xs text-gray-700 "
                                                    }`}
                                            >
                                                {testimonial.position}
                                            </p>

                                            <p
                                                className={`text-center font-[500] overflow-hidden ${position === "center"
                                                    ? "text-base text-gray-600  leading-relaxed" // Adjusted for contrast
                                                    : position === "adjacent"
                                                        ? "text-sm text-gray-600 dark:text-gray-400 leading-snug"
                                                        : "text-xs text-gray-600 dark:text-gray-400 leading-tight line-clamp-3"
                                                    }`}
                                            >
                                                {position === "center"
                                                    ? testimonial.quote
                                                    : position === "adjacent"
                                                        ? testimonial.quote.length > 120
                                                            ? `${testimonial.quote.substring(0, 120)}...`
                                                            : testimonial.quote
                                                        : testimonial.quote.length > 80
                                                            ? `${testimonial.quote.substring(0, 80)}...`
                                                            : testimonial.quote}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-center mt-8 gap-4">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full bg g-blue-900 dark:bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                            aria-label="Previous testimonial"
                            disabled={isAnimating}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg dark:bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                            aria-label="Next testimonial"
                            disabled={isAnimating}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;