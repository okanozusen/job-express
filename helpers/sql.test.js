const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("works: one field", function () {
    const result = sqlForPartialUpdate(
      { firstName: "John" },
      { firstName: "first_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ["John"],
    });
  });

  test("works: multiple fields", function () {
    const result = sqlForPartialUpdate(
      { firstName: "John", age: 30 },
      { firstName: "first_name", age: "age" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["John", 30],
    });
  });

  test("ignores missing jsToSql mappings", function () {
    const result = sqlForPartialUpdate(
      { firstName: "John", age: 30 },
      { firstName: "first_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["John", 30],
    });
  });

  test("throws error if no data provided", function () {
    expect(() => sqlForPartialUpdate({}, {})).toThrowError("No data");
  });
});
