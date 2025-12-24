"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Snowfall from "react-snowfall";

import { getQueryClient } from "@/lib/get-query-client";
import { SocketProvider } from "@/lib/socket";

import { Chatbot } from "./chatbot";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export function SnowfallEffect() {
	return (
		<Snowfall
			// Changes the snowflake color
			color="orange"
			// Controls the number of snowflakes that are created (default 150)
			snowflakeCount={100}
		/>
	);
}

export default function Providers({ children }: { children: React.ReactNode }) {
	// NOTE: Avoid useState when initializing the query client if you don't
	// have a suspense boundary between this and the code that may
	// suspend because React will throw away the client on the initial
	// render if it suspends and there is no boundary
	const queryClient = getQueryClient();

	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<ReactQueryStreamedHydration>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SocketProvider>
							<SnowfallEffect />
							{children}
							<Chatbot />
							<Toaster richColors />
						</SocketProvider>
					</ThemeProvider>
				</ReactQueryStreamedHydration>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</NuqsAdapter>
	);
}
