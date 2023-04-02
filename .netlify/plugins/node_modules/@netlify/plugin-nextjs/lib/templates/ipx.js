"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const ipx_1 = require("@netlify/ipx");
// @ts-ignore Injected at build time
const imageconfig_json_1 = require("./imageconfig.json");
exports.handler = (0, ipx_1.createIPXHandler)({
    basePath: imageconfig_json_1.basePath,
    domains: imageconfig_json_1.domains,
    remotePatterns: imageconfig_json_1.remotePatterns,
    responseHeaders: imageconfig_json_1.responseHeaders,
});
/* eslint-enable import/no-unresolved, @typescript-eslint/ban-ts-comment  */
