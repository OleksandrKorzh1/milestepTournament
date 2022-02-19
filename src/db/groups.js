const { Pool } = require('pg');
const { env } = require('../config');
const Constants = require("../utils/constants");
module.exports = (config) => {
    const client = new Pool(config);

    return {
        getAllGroups: async () => {
            try {
                const data = await client.query('SELECT * FROM groups');
                return data.rows;
            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        },

        createGroup: async ({name,topic}) => {
            try {
                const res = await client.query(
                    `INSERT INTO groups(name,topic)
           VALUES ($1,$2)
           RETURNING *`, [name,topic]);
                if (env === Constants.env.dev) {
                    console.log('New group created');
                }

            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        },


        deleteGroup:async (id)=>{
            try{
                await client.query('Delete from groups where id=$1',[id])
            } catch (err) {
                if (env === Constants.env.dev) {
                    console.error(err.message || err);
                }
                throw err;
            }
        }
    };

}
