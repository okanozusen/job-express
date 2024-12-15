"use strict";

const db = require("../db");
const Job = require("./job");
const { NotFoundError, BadRequestError } = require("../expressError");

// Clear database before all tests
beforeAll(async () => {
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");
});

// Reset database before each test
beforeEach(async () => {
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");

  // Insert test companies
  beforeEach(async () => {
    await db.query(`
      INSERT INTO jobs (title, salary, equity, company_handle)
      VALUES ('Software Engineer', 100000, '0.05', 'c1');
    `);
  });
  

  // Insert test jobs
  await db.query(`
    INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES 
      ('Software Engineer', 100000, '0.05', 'c1'),
      ('Data Scientist', 120000, '0.1', 'c2'),
      ('Web Developer', 90000, NULL, 'c3');
  `);
});

// Clean up after each test
afterEach(async () => {
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");
});

// Close database after all tests
afterAll(async () => {
  await db.end();
});

// Test the create method
describe("create", function () {
  test("works", async function () {
    const job = await Job.create({
      title: "Backend Developer",
      salary: 80000,
      equity: "0.02",
      company_handle: "c1",
    });

    expect(job).toEqual({
      id: expect.any(Number),
      title: "Backend Developer",
      salary: 80000,
      equity: "0.02",
      company_handle: "c1",
      date_posted: expect.any(Date),
    });
  });
});

// Test findAll method
describe("findAll", function () {
  test("works: no filters", async function () {
    const jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "Software Engineer",
        salary: 100000,
        equity: "0.05",
        company_handle: "c1",
        date_posted: expect.any(Date),
      },
      {
        id: expect.any(Number),
        title: "Data Scientist",
        salary: 120000,
        equity: "0.1",
        company_handle: "c2",
        date_posted: expect.any(Date),
      },
      {
        id: expect.any(Number),
        title: "Web Developer",
        salary: 90000,
        equity: null,
        company_handle: "c3",
        date_posted: expect.any(Date),
      },
    ]);
  });
});

// Test get method
describe("get", function () {
  test("works", async function () {
    const job = await Job.get(1);
    expect(job).toEqual({
      id: 1,
      title: "Software Engineer",
      salary: 100000,
      equity: "0.05",
      company_handle: "c1",
      date_posted: expect.any(Date),
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.get(9999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// Test update method
describe("update", function () {
  const updateData = {
    title: "Updated Job Title",
    salary: 150000,
    equity: "0.15",
  };

  test("works", async function () {
    const job = await Job.update(1, updateData);
    expect(job).toEqual({
      id: 1,
      company_handle: "c1",
      date_posted: expect.any(Date),
      ...updateData,
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(9999, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// Test remove method
describe("remove", function () {
  test("works", async function () {
    await Job.remove(1);
    const result = await db.query("SELECT * FROM jobs WHERE id=$1", [1]);
    expect(result.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await Job.remove(9999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
