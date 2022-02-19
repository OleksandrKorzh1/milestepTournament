const { Pool } = require('pg');
const { env } = require('../config');
const Constants = require("../utils/constants");

module.exports = (config) => {
    const client = new Pool(config);

    return {
        getAllUsers: async () => {
            try {
                const data = await client.query('SELECT * FROM users');
                return data.rows;
            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        },
        getUserByID: async (id) => {
            try {
                const res = await client.query(
                    'SELECT username,email  From users WHERE id=$1 ',
                    [id]);
                if (!res.rows[0]) {
                    throw  new Error('ERROR: No user find');
                }
                return res.rows[0];
            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        },

        createUser: async ({username,email,password}) => {
            try {
                const res = await client.query(
                    `INSERT INTO users(username,email,password)
           VALUES ($1,$2,$3)
           RETURNING *`, [username,email,password]);
                if (env === Constants.env.dev) {
                    console.log('New user created');
                }

            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        },

        updateUser: async ({id, ...users}) => {
            try {
                const res = await client.query(
                    `UPDATE users SET username=$1 WHERE id=$4 RETURNING *`,
                    [users.username, id]);

                if (!res.rows.length) {
                    throw new Error('ERROR: User not found');
                }
                if (env === Constants.env.dev) {
                    console.log(`DEBUG:  User updated: ${JSON.stringify(res.rows[0])}`);
                }
                return res.rows[0];
            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        },

        deleteUser:async (id)=>{
            try{
                const res=await client.query('Delete from users where id=$1',[id])
            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        }
    };

}
