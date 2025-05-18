const { cloudinary } = require('../config/cloudinaryConfig') 

// get all the pics cloudinary has
const getAllPics = async (req, res) => {
    try{
        const { resources } = await cloudinary.search.expression('folder:ProfilePics').sort_by('public_id', 'desc').max_results(30).execute()

        const publicIDs = resources.map(file => file.public_id)
        res.status(200).json(publicIDs)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// fetch a pic from cloudinary
const getSinglePic = async (req, res) => {
    const publicID = req?.body?.publicID
    if (!publicID) return res.status(400).json('Public ID not provided')

    try{
        const { resources } = await cloudinary.search.expression(`public_id:SankalpProfilePics/${publicID}`).execute()
        
        const URLs = resources.map(file => file.url)
        let reqURL = (URLs.length > 0) ? URLs[0] : "No Custom Profile Pic"
        res.status(200).json(reqURL)
    } catch (err) {
        console.log(err)
        res.status(500).json('Unable to fetch image')
    }
}

const updateProfilePic = async (req, res) => {
    const profilePic = req?.body?.data;
    const publicID = req?.body?.publicID;

    if (!profilePic) return res.status(400).json('No profile pic to upload');
    if (!publicID) return res.status(400).json('Public ID not provided');

    try {
        const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
            folder: 'ProfilePics',
            public_id: publicID
        });

        res.status(200).json(uploadedResponse.url);  // ✅ Use the result properly
    } catch (err) {
        console.log(err);
        return res.status(500).json('Could not upload profile picture. Please try again later.');
    }
}

module.exports = {
    getAllPics,
    getSinglePic,
    updateProfilePic
}