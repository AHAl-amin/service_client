

"use client"

import { useState } from "react"
import { FaRegUser } from "react-icons/fa6";
import { IoMdCheckmark, IoMdCheckmarkCircle } from "react-icons/io";
import { SiBosch } from "react-icons/si";

export default function SellerNotification({ isOpen, onClose }) {
    if (!isOpen) return null;
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "property",
            title: "Listing Approved",
            description: "Your weekly boost for 'Lakefront Property' is now active. Your listing will receive premium visibility for 7 days.",
            time: "10 minutes ago",
            icon: "location",
            actionText: "View Details",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            id: 2,
            type: "message",
            title: "John Smith ",
            description: "You have a new message from John Smith regarding Mountain View Lot.",
            time: "10 minutes ago",
            icon: "message",
            actionText: "Reply to Message",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            id: 3,
            type: "ownership",
            title: "Boost activated",
            description: "Your listing 'Forest Retreat' has been approved and is now live on the marketplace.",
            time: "10 minutes ago",
            icon: "users",
            actionText: "View Details",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
    ])

    const deleteNotification = (id) => {
        setNotifications(notifications.filter((notification) => notification.id !== id))
    }



    const TrashIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
        </svg>
    )

    const getIcon = (iconType) => {
        switch (iconType) {
            case "location":
                return <SiBosch />
            case "message":
                return <FaRegUser />
            case "users":
                return <IoMdCheckmark />
            default:
                return <LocationIcon />
        }
    }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-opacity-30 p-4">
    <div className="w-5xl h-[80vh] bg-white rounded-xl overflow-y-auto relative p-6 shadow-xl">
      <h1 className="text-2xl text font-bold mb-6">Notifications</h1>
      <button
        className="absolute top-4 right-4 text hover:text-gray-800"
        onClick={onClose}
      >
        ✕
      </button>
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text text-lg">No notifications</div>
          <div className="text text-sm mt-2">You're all caught up!</div>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
          >
            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div
                                    className={`flex-shrink-0 w-12 h-12 rounded-full ${notification.iconBg} flex items-center justify-center ${notification.iconColor}`}
                                >
                                    {getIcon(notification.icon)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text mb-1">{notification.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{notification.description}</p>
                                            <button className="bg cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                                                {notification.actionText}
                                            </button>
                                        </div>

                                        {/* Time and Delete */}
                                        <div className="flex items-start gap-3 flex-shrink-0">
                                            <span className="text text-sm whitespace-nowrap">{notification.time}</span>
                                            <button
                                                onClick={() => deleteNotification(notification.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors duration-200 cursor-pointer"
                                                aria-label="Delete notification"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

}
