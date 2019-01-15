import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({
  message: 'YAY! Congratulations on your first endpoint',
}));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
