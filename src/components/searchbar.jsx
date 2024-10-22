
const SearchBar = ({ handleSearch, setIpInput, ipInput }) => {
  return (
    <div className="flex justify-center mt-5">
      <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
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
    </div>
  );
};

export default SearchBar;
