import { Injectable } from "@angular/core";
import * as Papa from "papaparse";

@Injectable({
  providedIn: "root",
})
export class CsvService {
  constructor() {}

  /**
   * Exports nested form data to CSV format
   * @param data The form data object with nested properties
   * @returns CSV string
   */
  exportToCsv(data: { [key: string]: any }): string {
    // Flatten the nested object to prepare for CSV
    const flattenedData = this.flattenObject(data);

    // Convert to CSV using PapaParse
    const csv = Papa.unparse([flattenedData]);
    return csv;
  }

  /**
   * Triggers a download of the CSV file
   * @param csv CSV string
   * @param filename Name for the downloaded file
   */
  downloadCsv(csv: string, filename: string = "form-data.csv"): void {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Imports CSV data and converts it back to the nested form structure
   * @param file The CSV file to import
   * @returns Promise with the form data object
   */
  importFromCsv(file: File): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            // Convert the first row from flat to nested structure
            const nestedData = this.unflattenObject(results.data[0]);
            resolve(nestedData);
          } else {
            reject("No data found in CSV file");
          }
        },
        error: (error) => {
          reject(error.message);
        },
      });
    });
  }

  /**
   * Flattens a nested object structure to single level with dot notation
   * @param obj The nested object to flatten
   * @param prefix Prefix for nested keys
   * @returns Flattened object with dot notation keys
   */
  private flattenObject(obj: any, prefix: string = ""): { [key: string]: any } {
    const result: { [key: string]: any } = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        // Handle arrays and objects differently
        if (typeof obj[key] === "object" && obj[key] !== null) {
          // Skip month entries in step 7 and handle them separately
          if (key === "7" && obj[key] && typeof obj[key] === "object") {
            // Special handling for leave data
            const leaveData = obj[key];

            // Handle regular fields directly
            for (const leaveKey in leaveData) {
              if (!isNaN(Number(leaveKey))) {
                // For month entries (0-12)
                const monthData = leaveData[leaveKey];
                if (monthData && typeof monthData === "object") {
                  result[`${newKey}.${leaveKey}.month`] = monthData.month;
                  result[`${newKey}.${leaveKey}.daysAccrued`] =
                    monthData.daysAccrued;
                  result[`${newKey}.${leaveKey}.daysTaken`] =
                    monthData.daysTaken;
                  result[`${newKey}.${leaveKey}.balance`] = monthData.balance;
                }
              } else {
                // For regular fields like soldeConge, acquisType, etc.
                result[`${newKey}.${leaveKey}`] = leaveData[leaveKey];
              }
            }
          } else {
            // Recursively flatten nested objects
            const flatObject = this.flattenObject(obj[key], newKey);
            Object.assign(result, flatObject);
          }
        } else {
          // Add simple values directly
          result[newKey] = obj[key];
        }
      }
    }

    return result;
  }

  /**
   * Converts a flattened object with dot notation back to nested structure
   * @param flatObj The flattened object with dot notation keys
   * @returns Nested object structure
   */
  private unflattenObject(flatObj: { [key: string]: any }): {
    [key: string]: any;
  } {
    const result: { [key: string]: any } = {};

    for (const key in flatObj) {
      if (flatObj.hasOwnProperty(key)) {
        const value = flatObj[key];
        const keyParts = key.split(".");

        let current = result;

        // Navigate to the right nesting level
        for (let i = 0; i < keyParts.length - 1; i++) {
          const part = keyParts[i];
          if (!current[part]) {
            // Check if next key is numeric to create array-like object
            const isNextPartNumeric = !isNaN(Number(keyParts[i + 1]));
            current[part] = isNextPartNumeric ? {} : {};
          }
          current = current[part];
        }

        // Set the actual value at the final level
        const lastKey = keyParts[keyParts.length - 1];
        current[lastKey] = this.convertValue(value);
      }
    }

    return result;
  }

  /**
   * Converts string values to appropriate types (number, boolean, etc.)
   * @param value The value to convert
   * @returns Converted value
   */
  private convertValue(value: string): any {
    if (value === "") return "";
    if (value === "true") return true;
    if (value === "false") return false;
    if (!isNaN(Number(value)) && value.trim() !== "") return Number(value);
    return value;
  }
}
