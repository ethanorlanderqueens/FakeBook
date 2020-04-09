"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
const resolverFiles = fs_1.readdirSync(__dirname, { withFileTypes: true });
exports.resolvers = {};
for (const file of resolverFiles) {
    if (file.isFile() &&
        file.name.endsWith(".js") &&
        !file.name.startsWith("index")) {
        /* eslint-disable @typescript-eslint/no-var-requires */
        const req = require(`./${file.name}`);
        if (!("resolvers" in req))
            throw `Schema element ${file.name} missing resolvers export!`;
        mergeResolvers(exports.resolvers, req.resolvers);
    }
}
function mergeResolvers(resolvers, toJoin) {
    if (typeof toJoin !== "object")
        throw `Merging resolvers failed given ${toJoin}`;
    const entries = Object.entries(toJoin);
    for (const [type, dict] of entries) {
        if (resolvers[type] === undefined)
            resolvers[type] = {};
        const funcs = Object.entries(dict);
        for (const [name, f] of funcs) {
            if (resolvers[type][name] !== undefined)
                throw `Duplicate resolver method found: ${type}::${name}`;
            if (typeof f !== "function")
                throw `Resolver ${type}::${name} is not a function!`;
            resolvers[type][name] = f;
        }
    }
    return resolvers;
}
//# sourceMappingURL=index.js.map