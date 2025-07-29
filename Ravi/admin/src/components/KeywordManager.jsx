import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const KeywordManager = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState([]);

  const fetchKeywords = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/keyword`);
      if (response.data.success) {
        setKeywords(response.data.keywords);
      } else {
        toast.error(response.data.message || "Failed to fetch keywords");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching keywords");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this keyword?")) return;

    try {
      const response = await axios.delete(`${backendUrl}/api/keyword/${id}`);
      if (response.data.success) {
        toast.success("Keyword deleted");
        fetchKeywords(); // Refresh list
      } else {
        toast.error(response.data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting keyword");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      toast.error("Name and description required");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/keyword/generate`, {
        name,
        description,
      });

      if (response.data.success) {
        toast.success("Keyword added");
        setName("");
        setDescription("");
        fetchKeywords();
      } else {
        toast.error(response.data.message || "Failed to add keyword");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding keyword");
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Add Keyword</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input
          type="text"
          placeholder="Keyword Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Keyword Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full h-28"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Keyword
        </button>
      </form>

      <h3 className="text-lg font-bold mt-8 mb-2">Existing Keywords</h3>
      <div className="space-y-3">
        {keywords.map((k) => (
          <div key={k._id} className="border p-3 rounded shadow">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{k.keyword}</h4>
              <button
                onClick={() => handleDelete(k._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
            <div
              className="mt-2 text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: k.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordManager;
