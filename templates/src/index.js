const express = require('express');
<% if (useMorgan) { %>const morgan = require('morgan');<% } %>
<% if (useEnv) { %>require('dotenv').config();<% } %>

const app = express();
const PORT = process.env.PORT || 3000;

<% if (useMorgan) { %>app.use(morgan('dev'));<% } %>
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
