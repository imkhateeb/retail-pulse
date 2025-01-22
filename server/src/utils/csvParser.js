const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const parseCSV = async () => {
  const stores = {};
  const filePath = path.join(__dirname, "../../store_master.csv");

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        stores[row.StoreID] = {
          storeName: row.StoreName,
          areaCode: row.AreaCode,
        };
      })
      .on("end", () => resolve(stores))
      .on("error", (err) => reject(err));
  });
};

module.exports = { parseCSV };
