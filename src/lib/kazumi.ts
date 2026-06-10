const KAZUMI_PREFIX = "kazumi://";

export interface ConvertResult {
	success: boolean;
	result?: string;
	error?: string;
}

export function decodeKazumi(input: string): ConvertResult {
	const trimmed = input.trim();

	if (!trimmed.startsWith(KAZUMI_PREFIX)) {
		return { success: false, error: "输入必须以 kazumi:// 开头" };
	}

	const base64Str = trimmed.slice(KAZUMI_PREFIX.length);

	if (!base64Str) {
		return { success: false, error: "缺少 Base64 编码内容" };
	}

	try {
		const binaryStr = atob(base64Str);
		const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
		const jsonStr = new TextDecoder("utf-8").decode(bytes);
		const parsed = JSON.parse(jsonStr);
		const formatted = JSON.stringify(parsed, null, 2);
		return { success: true, result: formatted };
	} catch {
		return { success: false, error: "解码失败：无效的 Base64 或 JSON 格式" };
	}
}

export function encodeKazumi(input: string): ConvertResult {
	const trimmed = input.trim();

	if (!trimmed) {
		return { success: false, error: "请输入 JSON 内容" };
	}

	try {
		const parsed = JSON.parse(trimmed);
		const compact = JSON.stringify(parsed);
		const bytes = new TextEncoder().encode(compact);
		const binaryStr = String.fromCharCode(...bytes);
		const base64Str = btoa(binaryStr);
		return { success: true, result: `${KAZUMI_PREFIX}${base64Str}` };
	} catch {
		return { success: false, error: "编码失败：无效的 JSON 格式" };
	}
}
