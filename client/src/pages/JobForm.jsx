import { Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import errorToast from "../components/toasters/error-toast";
import useAxios from "../hooks/useAxios";

const JobForm = () => {
  // custom hooks
  const { loading, error, data, sendRequest } = useAxios(
    "http://localhost:3000/"
  );
  // Initial state for visits
  const [visits, setVisits] = useState([
    {
      store_id: "",
      image_url: [""],
    },
  ]);

  // Handle input changes for store_id and image URLs
  const handleChange = (index, field, value, isImage = false) => {
    const newVisits = [...visits];
    if (isImage) {
      newVisits[index].image_url[field] = value;
    } else {
      newVisits[index][field] = value;
    }
    setVisits(newVisits);
  };

  // Add a new visit
  const addVisit = () => {
    setVisits([
      ...visits,
      {
        store_id: "",
        image_url: [""],
      },
    ]);
  };

  // Remove a visit
  const removeVisit = (index) => {
    const newVisits = visits.filter((_, i) => i !== index);
    setVisits(newVisits);
  };

  // Add a new image URL for a visit
  const addImageUrl = (index) => {
    const newVisits = [...visits];
    newVisits[index].image_url.push("");
    setVisits(newVisits);
  };

  // Remove an image URL from a visit
  const removeImageUrl = (visitIndex, urlIndex) => {
    const newVisits = [...visits];
    newVisits[visitIndex].image_url = newVisits[visitIndex].image_url.filter(
      (_, i) => i !== urlIndex
    );
    setVisits(newVisits);
  };

  // validation on visits
  const validateVisits = () => {
    visits.forEach((visit, index) => {
      if (!visit.store_id) {
        errorToast(`Store ID is required for visit ${index + 1}`);
        return false;
      }
      if (!visit.image_url.length) {
        errorToast(`At least one image URL is required for visit ${index + 1}`);
        return false;
      }
      visit.image_url.forEach((url) => {
        if (!url) {
          errorToast(`Image URL is required for visit ${index + 1}`);
          return false;
        }
      });
    });

    return true;
  };

  const handleSubmit = async () => {
    if (!validateVisits()) return;
    const newVisits = visits.map((visit) => ({
      ...visit,
      visit_time: new Date(),
    }));

    const body = {
      count: newVisits.length,
      visits: newVisits,
    };
    const response = await sendRequest({
      method: "POST",
      url: "api/submit",
      data: body,
    });
    console.log(loading);
    console.log(response);
  };

  return (
    <div className="w-full h-full items-center justify-center flex">
      <div className="gap-2 h-[90%] overflow-y-auto p-4 bg-white border-[4px] border-black w-[400px] flex flex-col max-sm:border-0 custom-scrollbar slight-up m-auto">
        <h2 className="text-xl font-bold underline mb-2">Job Form</h2>

        {visits.map((visit, visitIndex) => (
          <div key={visitIndex} className="w-full py-2 border-b border-black">
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={visit.store_id}
                onChange={(e) =>
                  handleChange(visitIndex, "store_id", e.target.value)
                }
                className="h-full p-2 border-[2px] outline-none border-black text-xl font-semibold w-full mr-2"
                placeholder="Store ID"
              />
              <button
                onClick={() => {
                  if (visits.length > 1) {
                    removeVisit(visitIndex);
                  } else {
                    errorToast("You can't remove the last visit");
                  }
                }}
                className="p-1 bg-red-500 text-white rounded"
              >
                <Trash size={20} weight="bold" />
              </button>
            </div>

            <div className="mb-2">
              <p className="font-semibold">Image URLs</p>
              {visit.image_url.map((url, urlIndex) => (
                <div key={urlIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) =>
                      handleChange(visitIndex, urlIndex, e.target.value, true)
                    }
                    className="h-full p-2 border-[2px] outline-none border-black text-lg w-full mr-2"
                    placeholder="Image URL"
                  />
                  <button
                    onClick={() => removeImageUrl(visitIndex, urlIndex)}
                    className="p-1 bg-red-500 text-white rounded"
                  >
                    <Trash size={20} weight="bold" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addImageUrl(visitIndex)}
                className="p-2 bg-black shrink-effect text-white"
              >
                <Plus size={25} weight="bold" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addVisit}
          className="p-2 bg-black text-white mt-4 shrink-effect"
        >
          Add More Visit
        </button>
        <button
          onClick={handleSubmit}
          className="p-2 bg-black text-white mt-4 shrink-effect"
        >
          Submit Job!
        </button>
      </div>
    </div>
  );
};

export default JobForm;
