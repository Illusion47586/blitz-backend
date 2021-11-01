const {db, transaction} = require('./db')

const update = async (input) => {
    try {
        await db.sync()
        const query = await transaction.findOne({
            where : {
                I_type : input["I_type"],
                I_subtype : input["I_subtype"],
                I_color : input["I_color"],
                O_type : input["O_type"],
                O_subtype : input["O_subtype"],
                O_color : input["O_color"]
            }
        })

        await transaction.update({ freq: query.freq + 1 }, {
            where : {
                I_type : input["I_type"],
                I_subtype : input["I_subtype"],
                I_color : input["I_color"],
                O_type : input["O_type"],
                O_subtype : input["O_subtype"],
                O_color : input["O_color"]
            }
        })
    }
    catch (e){
        console.error(e);
    }
}
