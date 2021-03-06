"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_tools_1 = require("graphql-tools");
const schemas_1 = require("./apollo/schemas");
const resolvers_1 = require("./apollo/resolvers");
const prisma_client_1 = require("./prisma-client");
const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");
const bodyParser = require("body-parser");
async function main() {
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
                }
                else {
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
        const server = new apollo_server_express_1.ApolloServer({
            schema: graphql_tools_1.makeExecutableSchema({
                typeDefs: schemas_1.typeDefs,
                resolvers: resolvers_1.resolvers,
            }),
            context: {
                prisma: prisma_client_1.prisma,
            },
        });
        server.applyMiddleware({ app, path: "/" });
        app.listen({ port: app.get("port") }, () => {
            console.log(`🚀 Server ready at http://localhost:${app.get("port")}${server.graphqlPath}`);
        });
    }
    catch (e) {
        console.error(`Error initializing GraphQL server\n${e}`);
    }
}
main();
//# sourceMappingURL=app.js.map