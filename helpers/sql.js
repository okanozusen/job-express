const { BadRequestError } = require("../expressError");

/**
 * Creates a SQL `SET` clause for a partial update.
 *
 * This function is used when updating rows in a database. It converts 
 * JavaScript-style field names into SQL-style column names using a mapping object. 
 * It also generates query parameter placeholders like `$1, $2, ...`.
 *
 * @param {Object} dataToUpdate - An object where keys are the fields to update and values are their new values.
 * @param {Object} jsToSql - An object mapping JavaScript field names to database column names.
 * 
 * @returns {Object} An object containing:
 *   - `setCols` {String}: The SQL `SET` clause string (e.g., `"first_name"=$1, "age"=$2`).
 *   - `values` {Array}: An array of values matching the placeholders.
 * 
 * @throws {BadRequestError} If no data is provided.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // Extract the keys from the data to update
  const keys = Object.keys(dataToUpdate);

  // If there are no keys, throw an error because we can't update nothing!
  if (keys.length === 0) throw new BadRequestError("No data");

  // Map over the keys to create SQL assignment expressions
  // Example: If key is "firstName", we turn it into `"first_name"=$1`
  const cols = keys.map((colName, idx) => {
    // Use jsToSql mapping if it exists, otherwise use the original key
    const dbColName = jsToSql[colName] || colName;
    return `"${dbColName}"=$${idx + 1}`;
  });

  // Return the constructed SQL parts:
  // - `setCols` is the list of SQL assignments like "first_name"=$1, "age"=$2
  // - `values` are the actual values to use in the query
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
