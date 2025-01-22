import { MagnifyingGlass } from "react-loader-spinner";

const Loader = ({ text }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white py-3 rounded-2xl max-w-sm w-[280px] relative flex flex-col items-center justify-center text-black">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#fafafa"
        color="black"
      />
      <p className="text-center text-lg bold-poppins">{text || "Loading..."}</p>
      <p className="p-2 text-center text-sm text-gray-500">
        {
          "Hold tight! It may take longer to get the response from server, bcz our server is deployed on free tier."
        }
      </p>
    </div>
  </div>
);

export default Loader;
