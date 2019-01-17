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
    },

    getAll(req, res) {
        const reflections = ReflectionModel.findAll();
        if(reflections.length > 0) {
            return res.status(200).json(reflections);
        } 
        return res.status(404).json({
            message: 'There are no reflections at this time'
        })
    },

    getOne(req, res) {
        const reflection = ReflectionModel.findOne(req.params.id);
        if(!reflection ) {
            return res.status(404).send({'message': 'reflection not found'});
        }
        return res.status(200).send(reflection);
    }
}

export default Reflection;