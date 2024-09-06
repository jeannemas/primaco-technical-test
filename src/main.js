import { HOST, PORT } from './constants.js';
import { server } from './server.js';

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
