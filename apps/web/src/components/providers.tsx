"use client";

import {
	isServer,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import Snowfall from "react-snowfall";
import { Chatbot } from "./chatbot";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60, // 1 minute
				refetchOnWindowFocus: false,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render.
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

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
		<QueryClientProvider client={queryClient}>
			<ReactQueryStreamedHydration>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SnowfallEffect />
					{children}
					<Chatbot />
					<Toaster richColors />
				</ThemeProvider>
			</ReactQueryStreamedHydration>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
