import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./apollo/schemas";
import { resolvers } from "./apollo/resolvers";
import { prisma } from "./prisma-client";
const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");
const bodyParser = require("body-parser");

async function main(): Promise<void> {
	console.log("Building server...");
	try {
		const app = express();
		app.set("port", process.env.PORT || 80);
		/**
		 * CORS
		 */
		const allowedOrigins = [
			"capacitor://localhost",
			"ionic://localhost",
			"http://localhost",
			"http://localhost:8080",
			"http://localhost:8100",
		];
		// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
		const corsOptions = {
			origin: (origin, callback) => {
				if (allowedOrigins.includes(origin) || !origin) {
					callback(null, true);
				} else {
					callback(new Error("Origin not allowed by CORS"));
				}
			},
		};
		app.options("*", cors(corsOptions));
		app.use(cors());
		app.use(morgan("combined"));
		app.use(bodyParser.urlencoded({ extended: false }));
		/**
		 * Apollo
		 */
		const server = new ApolloServer({
			schema: makeExecutableSchema({
				typeDefs: typeDefs,
				resolvers: resolvers,
			}),
			context: {
				prisma,
			},
		});
		server.applyMiddleware({ app, path: "/" });
		app.listen({ port: app.get("port") }, () => {
			console.log(
				`🚀 Server ready at http://localhost:${app.get("port")}${
					server.graphqlPath
				}`,
			);
		});
	} catch (e) {
		console.error(`Error initializing GraphQL server\n${e}`);
	}
}

main();
