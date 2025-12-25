import { type NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

interface TaskFilterRequest {
	filter: string;
	skills?: string[];
	limit?: number;
	category?: string;
	isRemote?: boolean;
}

export async function POST(request: NextRequest) {
	try {
		const body: TaskFilterRequest = await request.json();
		const { filter = "all", skills = [], limit = 3, category, isRemote } = body;

		// Build query parameters for backend API
		const queryParams = new URLSearchParams();
		queryParams.append("limit", String(limit));
		queryParams.append("status", "OPEN"); // Only show open tasks

		// Add category filter if specified
		if (category) {
			queryParams.append("categoryId", category);
		}

		// Add remote filter if specified
		if (isRemote !== undefined) {
			queryParams.append("isRemote", String(isRemote));
		}

		// Add search query based on filter
		if (filter !== "all" && filter !== "latest") {
			queryParams.append("search", filter);
		}

		// Sort by creation date (newest first)
		queryParams.append("sortBy", "createdAt");
		queryParams.append("sortOrder", "desc");

		// Fetch tasks from backend
		const response = await fetch(
			`${API_URL}/api/tasks?${queryParams.toString()}`,
			{
				headers: { "Content-Type": "application/json" },
				cache: "no-store",
			},
		);
		console.log(response);
		console.log("Fetching tasks with params:", queryParams.toString());

		if (!response.ok) {
			throw new Error("Failed to fetch tasks");
		}

		const data = await response.json();

		// Transform tasks to match chatbot format
		const tasks = data.data.map((task: any) => ({
			id: task.id,
			title: task.title,
			description: task.description,
			budgetMin: task.budgetMin,
			budgetMax: task.budgetMax,
			isRemote: task.isRemote,
			city: task.city,
			category: task.category,
			deadline: task.deadline,
			poster: task.poster,
			_count: task._count,
		}));

		return NextResponse.json({
			tasks,
			total: data.total || tasks.length,
		});
	} catch (error) {
		console.error("Tasks API error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch tasks", tasks: [], total: 0 },
			{ status: 500 },
		);
	}
}
