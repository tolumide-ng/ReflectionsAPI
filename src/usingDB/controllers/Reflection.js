import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/index'; // problem might be from here as this ref. doesnt specify the index.js in dd

const Reflection = {
  async create(req, res) {
    // Ensure there is a validation function before this. This ensures that all fields are filled and that the data type submitted is the required/
    const text = `INSERT INTO 
            reflections(id, success, low_point, take_away, created_date, modified_date)
            VALUES($1, $2, $3, $4, $5, $6)
            returning *`;
    const values = [
      uuidv4(),
      req.body.success,
      req.body.low_point,
      req.body.take_away,
      moment(new Date()),
      moment(new Date()),
    ];
    try {
      console.log('data sent to db');
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        data: rows[0],
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  },

  /* Get all reflection */

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM reflections';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).json({
        data: rows,
        counting: rowCount,
      });
    } catch (err) {
      return res.status(404).json({
        error: err,
      });
    }
  },

  // Get a reflection
  async getOne(req, res) {
    const text = 'SELECT * FROM reflections WHERE id=$1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          message: 'reflection not found',
        });
      }
      return res.status(200).json({
        data: rows[0],
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  },

  // Update a reflection
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
    const updateOneQuery = `UPDATE reflections
            SET success=$1,low_point=$2,take_away=$3,modified_date=$4
            WHERE id=$5 returning *`;

    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          message: 'reflection not found',
        });
      }
      const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json({
        data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  },

  // Delete a reflection
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          message: 'reflection not found',
        });
      }
      return res.status(200).json({
        message: 'deleted',
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  },

  /* async deleteAllRoutes(req, res) {
    const deleteAllQuery = 'DELETE FROM reflections returning *';
    try {
      const { rows } = await db.query(deleteAllQuery);
      return res.status(200).json({
        data: 'All rows deleted'
      })
    } catch (err) {
      return res.status(400).json({
        error: err,
      })
    }
  }, */
};

export default Reflection;
