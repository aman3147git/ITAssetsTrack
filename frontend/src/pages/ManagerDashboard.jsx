import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequests, updateRequestStatus } from "../redux/requestSlice";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const {
    history: requestsRaw,
    loading,
    error,
  } = useSelector((s) => s.requests);
  console.log("Redux state:", requestsRaw);

  const requests = Array.isArray(requestsRaw) ? requestsRaw : [];

  useEffect(() => {
    dispatch(fetchAllRequests());
  }, [dispatch]);

  const handleUpdate = (id, status) => {
    dispatch(updateRequestStatus({ id, status }))
      .unwrap()
      .then(() => {
        dispatch(fetchAllRequests());
      });
  };

  const pendingRequests = requests.filter(
    (r) => r.status?.toLowerCase().trim() === "pending"
  );

  const historyRequests = requests.filter(
    (r) => r.status?.toLowerCase().trim() !== "pending"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-gray-100 p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white tracking-wide">
        Manager Dashboard
      </h1>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="flex-1 bg-neutral-950 p-6 rounded-2xl shadow-xl border border-neutral-800">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">
            Pending Requests
          </h2>
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500">No pending requests</p>
          ) : (
            <ul className="space-y-6">
              {pendingRequests.map((req) => (
                <li
                  key={req._id}
                  className="border border-neutral-800 rounded-xl p-5 bg-neutral-900 hover:bg-neutral-800 transition duration-300 shadow-lg"
                >
                  <p>
                    <strong>Employee:</strong> {req.requestedBy?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Asset:</strong> {req.assetType}
                  </p>
                  <p>
                    <strong>Justification:</strong> {req.justification}
                  </p>
                  <p>
                    <strong>Needed By:</strong> {req.neededBy}
                  </p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleUpdate(req._id, "Approved")}
                      className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdate(req._id, "Rejected")}
                      className="bg-red-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-red-400 transition"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1 bg-gradient-to-br from-black via-neutral-900 to-black p-6 rounded-xl shadow-xl border border-gray-800">
  <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
    Request History
  </h2>
  {historyRequests.length === 0 ? (
    <p className="text-gray-400">No history available</p>
  ) : (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {historyRequests.map((req) => (
        <li
          key={req._id}
          className="rounded-lg p-4 bg-gray-900/60 border border-gray-700 
                     backdrop-blur-md shadow-md hover:shadow-xl 
                     hover:scale-[1.02] transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-semibold text-white truncate">
              {req.assetType}
            </h3>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                req.status === "Approved"
                  ? "bg-green-500/20 text-green-400 border border-green-500"
                  : req.status === "Rejected"
                  ? "bg-red-500/20 text-red-400 border border-red-500"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
              }`}
            >
              {req.status}
            </span>
          </div>

          <p className="text-sm text-gray-300">
            <strong>Employee:</strong> {req.requestedBy?.name || "N/A"}
          </p>
          <p className="text-sm text-gray-300 line-clamp-2">
            <strong>Justification:</strong> {req.justification}
          </p>
          <p className="text-sm text-gray-400">
            <strong>By:</strong> {req.approvedBy ? req.approvedBy.name : "Pending"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(req.submittedAt).toLocaleDateString()} →{" "}
            {req.updatedAt ? new Date(req.updatedAt).toLocaleDateString() : "—"}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  );
}
