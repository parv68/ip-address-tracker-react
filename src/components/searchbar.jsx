
const SearchBar = ({ handleSearch, setIpInput, ipInput }) => {
  return (
    <div className="flex justify-center bg-blue-500 py-6 text-white text-center">
      <header>
        <h1 className="text-3xl font-bold mb-10">IP Address Tracker</h1>
        <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto mb-4">
        <input
          type="text"
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
          placeholder="Search for any IP address or domain"
          className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-3 rounded-r-lg"
        >
          Search
        </button>
      </form>
      </header>
    </div>
  );
};

export default SearchBar;
