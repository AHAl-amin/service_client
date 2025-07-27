

import { useState } from "react"

export default function BuyerNotification({ isOpen, onClose }) {
    if (!isOpen) return null;
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "property",
            title: "New Property Match",
            description: "A new property matching your saved search 'Mountain Properties' has been listed.",
            time: "10 minutes ago",
            icon: "location",
            actionText: "View Details",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            id: 2,
            type: "message",
            title: "New Message",
            description: "You have a new message from Mountain Land Specialists regarding Mountain View Ranch.",
            time: "10 minutes ago",
            icon: "message",
            actionText: "View Message",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            id: 3,
            type: "ownership",
            title: "Share Ownership Update",
            description: "A new buyer has expressed interest in Oceanfront Paradise. 4/5 buyers now interested.",
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

    const LocationIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )

    const MessageIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
        </svg>
    )

    const UsersIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
        </svg>
    )

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
                return <LocationIcon />
            case "message":
                return <MessageIcon />
            case "users":
                return <UsersIcon />
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
