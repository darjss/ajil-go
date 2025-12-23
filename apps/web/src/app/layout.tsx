import type { Metadata } from "next";
import {
	JetBrains_Mono,
	Playfair_Display,
	Source_Serif_4,
} from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";

const playfair = Playfair_Display({
	variable: "--font-display",
	subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
	variable: "--font-body",
	subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ажил-GO",
	description: "Стартапт дуртай хүмүүст зориулсан ажлын зарын платформ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="mn" suppressHydrationWarning>
			<body
				className={`${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} bg-background font-body text-foreground antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
