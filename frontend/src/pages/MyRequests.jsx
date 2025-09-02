import { useSelector } from "react-redux";
import { FaLaptop, FaMouse, FaKeyboard, FaMobileAlt, FaPrint, FaWatchmanMonitoring, FaCalculator } from "react-icons/fa";

const MyRequests = () => {
  const { list, loading, error } = useSelector((state) => state.requests);

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-400">
        {typeof error === "string" ? error : error.message || JSON.stringify(error)}
      </p>
    );

  if (!Array.isArray(list) || list.length === 0) {
    return (
      <p className="text-center text-gray-400 text-lg mt-12">
         No requests found
      </p>
    );
  }

  const assetIcons = {
    laptop: <FaLaptop className="text-5xl text-blue-400" />,
    mouse: <FaMouse className="text-5xl text-green-400" />,
    keyboard: <FaKeyboard className="text-5xl text-purple-400" />,
    mobile: <FaMobileAlt className="text-5xl text-yellow-400" />,
    printer: <FaPrint className="text-5xl text-red-400" />,
    calculator: <FaCalculator className="text-5xl text-red-400" />,
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 py-10">
      
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-12">
         My Asset Requests 
      </h1>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((req) => (
          <div
            key={req._id}
            className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl rounded-2xl 
                       hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            
            <div className="flex items-center justify-between mb-4">
              <div className="">{assetIcons[req.assetType.toLowerCase()]}</div>
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide ${
                  req.status === "approved"
                    ? "bg-green-600 text-white"
                    : req.status === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {req.status.toUpperCase()}
              </span>
            </div>

            
            <h3 className="font-bold text-2xl text-white mb-2">
              {req.assetType}
            </h3>
            <p className="text-gray-300 mb-2">{req.justification}</p>
            <p className="text-gray-300 mb-2">Approved/Rejected: {req.approvedBy?.name}</p>
            <p className="text-gray-400 text-sm">
               Needed By:{" "}
              <span className="text-gray-200 font-medium">
                {new Date(req.neededBy).toLocaleDateString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;
