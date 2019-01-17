import express from 'express';
import reflectionRoutes from './src/Routes/reflectionsRoutes';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/v1/reflections', reflectionRoutes);

app.get('/', (req, res) => res.status(200).json({
  message: 'YAY! Congratulations on your first endpoint',
}));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
