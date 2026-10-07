import ExcelJS from "exceljs";
import { test } from "@playwright/test";
// const ExcelJS = require("exceljs");

async function WriteExcel(searchText, filePath) {
  const newWorkBook = new ExcelJS.Workbook();
  await newWorkBook.xlsx.readFile(filePath);
  const worksheet = newWorkBook.getWorksheet("Sheet1");

  const outPut = await readExcel(worksheet, searchText);
  const cell = worksheet.getCell(outPut.rowNo, outPut.colNum);
  cell.value = "Iphone";
  await newWorkBook.xlsx.writeFile(filePath);
}
// WriteExcel()

async function readExcel(worksheet, searchText) {
  const outPut = { rowNo: -1, colNum: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        ((outPut.rowNo = rowNumber), (outPut.colNum = colNumber));
        console.log(outPut.rowNo);
        console.log(outPut.colNum);
        // console.log(rowNumber)
        // console.log(colNumber)
      }
    });
  });

  return outPut;
}

test("excel practice", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
   const download =  await downloadPromise;
    await download.saveAs("/Users/stellaagbadu/downloads/download.xlsx");
  WriteExcel("Papaya", "/Users/stellaagbadu/downloads/download.xlsx");
  await page
    .locator("#fileinput")
    .setInputFiles("/Users/stellaagbadu/downloads/download.xlsx");
});
