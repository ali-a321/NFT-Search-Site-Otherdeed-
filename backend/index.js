const express = require("express");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils")
const app = express();
const cors = require("cors");
const port = 3030;
require('dotenv').config()

app.use(cors());
app.use(express.json());

app.get("/otherdeeds", async(req,res) => {
  try {
    const {query} = req;
    let NFTS;
    const chain = EvmChain.ETHEREUM;
    const address = '0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258';
    const totalRanges = 1000;
    const range = 1;
    const limit = 20;
    if (query.cursor) {
        NFTS = await Moralis.EvmApi.nft.getContractNFTs({
          address: address,
          chain: chain,
          cursor: query.cursor,
          range: range,
          totalRanges: totalRanges,
          limit: limit,
        });
      } else {
        NFTS = await Moralis.EvmApi.nft.getContractNFTs({
          address: address,
          chain: chain,
          limit: limit,
        });
      }
  
      const result = NFTS.raw;
      return res.status(200).json({ result });
      
    } catch (e) {
  
      console.log(e);
      console.log("something went wrong");
      return res.status(400).json();
  
    }
  });

  Moralis.start({
    apiKey: process.env.MORALIS_APIKEY,
  }).then(() => {
    app.listen(port, () => {
      console.log(`Listening for API Calls`);
    });
  });