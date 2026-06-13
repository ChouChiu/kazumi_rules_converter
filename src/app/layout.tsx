import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
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
			className={`${roboto.variable} ${robotoMono.variable}`}
			suppressHydrationWarning
		>
			<body>
				<ThemeRegistry>{children}</ThemeRegistry>
			</body>
		</html>
	);
}
