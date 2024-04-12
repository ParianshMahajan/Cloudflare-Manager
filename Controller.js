const axios=require('axios');

let url=process.env.dns_url.replace('<zone-id>',process.env.zone_id);
let headers = {
    'Authorization': `Bearer ${process.env.api_token}`,
    'Content-Type': 'application/json'
}



module.exports.displayRecords = async(req, res) => {
    try {
        let response=await axios.get(url,{headers:headers})
        let records =response.data.result;
        let selectedRecordIds = [];
        return res.render('home',{records,selectedRecordIds});
    
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports.deleteRecords = async(req, res) => {
    try {

        let data=req.body;
        
        for(let i in data.selectedRecordIds){
            let recordId=data.selectedRecordIds[i];
            let deleteUrl=url+`/${recordId}`;
            let response=await axios.delete(deleteUrl,{headers:headers});
            if (response.status === 200) {
                console.log(`Deleted record with ID: ${recordId}`);
            } else {
                console.log(`Failed to delete record with ID ${recordId}: ${response.statusText}`);
            }
        }


        res.json({
            message:"Deleted Succesfully",
            status:true
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}