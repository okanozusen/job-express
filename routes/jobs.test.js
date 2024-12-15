"use strict";

const db = require("../db");
const Job = require("../models/job");
const { NotFoundError, BadRequestError } = require("../expressError");

beforeAll(async () => {
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");
});

beforeEach(async () => {
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");

  await db.query(`
    INSERT INTO companies (handle, name, num_employees, description, logo_url)
    VALUES ('c1', 'Company 1', 50, 'Description 1', 'http://test1.img'),
           ('c2', 'Company 2', 100, 'Description 2', 'http://test2.img'),
           ('c3', 'Company 3', 150, 'Description 3', 'http://test3.img');
  `);

  await db.query(`
    INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES ('Software Engineer', 100000, '0.05', 'c1'),
           ('Data Scientist', 120000, '0.1', 'c2'),
           ('Web Developer', 90000, NULL, 'c3');
  `);
});

afterEach(async () => {
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");
});

afterAll(async () => {
  await db.end();
});

describe("create", function () {
  test("works", async function () {
    const newJob = {
      title: "New Job",
      salary: 150000,
      equity: "0.05",
      company_handle: "c1",
    };

    const job = await Job.create(newJob);

    expect(job).toEqual({
      id: expect.any(Number),
      title: "New Job",
      salary: 150000,
      equity: "0.05",
      company_handle: "c1",
      date_posted: expect.any(Date),
    });
  });
});

describe("findAll", function () {
  test("works: finds all jobs", async function () {
    const jobs = await Job.findAll();
    expect(jobs.length).toEqual(3);
    expect(jobs[0]).toEqual({
      id: expect.any(Number),
      title: "Software Engineer",
      salary: 100000,
      equity: "0.05",
      company_handle: "c1",
      date_posted: expect.any(Date),
    });
  });
});

describe("get", function () {
  test("works: gets a job by id", async function () {
    const jobs = await Job.findAll();
    const job = await Job.get(jobs[0].id);
    expect(job).toEqual(jobs[0]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.get(9999);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("update", function () {
  test("works: updates a job", async function () {
    const jobs = await Job.findAll();
    const updatedJob = await Job.update(jobs[0].id, {
      title: "Updated Title",
    });

    expect(updatedJob.title).toEqual("Updated Title");
  });
});

describe("remove", function () {
  test("works: removes a job", async function () {
    const jobs = await Job.findAll();
    await Job.remove(jobs[0].id);
    const remainingJobs = await Job.findAll();
    expect(remainingJobs.length).toEqual(2);
  });
});
