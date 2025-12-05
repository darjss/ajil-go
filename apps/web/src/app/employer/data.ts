export type HiringStage = "In Review" | "Shortlisted" | "Interview" | "Hired" | "Declined";

export const employerNav = [
	{ label: "Dashboard", href: "/employer/dashboard", icon: "📊" },
	{ label: "Messages", href: "/employer/messages", icon: "💬", badge: 1 },
	{ label: "Company Profile", href: "/employer/company-profile", icon: "🏢" },
	{ label: "All Applicants", href: "/employer/applicants", icon: "🧑‍💼" },
	{ label: "Job Listing", href: "/employer/job-listing", icon: "📄" },
	{ label: "My Schedule", href: "/employer/schedule", icon: "🗓️" },
];

export const employerSettings = [
	{ label: "Settings", href: "/employer/settings", icon: "⚙️" },
	{ label: "Help Center", href: "/employer/help-center", icon: "❓" },
];

export const employerProfile = {
	name: "Maria Kelly",
	email: "mariakelly@email.com",
	company: "Nomad",
};

export const perks = [
	{ title: "Full Healthcare", body: "We believe in thriving communities and that starts with our team being happy and healthy.", icon: "💊" },
	{ title: "Unlimited Vacation", body: "Flexible schedule that makes space for family, wellness, and fun.", icon: "🌊" },
	{ title: "Skill Development", body: "We believe in always learning and leveling up our skills.", icon: "📚" },
];

export const applicants = [
	{ id: "jake", name: "Jake Gyll", role: "Designer", stage: "In Review" as HiringStage, applied: "13 July, 2021", score: 0, statusColor: "bg-amber-100 text-amber-700" },
	{ id: "guy", name: "Guy Hawkins", role: "JavaScript Dev", stage: "In Review" as HiringStage, applied: "13 July, 2021", score: 0, statusColor: "bg-amber-100 text-amber-700" },
	{ id: "cyndy", name: "Cyndy Lillibridge", role: "Golang Dev", stage: "Shortlisted" as HiringStage, applied: "12 July, 2021", score: 4.5, statusColor: "bg-blue-100 text-blue-700" },
	{ id: "rodolfo", name: "Rodolfo Goode", role: "NET Dev", stage: "Declined" as HiringStage, applied: "11 July, 2021", score: 3.75, statusColor: "bg-red-100 text-red-700" },
	{ id: "leif", name: "Leif Floyd", role: "Graphic Design", stage: "Hired" as HiringStage, applied: "11 July, 2021", score: 4.8, statusColor: "bg-emerald-100 text-emerald-700" },
	{ id: "jenny", name: "Jenny Wilson", role: "Designer", stage: "Hired" as HiringStage, applied: "9 July, 2021", score: 4.6, statusColor: "bg-emerald-100 text-emerald-700" },
	{ id: "jerome", name: "Jerome Bell", role: "Product Designer", stage: "Interview" as HiringStage, applied: "5 July, 2021", score: 4.0, statusColor: "bg-indigo-100 text-indigo-700" },
];

export const applicantDetail = {
	name: "Jerome Bell",
	title: "Product Designer",
	score: 4.0,
	appliedJob: {
		role: "Product Development",
		type: "Full-Time",
		category: "Marketing",
		applied: "2 days ago",
		stage: "Interview" as HiringStage,
	},
	contact: {
		email: "jeromeBell45@email.com",
		phone: "+44 1245 572 135",
		instagram: "instagram.com/jeromebell",
		twitter: "twitter.com/jeromebell",
		website: "www.jeromebell.com",
	},
	personalInfo: {
		fullName: "Jerome Bell",
		gender: "Male",
		dob: "March 23, 1995 (26 y.o)",
		language: "English, French, Bahasa",
		address: "4517 Washington Ave. Manchester, Kentucky 39495",
	},
	professionalInfo: {
		about:
			"I'm a product designer currently working remotely. Passionate about designing digital products that have a positive impact on the world.",
		currentJob: "Product Designer",
		experience: "4 Years",
		highestQualification: "Bachelors in Engineering",
		skills: ["Project Management", "Copywriting", "English"],
	},
	interviews: [
		{ date: "10 July, 2021", title: "Written Test", time: "10:00 AM - 11:30 AM", location: "Silver Crysta Room, Nomad", interviewer: "Kathryn Murphy" },
		{ date: "11 July, 2021", title: "Test 2", time: "10:00 AM - 11:00 AM", location: "Silver Crysta Room, Nomad", interviewer: "Jenny Wilson" },
		{ date: "12 July, 2021", title: "Skill Test", time: "10:00 AM - 11:00 AM", location: "Silver Crysta Room, Nomad", interviewer: "Thad Eddings" },
	],
};

