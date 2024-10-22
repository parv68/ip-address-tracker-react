const IPInfo = ({ ipData }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-5 my-1">
        {ipData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">IP ADDRESS</p>
              <h3 className="text-xl font-bold">{ipData.ip}</h3>
            </div>
            <div>
              <p className="text-gray-500 text-sm">LOCATION</p>
              <h3 className="text-xl font-bold">{`${ipData.city}, ${ipData.country_name} ${ipData.zipcode}`}</h3>
            </div>
            <div>
              <p className="text-gray-500 text-sm">TIMEZONE</p>
              <h3 className="text-xl font-bold">{`UTC ${ipData.time_zone?.offset || 'N/A'}`}</h3>
            </div>
            <div>
              <p className="text-gray-500 text-sm">ISP</p>
              <h3 className="text-xl font-bold">{ipData.isp}</h3>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default IPInfo;
