import { ethers } from 'ethers';
import { client } from './grpc-client';
import contractAbi from '../resources/contract-abi.json' with { type: 'json' };

const blockchain_rpc_url = process.env.BLOCKCHAIN_RPC_URL;
if (!blockchain_rpc_url) {
  throw new Error('RPC_URL environment variable is not set');
}

const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) {
  throw new Error('CONTRACT_ADDRESS environment variable is not set');
}

const provider = new ethers.JsonRpcProvider(blockchain_rpc_url);
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

contract.on('ProductPurchased', async (productType, productStrength) => {
  console.log(`${productType} (${productStrength}) purchased!`);
  console.log('Calling gRPC to make the product...');

  // Call gRPC to make the product
  client.MakeProduct(
    { product_type: productType, product_strength: productStrength }, 
    (err, response) => {
    if (err) {
      console.error('gRPC Error:', err);
    } else {
      console.log('gRPC Response:', response.message);
    }
  });
});

console.log('Listening for CoffeePurchased events...');
