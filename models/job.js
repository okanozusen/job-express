"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */
class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle, date_posted }
   **/
  static async create({ title, salary, equity, company_handle }) {
    const result = await db.query(
      `INSERT INTO jobs (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle, date_posted`,
      [title, salary, equity, company_handle]
    );
    const job = result.rows[0];
    return job;
  }

  /** Find all jobs (no filters yet).
   *
   * Returns [{ id, title, salary, equity, company_handle, date_posted }, ...]
   **/
  static async findAll() {
    const jobsRes = await db.query(
      `SELECT id, title, salary, equity, company_handle, date_posted
       FROM jobs
       ORDER BY date_posted DESC`
    );
    return jobsRes.rows;
  }

  /** Get job by id.
   *
   * Returns { id, title, salary, equity, company_handle, date_posted }
   *
   * Throws NotFoundError if not found.
   **/
  static async get(id) {
    const jobRes = await db.query(
      `SELECT id, title, salary, equity, company_handle, date_posted
       FROM jobs
       WHERE id = $1`,
      [id]
    );

    const job = jobRes.rows[0];
    if (!job) throw new NotFoundError(`No job with ID: ${id}`);
    return job;
  }

  /** Update job data with `data`.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, company_handle, date_posted }
   *
   * Throws NotFoundError if not found.
   **/
  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      title: "title",
      salary: "salary",
      equity: "equity",
    });

    const idVarIdx = `$${values.length + 1}`;

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, title, salary, equity, company_handle, date_posted`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job with ID: ${id}`);
    return job;
  }

  /** Delete job by id. Returns undefined.
   *
   * Throws NotFoundError if not found.
   **/
  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const job = result.rows[0];
    if (!job) throw new NotFoundError(`No job with ID: ${id}`);
  }

  static async applyForJob(username, jobId) {
    // Ensure the job exists
    const jobCheck = await db.query(
      `SELECT id FROM jobs WHERE id = $1`,
      [jobId]
    );
    if (!jobCheck.rows[0]) throw new NotFoundError(`Job ID ${jobId} not found`);
  
    // Ensure the user exists
    const userCheck = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );
    if (!userCheck.rows[0]) throw new NotFoundError(`User ${username} not found`);
  
    // Insert application
    await db.query(
      `INSERT INTO applications (username, job_id) 
       VALUES ($1, $2) 
       ON CONFLICT (username, job_id) DO NOTHING`,
      [username, jobId]
    );
    return jobId;
  }
}



module.exports = Job;
