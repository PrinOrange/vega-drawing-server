import zlib from "node:zlib";

export function encode(text: string): string {
	const compressed = zlib.deflateSync(text);
	return compressed.toString("base64");
}

export function decode(base64Str: string): string {
	const buffer = Buffer.from(base64Str, "base64");
	return zlib.inflateSync(buffer).toString();
}
