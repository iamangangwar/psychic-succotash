const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const NICE_LIST = require('../utils/niceList.json');
const cors = require('cors');


const port = 1225;

const app = express();
app.use(express.json());
app.use(cors());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = new MerkleTree(NICE_LIST).getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = body.name;
  const proof = body.proof;

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
