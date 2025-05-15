// Manual test for the gRPC client
import { client } from "./grpc-client";

const testCoffeeType = "EspressoSingle";
const testStrength = "Strong";

client.MakeProduct(
  { coffee_type: testCoffeeType, strength: testStrength },
  (err, response) => {
    if (err) {
      console.error("gRPC Error:", err);
    } else {
      console.log("gRPC Response:", response.message);
    }
    process.exit(0);
  }
);
