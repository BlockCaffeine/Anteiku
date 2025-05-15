import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = __dirname + '/../proto/coffee_maker.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

export const client = new proto.jurassip.CoffeeMaker(
  'localhost:50051', // Change to your server address if needed
  grpc.credentials.createInsecure()
);

// client.MakeProduct(
//   { coffee_type: 'EspressoDouble', strength: 'Strong' },
//   (err: any, response: any) => {
//     if (err) {
//       console.error('Error:', err);
//     } else {
//       console.log('Response:', response.message);
//     }
//   }
// );
