import path from 'path'


const submittedFile = (req, res) => {
    try{
        const {scholarId} = req.params;

        if(!scholarId){
            return res.json({msg:"Missing scholar id"})
        }
        const dirname = import.meta.url.slice(8,48)
        console.log("DIRNAME : "+ dirname);


        // console.log(path.join(dirname, 'uploads', 'submissions', scholarId));

        res.sendFile(path.join(dirname, 'uploads', 'submissions', scholarId) + '.pdf');
        // res.json({msg:"okay"})
    }
    catch(err){
        console.log("@getSubmissionFile\n"+err);
    }
}

export default submittedFile;