const {db, transaction} = require('./db')

const create = async (input) => {
    try {
        await db.sync({alter:true})

        await transaction.create({
            I_type : input["I_type"],
            I_subtype : input["I_subtype"],
            I_color : input["I_color"],
            O_type : input["O_type"],
            O_subtype : input["O_subtype"],
            O_color : input["O_color"],
            freq : 1
        })
    }catch (e){
        console.error(e)
    }
}
