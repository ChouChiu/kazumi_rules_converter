"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { decodeKazumi, encodeKazumi } from "@/lib/kazumi";
import { md3Colors } from "@/theme";

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

function SectionCard({
	accent,
	label,
	badge,
	children,
}: {
	accent: string;
	label: string;
	badge?: string;
	children: React.ReactNode;
}) {
	return (
		<Card
			variant="outlined"
			sx={{
				width: "100%",
				bgcolor: md3Colors.surfaceContainerLow,
				borderColor: md3Colors.outlineVariant,
				borderRadius: "12px",
				transition: "border-color 200ms, box-shadow 200ms",
				"&:hover": {
					borderColor: md3Colors.outline,
					boxShadow: `0 0 0 1px ${md3Colors.outlineVariant}`,
				},
			}}
		>
			<Box
				sx={{
					px: 2.5,
					py: 1.5,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
					<Box
						sx={{
							width: 8,
							height: 8,
							borderRadius: "50%",
							bgcolor: accent,
							flexShrink: 0,
						}}
					/>
					<Typography
						variant="caption"
						sx={{
							color: md3Colors.onSurfaceVariant,
							fontSize: "0.6875rem",
							letterSpacing: 1.5,
							textTransform: "uppercase",
							fontWeight: 500,
						}}
					>
						{label}
					</Typography>
				</Box>
				{badge && (
					<Typography
						variant="caption"
						sx={{
							color: md3Colors.onSurfaceVariant,
							fontSize: "0.625rem",
							letterSpacing: 0.5,
							opacity: 0.7,
						}}
					>
						{badge}
					</Typography>
				)}
			</Box>
			<Divider sx={{ borderColor: md3Colors.outlineVariant }} />
			<CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
				{children}
			</CardContent>
		</Card>
	);
}

export default function Home() {
	const [mode, setMode] = useState<Mode>("decode");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");
	const [snackOpen, setSnackOpen] = useState(false);

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
			setSnackOpen(true);
		});
	}

	const isJsonOutput = mode === "decode" && output.startsWith("{");

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				bgcolor: md3Colors.background,
				px: 2,
				py: { xs: 6, sm: 10 },
			}}
		>
			<Container maxWidth="sm">
				<Stack spacing={3} sx={{ alignItems: "center" }}>
					{/* Header */}
					<Box sx={{ textAlign: "center", mb: 1 }}>
						<Typography
							variant="h5"
							sx={{
								fontWeight: 600,
								color: md3Colors.onBackground,
							}}
						>
							Kazumi 规则转换工具
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: md3Colors.onSurfaceVariant,
								mt: 0.5,
							}}
						>
							Base64 ↔ JSON 双向转换
						</Typography>
					</Box>

					{/* Mode Toggle */}
					<ToggleButtonGroup
						value={mode}
						exclusive
						onChange={(_, newMode) => {
							if (newMode) {
								setMode(newMode);
								setInput("");
								setOutput("");
								setError("");
							}
						}}
						sx={{
							bgcolor: md3Colors.surfaceContainer,
							border: 1,
							borderColor: md3Colors.outlineVariant,
							borderRadius: "12px",
							display: "flex",
							width: "100%",
							overflow: "hidden",
							"& .MuiToggleButton-root": {
								flex: 1,
								px: 3,
								py: 1,
								color: md3Colors.onSurfaceVariant,
								border: "none",
								"&.Mui-selected": {
									bgcolor: md3Colors.primaryContainer,
									color: md3Colors.onPrimaryContainer,
									"&:hover": {
										bgcolor: md3Colors.primaryContainer,
										filter: "brightness(1.1)",
									},
								},
								"&:hover": {
									bgcolor: md3Colors.surfaceContainerHigh,
								},
							},
						}}
					>
						<ToggleButton value="decode">kazumi:// → JSON</ToggleButton>
						<ToggleButton value="encode">JSON → 编码</ToggleButton>
					</ToggleButtonGroup>

					{/* Input */}
					<SectionCard accent={md3Colors.primary} label="输入">
						<Box sx={{ p: 2 }}>
							<TextField
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder={placeholder}
								multiline
								rows={5}
								fullWidth
								variant="outlined"
								spellCheck={false}
								sx={{
									"& .MuiOutlinedInput-root": {
										fontSize: "0.875rem",
										fontFamily: "var(--font-roboto-mono), monospace",
										bgcolor: md3Colors.surfaceContainerLowest,
										borderRadius: "12px",
										"& fieldset": {
											borderColor: md3Colors.outline,
										},
										"&:hover fieldset": {
											borderColor: md3Colors.onSurfaceVariant,
										},
										"&.Mui-focused fieldset": {
											borderColor: md3Colors.primary,
											borderWidth: 2,
										},
									},
									"& .MuiInputBase-input": {
										color: md3Colors.onSurface,
									},
									"& .MuiInputBase-input::placeholder": {
										color: md3Colors.onSurfaceVariant,
										opacity: 0.6,
									},
								}}
							/>
						</Box>
					</SectionCard>

					{/* Output */}
					<SectionCard
						accent={md3Colors.tertiary}
						label="输出"
						badge={mode === "decode" ? "JSON" : "kazumi://"}
					>
						<Box
							sx={{
								px: 3,
								py: 2.5,
								minHeight: 120,
								maxHeight: 400,
								overflow: "auto",
							}}
						>
							{error ? (
								<Box
									sx={{
										display: "flex",
										alignItems: "flex-start",
										gap: 1.5,
										bgcolor: md3Colors.errorContainer,
										borderRadius: "8px",
										px: 2,
										py: 1.5,
									}}
								>
									<Typography
										sx={{
											color: md3Colors.onErrorContainer,
											fontSize: "0.8125rem",
											lineHeight: 1.6,
										}}
									>
										{error}
									</Typography>
								</Box>
							) : output ? (
								<Box>
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
										<Typography
											component="pre"
											variant="body2"
											sx={{
												whiteSpace: "pre-wrap",
												wordBreak: "break-all",
												fontFamily: "var(--font-roboto-mono), monospace",
												fontSize: "0.8125rem",
												lineHeight: 1.7,
												color: md3Colors.onSurface,
												m: 0,
											}}
										>
											{output}
										</Typography>
									)}
								</Box>
							) : (
								<Typography
									variant="body2"
									sx={{
										color: md3Colors.onSurfaceVariant,
										fontSize: "0.8125rem",
										opacity: 0.6,
									}}
								>
									转换结果将在此显示
								</Typography>
							)}
						</Box>
					</SectionCard>

					{/* Action Buttons */}
					<Stack direction="row" spacing={1.5}>
						<Button
							variant="contained"
							onClick={handleConvert}
							startIcon={<SwapHorizIcon />}
							sx={{
								px: 4,
								py: 1,
								bgcolor: md3Colors.primary,
								color: md3Colors.onPrimary,
								"&:hover": {
									bgcolor: md3Colors.primary,
									filter: "brightness(1.15)",
								},
							}}
						>
							转换
						</Button>
						<Button
							variant="outlined"
							onClick={handleCopy}
							disabled={!output}
							startIcon={<ContentCopyIcon />}
							sx={{
								px: 4,
								py: 1,
								borderColor: md3Colors.outline,
								color: md3Colors.primary,
								"&:hover": {
									borderColor: md3Colors.primary,
									bgcolor: md3Colors.primaryContainer,
								},
								"&.Mui-disabled": {
									borderColor: md3Colors.outlineVariant,
									color: md3Colors.onSurfaceVariant,
									opacity: 0.4,
								},
							}}
						>
							复制
						</Button>
					</Stack>

					{/* Footer */}
					<Box sx={{ pt: 2 }}>
						<Typography
							variant="caption"
							sx={{
								color: md3Colors.onSurfaceVariant,
								fontSize: 10,
								letterSpacing: 2,
								textTransform: "uppercase",
							}}
						>
							Kazumi Rules Converter
						</Typography>
					</Box>
				</Stack>
			</Container>

			{/* Snackbar for copy feedback */}
			<Snackbar
				open={snackOpen}
				autoHideDuration={2000}
				onClose={() => setSnackOpen(false)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={() => setSnackOpen(false)}
					severity="success"
					variant="filled"
					sx={{
						width: "100%",
						bgcolor: md3Colors.primaryContainer,
						color: md3Colors.onPrimaryContainer,
					}}
				>
					已复制到剪贴板
				</Alert>
			</Snackbar>
		</Box>
	);
}
