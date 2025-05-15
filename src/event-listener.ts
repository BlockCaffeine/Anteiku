import { ethers } from "ethers";
import 'dotenv/config';
import { client } from "./grpc-client";

const rpc_url = process.env.RPC_URL;
if (!rpc_url) {
  throw new Error("RPC_URL is not defined in .env file");
}

const provider = new ethers.JsonRpcProvider(rpc_url);

// Replace with your contract's ABI and address
const contractAbi = [
  // Example event: event CoffeePurchased(address buyer, string coffeeType, string strength);
  "event CoffeePurchased(address indexed buyer, string coffeeType, string strength)"
];
const contractAddress = "<YOUR_CONTRACT_ADDRESS_HERE>"; // TODO: Replace with actual address

const contract = new ethers.Contract(contractAddress, contractAbi, provider);

contract.on("CoffeePurchased", async (buyer, coffeeType, strength, event) => {
  console.log(`Coffee purchased by ${buyer}: ${coffeeType} (${strength})`);

  // Call gRPC to make the product
  client.MakeProduct(
    { coffee_type: coffeeType, strength: strength },
    (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
      } else {
        console.log("gRPC Response:", response.message);
      }
    }
  );
});

console.log("Listening for CoffeePurchased events...");
