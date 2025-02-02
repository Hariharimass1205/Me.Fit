"use client";

import Layout from "../../../components/admin/layout";
import { changeCoachStatus, fetchDataList, handleBlockFun, handleUnBlockFun } from "../../../service/adminApi";
import { useEffect, useState } from "react";

interface Coach {
  id: string;
  userName: string;
  phone: string;
  quizScore: string;
  isBlocked: boolean;
  email: string;
  isApproved: string;
}

const CoachList: React.FC = () => {
  const [coach, setCoach] = useState<Coach[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataList();
        setCoach(data?.coaches || []);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch coaches. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const handleBlock = async (email: string) => {
    try {
      const result = await handleBlockFun(email);
      if (result) {
        setCoach((prevCoaches) =>
          prevCoaches.map((coach) =>
            coach.email === email ? { ...coach, isBlocked: true } : coach
          )
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error blocking user:", error);
    }
  };

  const handleUnBlock = async (email: string) => {
    try {
      const result = await handleUnBlockFun(email);
      if (result) {
        setCoach((prevCoaches) =>
          prevCoaches.map((coach) =>
            coach.email === email ? { ...coach, isBlocked: false } : coach
          )
        );
      }
    } catch (error) {
      console.log("Error unblocking user:", error);
    }
  };

  const handleApprovalChange = async (email: string, newStatus: string) => {
    setCoach((prevCoaches) =>
      prevCoaches.map((coach) =>
        coach.email === email ? { ...coach, isApproved: newStatus } : coach
      )
    );
    try {
      const result = await changeCoachStatus(email, newStatus);
      if (result) {
        console.log(`Approval status for ${email} updated to: ${newStatus}`);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to set status of coaches. Please try again later.");
    }
  };

  const openModal = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCoach(null);
    setIsModalOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredCoaches = coach.filter((coach) =>
    coach.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentCoaches = filteredCoaches.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Layout>
      <div className="flex justify-between shadow-lg items-center p-4 bg-white rounded-3xl">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by Name, Email, or Phone"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 text-black"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span role="img" aria-label="Notifications">🔔</span>
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-black mt-10 mb-6 text-center">
        Coach Management
      </h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : currentCoaches.length > 0 ? (
        <div className="text-black overflow-x-auto px-4 py-4">
          <table className="min-w-full table-auto border-collapse border border-gray-900">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Quiz Score</th>
                <th className="border px-4 py-2">Approval</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCoaches.map((coach, index) => (
                <tr key={index} className="text-center hover:bg-gray-100">
                  <td className="border px-4 py-2">{coach.userName}</td>
                  <td className="border px-4 py-2">{coach.phone}</td>
                  <td className="border px-4 py-2">{coach.email}</td>
                  <td className="border px-4 py-2">{coach.quizScore}</td>
                  <td className="border px-4 py-2">
                    {coach.isApproved === "Accept" ? (
                      <span className="text-green-600 font-medium">Coach Accepted</span>
                    ) : (
                      <select
                        value={coach.isApproved}
                        onChange={(e) => handleApprovalChange(coach.email, e.target.value)}
                        className="bg-lime-400 w-32 shadow-lg items-center pl-3 text-black font-medium p-2 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                      </select>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {!coach.isBlocked ? (
                      <button
                        onClick={() => openModal(coach)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnBlock(coach.email)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700">Loading coaches...</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ml-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedCoach && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-black font-bold mb-4">Confirm Block</h2>
            <p className="text-black">
              Are you sure you want to block <strong>{selectedCoach.userName}</strong>?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBlock(selectedCoach.email)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CoachList;
