const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.listen(3000, () => {
    console.log('Server running on port 3000');
}
);