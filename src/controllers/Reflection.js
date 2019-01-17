import ReflectionModel from './../models/Reflection';

const Reflection = {
    create(req, res) {
        const reflectionDetails = req.body;
        if(!reflectionDetails.success || !reflectionDetails.lowPoint || !reflectionDetails.takeAway) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        const reflection = ReflectionModel.create(reflectionDetails);
        reflection;
        return res.status(201).json({
            data: [reflection]
        })
    }
}

export default Reflection;