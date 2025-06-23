

import { useState } from "react"
import SavedProperties from "./SavedProperties"
import SharedOwnership from "./SharedOwnership"

function WishList() {
  const [activeTab, setActiveTab] = useState("saved")

  return (
    <div className="p-5  mx-auto">
      <div className="flex gap-10 overflow-hidden border rounded-lg border-[#1C3988] bg-[#E8EBF3] p-2 mb-5">
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 py-3 px-6 text-xl font-medium transition-all duration-200 rounded-lg ${
            activeTab === "saved" ? "bg text-white" : " text "
          }`}
        >
          All Saved Properties
        </button>

        <button
          onClick={() => setActiveTab("shared")}
          className={`flex-1 py-3 px-6 text-xl font-medium transition-all duration-200 rounded-lg ${
            activeTab === "shared" ? "bg text-white" : " text "
          }`}
        >
          Shared Ownership
        </button>
      </div>

      <div>
        {activeTab === "saved" && <SavedProperties />}
        {activeTab === "shared" && <SharedOwnership />}
      </div>
    </div>
  )
}

export default WishList
