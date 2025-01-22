import Modal from "../modals/Modal";

const VisitsList = ({ onClose, list }) => {
  console.log(list);
  return (
    <Modal onClose={onClose}>
      <div className="max-h-[60vh] max-sm:w-[98%] max-sm:mx-auto overflow-y-auto">
        <p className="py-2 text-xl font-bold">All Visits</p>
        <div className="flex flex-col gap-4">
          {list?.map((visit) => (
            <div
              key={visit?._id}
              className="flex flex-col gap-4 p-2 border-[2px] border-black"
            >
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold w-[120px] text-nowrap">
                    Store ID
                  </p>
                  :
                  <p className="text-lg font-semibold w-full text-nowrap">
                    {visit?.storeId || "N/A"}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold w-[120px] text-nowrap">
                    Store Name
                  </p>
                  :
                  <p className="text-lg font-semibold w-full text-nowrap">
                    {visit?.storeName || "N/A"}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold w-[120px] text-nowrap">
                    Area Code
                  </p>
                  :
                  <p className="text-lg font-semibold w-full text-nowrap">
                    {visit?.areaCode || "N/A"}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold w-[120px] text-nowrap">
                    Visit Time
                  </p>
                  :
                  <p className="text-lg font-semibold w-full text-nowrap">
                    {visit?.visit_time || "N/A"}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold w-[120px] text-nowrap">
                    Image URL(s)
                  </p>
                  :
                  <div className="flex items-center gap-3 w-full overflow-x-auto">
                    {visit?.image_url?.map((url, index) => (
                      <p
                        key={url + index}
                        className="py-1 px-2 rounded-md bg-gray-100"
                      >
                        {url}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default VisitsList;
