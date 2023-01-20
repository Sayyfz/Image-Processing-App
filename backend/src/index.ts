import express from 'express';
import apiRoutes from './routes/api';
import cors from 'cors';

//Globals
const app = express();
const port = 5000;

//Middlewares
app.use(cors());
app.use('/api', apiRoutes);

//

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

export default app;
