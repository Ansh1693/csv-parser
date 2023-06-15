const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const User = require("../models/User");

const check = (doc)=>{
    if(!doc.age) return false;
    if(!doc.email) return false;
    if(!doc.firstName) return false;
    if(!doc.lastName) return false;
    if(!doc.gender) return false;

    return true;
}

exports.upload = async (req, res) => {
    // console.log(req.file);
    
    const notInserted =[];
    const records = [];
    const totalRecords = [];

    try {
        // console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
        fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', async (row) => {
            if(!check(row)) notInserted.push(row);
            else{
                // const check = await User.findOne({email: row.email});
                // if(check){
                //     notInserted.push(row)
                // }else{
                //     const user = new User(row);
                //     await user.save();
                // }
                records.push(row);
                const arr = {
                    updateOne:{
                        filter:{email:row.email},
                        update:{$setOnInsert:row},
                        upsert:true
                    }
                }
                totalRecords.push(arr);
            }

        })
        .on('end',  async rowCount => {
            try {
                const users = await User.bulkWrite(totalRecords);

                const ids = users.upsertedIds;
                // console.log(upsertedCount);


                records.map((doc, index) => {
                    if(!ids[index]){
                        notInserted.push(doc);
                    }
                })

                res.json({message:"success",notInserted:notInserted});
            } catch (error) {
                res.status(400).json({message: "failure" , error: error});
            }
            // res.json({message:"success",notInserted:notInserted});
      
    });
        
    } catch (err) {
        res.status(400).json({message: "failure" , error: err});
    }
}