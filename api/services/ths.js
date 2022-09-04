const bdd = require('../config/knex');
const TABLE_NAME = "THS";

const getData = async (offset, limit) => { 
    if(limit > 0) {
        return await bdd.KNEX(TABLE_NAME)
            .select('temp')
            .select('date')
            .select('temp')
            .select('humidity')
            .limit(limit)
            .offset(offset)
	    .orderBy('id');        
    } else {
        return await bdd.KNEX(TABLE_NAME)
            .select('temp')
            .select('date')
            .select('temp')
            .select('humidity')            
            .offset(offset)
	    .orderBy('id')
    }
}

const addData = async (temp, humidity) => {    
    return await bdd.KNEX(TABLE_NAME)
    .insert({temp, humidity});
}

module.exports.getData = getData;
module.exports.addData = addData;   
