import { readdirSync } from "fs";
import { gql } from "apollo-server-express";

/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
const schemaFiles = readdirSync(__dirname, { withFileTypes: true });

export const typeDefs = [
	gql`
		type Query
		type Mutation
	`,
];

for (const file of schemaFiles) {
	if (
		file.isFile() &&
		file.name.endsWith(".js") &&
		!file.name.startsWith("index")
	) {
		/* eslint-disable @typescript-eslint/no-var-requires */
		const req = require(`./${file.name}`);
		if (!("typeDef" in req))
			throw `Schema element ${file.name} missing typeDef export!`;

		typeDefs.push(req.typeDef);
	}
}