// Manual test for the gRPC client
import { client } from "./grpc-client";

const testProductType = "SingleEspresso";
const testProductStrength = "Strong";

// client.MachineOn({}, (err, response) => {
//   if (err) {
//     console.error("gRPC Error:", err);
//   } else {
//     console.log("gRPC Response:", response.message);
//   }
// });

client.MakeProduct(
  { product_type: testProductType, product_strength: testProductStrength },
  (err, response) => {
    if (err) {
      console.error("gRPC Error:", err);
    } else {
      console.log("gRPC Response:", response.message);
    }
  }
);

// client.MachineOff({}, (err, response) => {
//   if (err) {
//     console.error("gRPC MachineOff Error:", err);
//   } else {
//     console.log("gRPC MachineOff Response:", response.message);
//   }
// });
