"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";
import { decodeKazumi, encodeKazumi } from "@/lib/kazumi";

type Mode = "decode" | "encode";

const highlightStyle = {
	...vscDarkPlus,
	'pre[class*="language-"]': {
		...vscDarkPlus['pre[class*="language-"]'],
		background: "transparent",
		margin: 0,
		padding: 0,
		fontSize: "0.8125rem",
		lineHeight: "1.7",
	},
	'code[class*="language-"]': {
		...vscDarkPlus['code[class*="language-"]'],
		background: "transparent",
		fontSize: "0.8125rem",
		lineHeight: "1.7",
	},
};

export default function Home() {
	const [mode, setMode] = useState<Mode>("decode");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");

	const placeholder =
		mode === "decode"
			? "kazumi://eyJhcGkiOiI3IiwidHlwZSI6..."
			: '{"api": "6", "type": "anime", "name": "..."}';

	function handleConvert() {
		setError("");
		setOutput("");

		if (!input.trim()) {
			setError(
				mode === "decode" ? "请输入 kazumi:// 字符串" : "请输入 JSON 内容",
			);
			return;
		}

		const result =
			mode === "decode" ? decodeKazumi(input) : encodeKazumi(input);

		if (result.success && result.result) {
			setOutput(result.result);
		} else if (result.error) {
			setError(result.error);
		}
	}

	function handleCopy() {
		if (!output) return;
		navigator.clipboard.writeText(output).then(() => {
			toast.success("已复制到剪贴板");
		});
	}

	const isJsonOutput = mode === "decode" && output.startsWith("{");

	return (
		<div className="flex flex-col items-center min-h-screen noise-bg px-4 py-16 sm:py-24">
			<div className="w-full max-w-2xl flex flex-col gap-8">
				{/* Header */}
				<header className="text-center space-y-2">
					<h1 className="text-lg font-semibold tracking-widest uppercase text-zinc-100">
						Kazumi 规则转换工具
					</h1>
					<p className="text-xs text-zinc-500 tracking-wide">
						Base64 ↔ JSON 双向转换
					</p>
				</header>

				{/* Mode Toggle */}
				<div className="flex gap-1 p-1 rounded-lg bg-zinc-900/60 border border-white/[0.06] mx-auto">
					<button
						type="button"
						onClick={() => {
							setMode("decode");
							setInput("");
							setOutput("");
							setError("");
						}}
						className={`px-4 py-1.5 rounded-md text-xs tracking-wide transition-all duration-150 ${
							mode === "decode"
								? "btn-primary"
								: "text-zinc-500 hover:text-zinc-300"
						}`}
					>
						kazumi:// → JSON
					</button>
					<button
						type="button"
						onClick={() => {
							setMode("encode");
							setInput("");
							setOutput("");
							setError("");
						}}
						className={`px-4 py-1.5 rounded-md text-xs tracking-wide transition-all duration-150 ${
							mode === "encode"
								? "btn-primary"
								: "text-zinc-500 hover:text-zinc-300"
						}`}
					>
						JSON → 编码
					</button>
				</div>

				{/* Input Panel */}
				<div className="panel glow-border">
					<div className="panel-header flex items-center gap-2">
						<span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-600" />
						<span className="text-[11px] text-zinc-500 uppercase tracking-widest">
							输入
						</span>
					</div>
					<div className="p-3">
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder={placeholder}
							rows={5}
							spellCheck={false}
							className="w-full bg-transparent text-sm text-zinc-300 placeholder:text-zinc-700 resize-none focus:outline-none font-mono leading-relaxed"
						/>
					</div>
				</div>

				{/* Output Panel */}
				<div className="panel glow-border">
					<div className="panel-header flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-600" />
							<span className="text-[11px] text-zinc-500 uppercase tracking-widest">
								输出
							</span>
						</div>
						{output && (
							<span className="text-[10px] text-zinc-600 tracking-wide">
								{mode === "decode" ? "JSON" : "BASE64"}
							</span>
						)}
					</div>
					<div className="p-4 min-h-[120px] max-h-[400px] overflow-auto">
						{error ? (
							<div className="fade-in flex items-start gap-2">
								<span className="text-red-400 text-xs mt-0.5">×</span>
								<p className="text-xs text-red-400/80">{error}</p>
							</div>
						) : output ? (
							<div className="fade-in">
								{isJsonOutput ? (
									<SyntaxHighlighter
										language="json"
										style={highlightStyle}
										customStyle={{
											background: "transparent",
											margin: 0,
											padding: 0,
										}}
										wrapLongLines
									>
										{output}
									</SyntaxHighlighter>
								) : (
									<pre className="text-xs text-zinc-300 whitespace-pre-wrap break-all font-mono leading-relaxed">
										{output}
									</pre>
								)}
							</div>
						) : (
							<p className="text-xs text-zinc-700 tracking-wide">
								转换结果将在此显示
							</p>
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-2 justify-center">
					<button
						type="button"
						onClick={handleConvert}
						className="btn-primary px-8 py-2 rounded-md text-xs tracking-widest uppercase"
					>
						转换
					</button>
					<button
						type="button"
						onClick={handleCopy}
						disabled={!output}
						className={`btn-ghost px-8 py-2 rounded-md text-xs tracking-widest uppercase ${
							output ? "btn-ghost-hover" : "opacity-30 cursor-not-allowed"
						}`}
					>
						复制
					</button>
				</div>

				{/* Footer */}
				<footer className="text-center pt-4">
					<p className="text-[10px] text-zinc-700 tracking-widest uppercase">
						Kazumi Rules Converter
					</p>
				</footer>
			</div>
		</div>
	);
}