export const jobs = [
	{ id: "social-media", title: "Social Media Assistant", status: "Live", datePosted: "20 May 2020", dueDate: "24 May 2020", type: "Full-Time", applicants: 19, needs: "4 / 11" },
	{ id: "senior-designer", title: "Senior Designer", status: "Live", datePosted: "16 May 2020", dueDate: "24 May 2020", type: "Full-Time", applicants: 1234, needs: "0 / 20" },
	{ id: "visual-designer", title: "Visual Designer", status: "Live", datePosted: "15 May 2020", dueDate: "24 May 2020", type: "Freelance", applicants: 2435, needs: "1 / 5" },
	{ id: "data-science", title: "Data Science", status: "Closed", datePosted: "13 May 2020", dueDate: "24 May 2020", type: "Freelance", applicants: 6234, needs: "10 / 10" },
];

export const jobDetails = {
	title: "Social Media Assistant",
	category: "Design",
	type: "Full-Time",
	hired: "4 / 11 Hired",
	description:
		"Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and encourage others to engage on our channels.",
	responsibilities: [
		"Community engagement to ensure that is supported and actively represented online",
		"Focus on social media content development and publication",
		"Marketing and strategy support",
		"Stay on top of trends on social media platforms, and suggest content ideas to the team",
		"Engage with online communities",
	],
	whoYouAre: [
		"You get energy from people and building the ideal work environment",
		"You have a sense for beautiful spaces and office experiences",
		"You are a confident office manager, ready for added responsibilities",
		"You're detail-oriented and creative",
		"You're a growth marketer and know how to run campaigns",
	],
	niceToHaves: ["Fluent in English", "Project management skills", "Copy editing skills"],
	perks: perks,
	about: {
		apply: "July 31, 2021",
		posted: "July 1, 2021",
		type: "Full-Time",
		salary: "$75k-$85k USD",
		required: ["Project Management", "Copywriting", "English", "Social Media Marketing", "Copy Editing"],
	},
};

export const messageThreads = [
	{
		id: "jan",
		name: "Jan Mayer",
		role: "Designer candidate",
		avatar: "🧑‍💻",
		time: "12 мин",
		snippet: "Таны ярилцлагын саналд хариу өгөхөд бэлэн...",
		unread: true,
	},
	{
		id: "joe",
		name: "Joe Bartmann",
		role: "Frontend candidate",
		avatar: "👨‍💼",
		time: "3:40 PM",
		snippet: "Ярилцлагын хуваарь дахин баталгаажуулъя...",
		unread: false,
	},
	{
		id: "ally",
		name: "Ally Wales",
		role: "Product designer",
		avatar: "👩‍💼",
		time: "3:40 PM",
		snippet: "Санал тавих нөхцлийн талаар асуусан байна...",
		unread: false,
	},
];

export const messagesByThread: Record<
	string,
	{ from: "me" | "them"; text: string; time: string }[]
> = {
	jan: [
		{ from: "them", text: "Сайн уу, ярилцлагын товыг баталгаажуулъя гэж хүссэн.", time: "12 минын өмнө" },
		{ from: "me", text: "Сайн уу Jan, маргааш 14:00-д ярилцлага хийх боломжтой.", time: "10 минын өмнө" },
		{ from: "them", text: "Тийм ээ, тохирно. Баярлалаа!", time: "Одоо" },
	],
	joe: [
		{ from: "them", text: "Ярилцлагын линкийг дахин явуулж өгнө үү.", time: "3:40 PM" },
		{ from: "me", text: "Линк илгээлээ, уулзъя.", time: "3:42 PM" },
	],
	ally: [
		{ from: "them", text: "Саналын нөхцөл дээр нэг асуулт байна.", time: "3:40 PM" },
		{ from: "me", text: "Сонсож байна, асуултаа үлдээгээрэй.", time: "3:41 PM" },
	],
};
