import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Kazumi 规则转换工具",
	description: "将 Kazumi 规则的 Base64 编码字符串与 JSON 格式互相转换",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="zh-CN"
			className={`${geistMono.variable} dark h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				{children}
				<Toaster
					richColors
					position="top-center"
					toastOptions={{
						style: {
							background: "oklch(0.13 0 0)",
							border: "1px solid oklch(1 0 0 / 8%)",
							color: "oklch(0.93 0 0)",
							fontFamily: "var(--font-geist-mono)",
						},
					}}
				/>
			</body>
		</html>
	);
}
