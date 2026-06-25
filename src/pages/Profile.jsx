const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">

        {/* Avatar */}
        <div className="w-20 h-20 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
          {user?.name ? user.name.trim()[0].toUpperCase() : "U"}
        </div>

        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          {user?.name}
        </h2>

        <p className="text-gray-500 mb-6">
          {user?.email}
          
        </p>

        <div className="border-t pt-4 space-y-3">
          <button className="w-full bg-amber-600 text-white py-2 rounded-xl hover:bg-amber-700 transition">
            Edit Profile
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="w-full border border-amber-600 text-amber-600 py-2 rounded-xl hover:bg-amber-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;