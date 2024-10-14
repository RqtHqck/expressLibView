const Application = require('./framework/Application')
const userRouter = require('./src/user-routes')
const parseJson = require('./middleware/parseJson');
const bodyParser = require('./middleware/bodyParser');
const parseUrl = require('./middleware/parseUrl')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = new Application();
app.use(bodyParser)
app.use(parseJson)
app.use(parseUrl(`http://localhost:${PORT}`))
app.addRouter(userRouter)

app.listen(PORT, () => console.log(`Server start on PORT: http://127.0.0.1:${PORT}`));