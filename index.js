const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const client = auth.getClient();

const googleSheets = google.sheets({ version: "v4", auth: client });

const spreadsheetId = "13u74fm-s9t-SQP9uT4ZWwK686HWWmJL_T05YjFuU1nM";

const metaData = googleSheets.spreadsheets.get({
  auth,
  spreadsheetId,
});

app.get("/", async (req, res) => {

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:E",
  });

  let rowCheck = 1;
  const rowAvailable = [];
  if (getRows.data.values[rowCheck] == "1200-1400" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
    rowAvailable[rowCheck - 1] = true;
  } else {
    rowAvailable[rowCheck - 1] = false;
  }

  rowCheck = 2;
  if (getRows.data.values[rowCheck] == "1400-1600" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
    rowAvailable[rowCheck - 1] = true;
  } else {
    rowAvailable[rowCheck - 1] = false;
  }

  rowCheck = 3;
  if (getRows.data.values[rowCheck] == "1600-1800" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
    rowAvailable[rowCheck - 1] = true;
  } else {
    rowAvailable[rowCheck - 1] = false;
  }

  rowCheck = 4;
  if (getRows.data.values[rowCheck] == "1800-2000" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
    rowAvailable[rowCheck - 1] = true;
  } else {
    rowAvailable[rowCheck - 1] = false;
  }

  res.render("index.ejs", {rowAvailable});
});

app.post("/", async (req, res) => {
  const { time, name, date, phoneNumber, content } = req.body;

  // Create client instance for auth
  //const client = await auth.getClient();

  // Instance of Google Sheets API
  //const googleSheets = google.sheets({ version: "v4", auth: client });

  //const spreadsheetId = "13u74fm-s9t-SQP9uT4ZWwK686HWWmJL_T05YjFuU1nM";

  // Get metadata about spreadsheet
  // const metaData = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId,
  // });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:E",
  });

  //Determine available time slot

  // let rowCheck = 1;
  // const rowAvailable = [];
  // if (getRows.data.values[rowCheck] == "1200-1400" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
  //   rowAvailable[rowCheck - 1] = true;
  // } else {
  //   rowAvailable[rowCheck - 1] = false;
  // }

  // rowCheck = 2;
  // if (getRows.data.values[rowCheck] == "1400-1600" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
  //   rowAvailable[rowCheck - 1] = true;
  // } else {
  //   rowAvailable[rowCheck - 1] = false;
  // }

  // rowCheck = 3;
  // if (getRows.data.values[rowCheck] == "1600-1800" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
  //   rowAvailable[rowCheck - 1] = true;
  // } else {
  //   rowAvailable[rowCheck - 1] = false;
  // }

  // rowCheck = 4;
  // if (getRows.data.values[rowCheck] == "1800-2000" && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[1] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[2] == null && JSON.parse(JSON.stringify(getRows.data.values[rowCheck]))[3] == null) {
  //   rowAvailable[rowCheck - 1] = true;
  // } else {
  //   rowAvailable[rowCheck - 1] = false;
  // }

  if(time == "1200-1400"){
    row = 2;
  }
  if(time == "1400-1600"){
    row = 3;
  }
  if(time == "1600-1800"){
    row = 4;
  }
  if(time == "1800-2000"){
    row = 5;
  }

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: "Sheet1!B" + row + ":E" + row,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name, date, phoneNumber, content]],
    },
  });
  res.send("Success!");
});


app.listen(1337, (req, res) => console.log("running on 1337"));

//nodemon index.js