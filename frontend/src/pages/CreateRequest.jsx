import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequest } from "../redux/requestSlice";

export default function CreateRequest() {
  const [assetType, setAssetType] = useState("");
  const [justification, setJustification] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.requests);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assetType.trim() || !justification.trim() || !neededBy.trim()) return;

    dispatch(createRequest({ assetType, justification, neededBy }));

    setAssetType("");
    setJustification("");
    setNeededBy("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6">
      <div
        className="w-full max-w-lg p-8" 
      >
        <h2
          className="text-3xl font-extrabold mb-6 text-center 
                       bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 
                       tracking-tight"
        >
          Create Asset Request
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Request the tools you need to succeed.
          <span className="block">Stay productive. Stay empowered.</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Enter asset type (e.g., Laptop)"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="px-4 py-3 rounded-md w-full bg-gray-900/80 text-gray-200 
                       border border-gray-700 "
          />

          <textarea
            placeholder="Why do you need this asset?"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="px-4 py-3 rounded-md w-full bg-gray-900/80 text-gray-200 
                       border border-gray-700 focus:ring-2 h-28"
          />

          <input
            type="date"
            value={neededBy}
            onChange={(e) => setNeededBy(e.target.value)}
            className="px-4 py-3 rounded-md w-full bg-gray-900/80 text-gray-200 
                       border border-gray-700 focus:ring-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-green-600 to-indigo-700 
                       hover:from-green-500 hover:to-indigo-600 
                       text-white font-semibold py-3 rounded-md 
                       transition-all duration-300 shadow-lg hover:shadow-blue-500/30
                       disabled:opacity-50"
          >
            {loading ? "Submitting..." : " Submit Request"}
          </button>
        </form>

        {error && (
          <p className="text-red-400 mt-4 text-center text-sm">
            {typeof error === "string"
              ? error
              : error.message || error.error || JSON.stringify(error)}
          </p>
        )}
      </div>
    </div>
  );
}
