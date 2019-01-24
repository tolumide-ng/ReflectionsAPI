/* import ReflectionModel from '../models/Reflection';

const Reflection = {
  create(req, res) {
    const reflectionDetails = req.body;
    if (!reflectionDetails.success || !reflectionDetails.lowPoint || !reflectionDetails.takeAway) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const reflection = ReflectionModel.create(reflectionDetails);
    reflection;
    return res.status(201).json({
      data: [reflection],
    });
  },

  getAll(req, res) {
    const reflections = ReflectionModel.findAll();
    if (reflections.length > 0) {
      return res.status(200).json(reflections);
    }
    return res.status(404).json({
      message: 'There are no reflections at this time',
    });
  },

  getOne(req, res) {
    const reflection = ReflectionModel.findOne(req.params.id);
    if (!reflection) {
      return res.status(404).json({ message: 'reflection not found' });
    }
    return res.status(200).json({
      data: [reflection],
    });
  },

  update(req, res) {
    const reflection = ReflectionModel.findOne(req.params.id);
    if (!reflection) {
      return res.status(404).json({
        message: 'reflection not found',
      });
    }
    const updatedReflection = ReflectionModel.update(req.params.id, req.body);
    return res.status(200).json({
      data: [updatedReflection],
    });
  },

  delete(req, res) {
    const reflection = ReflectionModel.findOne(req.params.id);
    if (!reflection) {
      return res.status(404).json({
        message: 'Reflection not found',
      });
    }
    const ref = ReflectionModel.delete(req.params.id);
    return res.status(204).json({
      data: [ref],
    });
  },
};

export default Reflection;
 */
