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

        <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
            Request History
          </h2>
          {historyRequests.length === 0 ? (
            <p className="text-gray-400">No history available</p>
          ) : (
            <ul className="space-y-5">
              {historyRequests.map((req) => (
                <li
                  key={req._id}
                  className="rounded-xl p-5 bg-gray-800/60 border border-gray-700 backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-[1.01] transform transition duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      {req.assetType}
                    </h3>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        req.status === "Approved"
                          ? "bg-green-500/20 text-green-400 border border-green-500"
                          : "bg-red-500/20 text-red-400 border border-red-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-gray-300">
                    <strong>Employee:</strong> {req.requestedBy?.name || "N/A"}
                  </p>
                  <p className="text-gray-300">
                    <strong>Justification:</strong> {req.justification}
                  </p>
                  <p className="text-gray-300">
                    <strong>Approved/Rejected By:</strong>{" "}
                    {req.approvedBy ? req.approvedBy.name : "Pending"}
                  </p>
                  <p className="text-gray-300">
                    <strong>Submitted At:</strong> {req.submittedAt}
                  </p>
                  <p className="text-gray-300">
                    <strong>Approved on:</strong> {req.updatedAt}
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
