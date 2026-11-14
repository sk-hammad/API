
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Property() {
    const navigate = useNavigate();

    const API_URL = "http://localhost:4000/api/v1/property";

    const token = localStorage.getItem("JWT");

    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };



    // Update property modal
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState("");

    const [Editproperty, setEditproperty] = useState({
  
        Pro_Name: "",
        Type: "",
        RK_BHK: "",
        Rent: "",
        Area: "",
        Furnishing: ""
    });
    // Property list
    const [properties, setProperties] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    // Add property modal
    const [showAddForm, setShowAddForm] = useState(false);
    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState("");
    const [message, setMessage] = useState("");

    // Add property form data
    const [Addproperty, setproperty] = useState({
    
        Pro_Name: "",
        Type: "",
        RK_BHK: "",
        Rent: "",
        Area: "",
        Furnishing: ""
    });


    const OpenUpdateForm = (property) => {
        setEditingId(property._id);

        setEditproperty({
            Pro_Name: property.Pro_Name,
            Type: property.Type,
            RK_BHK: property.RK_BHK,
            Rent: property.Rent,
            Area: property.Area,
            Furnishing: property.Furnishing
        });

        setUpdateError("");
        setShowUpdateForm(true);
    };

    // Handle update form input changes
    const HandleEditChange = (e) => {
        const { name, value } = e.target;

        setEditproperty((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const UpdatePro = async (e) => {
        e.preventDefault();
        try{
            setUpdating(true);
            setUpdateError("");
            
            const propertyData = {
                ...Editproperty,
                Rent: Number(Editproperty.Rent),
                Area: Number(Editproperty.Area)
            };

            const response = await fetch(
                `${API_URL}/Update/${editingId}`,
                {
                    method:"PATCH",
                    headers:authHeaders,
                    body: JSON.stringify(Editproperty)
                }
            );

            const data = response.json();

            if (response.status === 401) {
                localStorage.removeItem("JWT");
                navigate("/");
                return;
            }

            if(!response.ok){
                throw new Error(data.message || "Unable to update property");
            }

            setMessage("Property updated successfully!");
            setShowUpdateForm(false);
            setEditingId(null);

            await ShowPro();

        }catch(error){
            setUpdateError(err.message || "Update failed")
        }finally{
            setUpdating(false);
        }
    }


    // GET: Show all properties
    const ShowPro = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/Show`, {
                method: "GET",
                headers: authHeaders
            });
            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("JWT");
                navigate("/");
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch properties");
            }

            setProperties(data.Propertiess || []);

        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        ShowPro();
    }, []);

    // Handle form input changes
    const Updatedetails = (e) => {
        const { name, value } = e.target;

        setproperty((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // POST: Add new property
    const Addprop = async (e) => {
        e.preventDefault();

        try {
            setAdding(true);
            setAddError("");
            setMessage("");

            const propertyData = {
                ...Addproperty,
                Rent: Number(Addproperty.Rent),
                Area: Number(Addproperty.Area)
            };

            const response = await fetch(`${API_URL}/Add`, {
                method: "POST",
                headers: authHeaders,
                body: JSON.stringify(propertyData)
            });

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("JWT");
                navigate("/");
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || "Unable to add property");
            }

            setMessage("Property added successfully!");

            // Reset form
            setproperty({
                Pro_Name: "",
                Type: "",
                RK_BHK: "",
                Rent: "",
                Area: "",
                Furnishing: ""
            });

            // Refresh property list
            await ShowPro();

            setShowAddForm(false);

        } catch (err) {
            setAddError(err.message || "Something went wrong");
        } finally {
            setAdding(false);
        }
    };

    // DELETE: Delete property
    const DeletePro = async (id) => {
        try {
            setDeletingId(id);
            setDeleteError("");

            const response = await fetch(`${API_URL}/Delete/${id}`, {
                method: "DELETE",
                headers: authHeaders
            });

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("JWT");
                navigate("/");
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || "Unable to delete property");
            }

            setProperties((prev) =>
                prev.filter((property) => property._id !== id)
            );

        } catch (err) {
            setDeleteError(err.message || "Delete failed");
        } finally {
            setDeletingId(null);
        }
    };



    // logout 
    const HandleLogout = () => {
        localStorage.removeItem("JWT");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Star Properties
                </h1>



                <button
                    onClick={() => {
                        setAddError("");
                        setShowAddForm(true);
                    }}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Add Property
                </button>
            </div>

            {/* Success Message */}
            {message && (
                <p className="text-green-600 mb-4">{message}</p>
            )}

            {/* Error Messages */}
            {error && (
                <p className="text-red-600 mb-4">{error}</p>
            )}

            {deleteError && (
                <p className="text-red-600 mb-4">{deleteError}</p>
            )}

            {/* Loading */}
            {loading ? (
                <p className="text-center text-lg">Loading properties...</p>
            ) : properties.length === 0 ? (
                <p className="text-center text-gray-600">
                    No properties found.
                </p>
            ) : (

                /* Property Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <button
                        onClick={HandleLogout}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>

                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="bg-white rounded-xl shadow-md p-5"
                        >
                            <h2 className="text-xl font-bold mb-3">
                                {property.Pro_Name}
                            </h2>

                            <div className="space-y-2 text-gray-700">
                                <p>
                                    <strong>Type:</strong> {property.Type}
                                </p>

                                <p>
                                    <strong>BHK:</strong> {property.RK_BHK}
                                </p>

                                <p>
                                    <strong>Rent:</strong> ₹{property.Rent}
                                </p>

                                <p>
                                    <strong>Area:</strong> {property.Area} sq.ft
                                </p>

                                <p>
                                    <strong>Furnishing:</strong> {property.Furnishing}
                                </p>
                            </div>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() => OpenUpdateForm(property)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() => DeletePro(property._id)}
                                    disabled={deletingId === property._id}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                                >
                                    {deletingId === property._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}

            {/* Add Property Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

                    <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-bold">
                                Add New Property
                            </h2>

                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="text-gray-500 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Add Property Form */}
                        <form onSubmit={Addprop} className="space-y-4">

                            <input
                                type="text"
                                name="Pro_Name"
                                value={Addproperty.Pro_Name}
                                onChange={Updatedetails}
                                placeholder="Property Name"
                                required
                                className="w-full border p-3 rounded-lg"
                            />

                            <select
                                name="Type"
                                value={Addproperty.Type}
                                onChange={Updatedetails}
                                required
                                className="w-full border p-3 rounded-lg"
                            >
                                <option value="">Select Property Type</option>
                                <option value="Sale">Sale</option>
                                <option value="Rental">Rent</option>
                                <option value="Pg">PG</option>
                                <option value="Commercial">Commercial</option>
                            </select>

                            <input
                                type="text"
                                name="RK_BHK"
                                value={Addproperty.RK_BHK}
                                onChange={Updatedetails}
                                placeholder="Example: 2 BHK"
                                required
                                className="w-full border p-3 rounded-lg"
                            />

                            <input
                                type="number"
                                name="Rent"
                                value={Addproperty.Rent}
                                onChange={Updatedetails}
                                placeholder="Rent / Price"
                                min="0"
                                required
                                className="w-full border p-3 rounded-lg"
                            />

                            <input
                                type="number"
                                name="Area"
                                value={Addproperty.Area}
                                onChange={Updatedetails}
                                placeholder="Area (sq.ft)"
                                min="0"
                                required
                                className="w-full border p-3 rounded-lg"
                            />

                            <select
                                name="Furnishing"
                                value={Addproperty.Furnishing}
                                onChange={Updatedetails}
                                required
                                className="w-full border p-3 rounded-lg"
                            >
                                <option value="">Select Furnishing</option>
                                <option value="Furnished">Furnished</option>
                                <option value="Furnished">Semi-Furnished</option>
                                <option value="Unfurnished">Unfurnished</option>
                            </select>

                            {addError && (
                                <p className="text-red-600">{addError}</p>
                            )}

                            <div className="flex gap-3">

                                <button
                                    type="submit"
                                    disabled={adding}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {adding ? "Adding..." : "Add Property"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 bg-gray-300 py-3 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}


            {/* Update Property Modal */}
            {showUpdateForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

                    <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-2xl font-bold">
                                Update Property
                            </h2>

                            <button
                                type="button"
                                onClick={() => setShowUpdateForm(false)}
                                className="text-gray-500 text-2xl"
                            >
                                &times;
                            </button>

                        </div>

                        <form onSubmit={UpdatePro} className="space-y-4">

                            <input
                                type="text"
                                name="Pro_Name"
                                value={Editproperty.Pro_Name}
                                onChange={HandleEditChange}
                                placeholder="Property Name"
                                required
                                className="w-full border p-3 rounded-lg"
                            />

                            <select
                                name="Type"
                                value={Editproperty.Type}
                                onChange={HandleEditChange}
                                required
                                className="w-full border p-3 rounded-lg"
                            >
                                <option value="">Select Property Type</option>
                                <option value="Sale">Sale</option>
                                <option value="Rental">Rent</option>
                                <option value="Pg">PG</option>
                                <option value="Commercial">Commercial</option>
                            </select>

                            <select
                                name="RK_BHK"
                                value={Editproperty.RK_BHK}
                                onChange={HandleEditChange}
                                required
                                className="w-full border p-3 rounded-lg"
                            >
                                <option value="">Select Room Type</option>
                                <option value="RK">RK</option>
                                <option value="1 BHK">1 BHK</option>
                                <option value="2 BHK">2 BHK</option>
                                <option value="3 BHK">3 BHK</option>
                                <option value="4 BHK">4 BHK</option>
                                <option value="5 BHK">5 BHK</option>
                                <option value="6 BHK">6 BHK</option>
                            </select>

                            <input
                                type="number"
                                name="Rent"
                                value={Editproperty.Rent}
                                onChange={HandleEditChange}
                                placeholder="Rent / Price"
                                min="0"
                                required
                                className="w-full border p-3 rounded-lg"
                            />

                            <input
                                type="number"
                                name="Area"
                                value={Editproperty.Area}
                                onChange={HandleEditChange}
                                placeholder="Area (sq.ft)"
                                min="1"
                                required
                                className="w-full border p-3 rounded-lg"
                            />

                            <select
                                name="Furnishing"
                                value={Editproperty.Furnishing}
                                onChange={HandleEditChange}
                                required
                                className="w-full border p-3 rounded-lg"
                            >
                                <option value="">Select Furnishing</option>
                                <option value="Furnished">Furnished</option>
                                <option value="Unfurnished">Unfurnished</option>
                                <option value="Fully Furnished">Fully Furnished</option>
                            </select>

                            {updateError && (
                                <p className="text-red-600">{updateError}</p>
                            )}

                            <div className="flex gap-3">

                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {updating ? "Updating..." : "Update Property"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowUpdateForm(false)}
                                    className="flex-1 bg-gray-300 py-3 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Property;
