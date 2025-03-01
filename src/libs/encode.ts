import * as pako from "pako";

export function encode(text: string): string {
	const compressed = pako.deflate(text);
	return Buffer.from(compressed).toString("base64url");
}

export function decode(base64Str: string): string {
	const buffer = Buffer.from(base64Str, "base64url");
	return pako.inflate(buffer, { to: "string" });
}
