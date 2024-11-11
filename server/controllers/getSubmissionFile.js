import { log } from "console";
import path from "path";
import { fileURLToPath } from "url";

const submittedFile = (req, res) => {
  try {
    const { scholarId } = req.params;

    if (!scholarId) {
      return res.json({ msg: "Missing scholar id" });
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const serverDir = __dirname.slice(
      0,
      __dirname.indexOf("server") + "server".length
    );

    console.log(serverDir);

    // console.log(path.join(dirname, 'uploads', 'submissions', scholarId));

    res.sendFile(
      path.join(serverDir, "uploads", "submissions", scholarId) + ".pdf"
    );
    // res.json({msg:"okay"})
  } catch (err) {
    console.log("@getSubmissionFile\n" + err);
  }
};

export default submittedFile;
