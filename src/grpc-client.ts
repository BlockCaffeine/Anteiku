import 'dotenv/config';
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

const host = process.env.GRPC_SERVER_HOST || '127.0.0.1';
const port = process.env.GRPC_SERVER_PORT || '50051';
const address = `${host}:${port}`;

export const client = new proto.jurassip.CoffeeMaker(
  address,
  grpc.credentials.createInsecure()
);
