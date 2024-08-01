const mongoose = require("mongoose");

const companyInformationSchema = new mongoose.Schema({
  "Lead Type": String,
  "Generic Email 1": String,
  "Vertical": String,
  "Company Name": String,
  "Generic Email 2": String,
  "Lead Assigned To": String,
  "Website": String,
  "Generic Phone 1": String,
  "BDM": String,
  "Address": String,
  "Generic Phone 2": String,
  "Lead Status": String,
  "City": String,
  "Lead Source": String,
  "Priority": String,
  "State": String,
  "Total no. of Offices": String,
  "Next Action": String,
  "Country": String,
  "Turn Over(INR)": String,
  "Lead Usable": String,
  "Employee Count": String,
  "Total no. of Manuf. Units": String,
  "Reason": String,
  "About The Company": String,
  dateField: {
    type: Date,
    default: Date.now,
  },
});

const CompanyInformation = mongoose.model(
  "companyInformation",
  companyInformationSchema
);

module.exports = CompanyInformation;
