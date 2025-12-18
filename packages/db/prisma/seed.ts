import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import pg from "pg";
import { PrismaClient } from "../prisma/generated/client.js";

dotenv.config({
	path: "../../apps/server/.env",
});

// Helper to safely get from map (avoids non-null assertions)
function getOrThrow<K, V>(map: Map<K, V>, key: K): V {
	const value = map.get(key);
	if (value === undefined) {
		throw new Error(`Missing required key: ${String(key)}`);
	}
	return value;
}

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("🌱 Starting seed...\n");

	// ============================================
	// CATEGORIES
	// ============================================
	console.log("📁 Creating categories...");
	const categories = await Promise.all([
		prisma.category.upsert({
			where: { name: "Home Services" },
			update: {},
			create: {
				name: "Home Services",
				description: "Cleaning, repairs, gardening, and home maintenance",
				iconUrl: "/icons/home.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Moving & Delivery" },
			update: {},
			create: {
				name: "Moving & Delivery",
				description: "Help with moving, furniture assembly, and deliveries",
				iconUrl: "/icons/truck.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Tech Support" },
			update: {},
			create: {
				name: "Tech Support",
				description: "Computer setup, troubleshooting, and tech assistance",
				iconUrl: "/icons/computer.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Personal Assistant" },
			update: {},
			create: {
				name: "Personal Assistant",
				description: "Errands, shopping, waiting in line, and admin tasks",
				iconUrl: "/icons/clipboard.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Events & Photography" },
			update: {},
			create: {
				name: "Events & Photography",
				description: "Event help, photography, videography, and entertainment",
				iconUrl: "/icons/camera.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Tutoring & Lessons" },
			update: {},
			create: {
				name: "Tutoring & Lessons",
				description: "Academic tutoring, music lessons, and skill coaching",
				iconUrl: "/icons/book.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Pet Care" },
			update: {},
			create: {
				name: "Pet Care",
				description: "Dog walking, pet sitting, and grooming",
				iconUrl: "/icons/paw.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Health & Wellness" },
			update: {},
			create: {
				name: "Health & Wellness",
				description: "Personal training, massage, and wellness services",
				iconUrl: "/icons/heart.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Creative & Design" },
			update: {},
			create: {
				name: "Creative & Design",
				description:
					"Graphic design, writing, video editing, and creative work",
				iconUrl: "/icons/palette.svg",
			},
		}),
		prisma.category.upsert({
			where: { name: "Other" },
			update: {},
			create: {
				name: "Other",
				description: "Miscellaneous tasks that don't fit other categories",
				iconUrl: "/icons/dots.svg",
			},
		}),
	]);
	console.log(`✅ Created ${categories.length} categories\n`);

	// ============================================
	// SKILLS (Predefined)
	// ============================================
	console.log("🛠️  Creating skills...");
	const skills = await Promise.all([
		// Home Services
		prisma.skill.upsert({
			where: { name: "Cleaning" },
			update: {},
			create: { name: "Cleaning", description: "House and office cleaning" },
		}),
		prisma.skill.upsert({
			where: { name: "Plumbing" },
			update: {},
			create: { name: "Plumbing", description: "Basic plumbing repairs" },
		}),
		prisma.skill.upsert({
			where: { name: "Electrical" },
			update: {},
			create: { name: "Electrical", description: "Basic electrical work" },
		}),
		prisma.skill.upsert({
			where: { name: "Painting" },
			update: {},
			create: {
				name: "Painting",
				description: "Interior and exterior painting",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Gardening" },
			update: {},
			create: { name: "Gardening", description: "Lawn care and gardening" },
		}),
		prisma.skill.upsert({
			where: { name: "Handyman" },
			update: {},
			create: { name: "Handyman", description: "General repairs and fixes" },
		}),

		// Moving & Delivery
		prisma.skill.upsert({
			where: { name: "Heavy Lifting" },
			update: {},
			create: { name: "Heavy Lifting", description: "Moving heavy items" },
		}),
		prisma.skill.upsert({
			where: { name: "Furniture Assembly" },
			update: {},
			create: {
				name: "Furniture Assembly",
				description: "IKEA and furniture assembly",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Driving" },
			update: {},
			create: { name: "Driving", description: "Delivery and transportation" },
		}),
		prisma.skill.upsert({
			where: { name: "Packing" },
			update: {},
			create: {
				name: "Packing",
				description: "Packing and organizing for moves",
			},
		}),

		// Tech Support
		prisma.skill.upsert({
			where: { name: "Computer Setup" },
			update: {},
			create: { name: "Computer Setup", description: "PC and Mac setup" },
		}),
		prisma.skill.upsert({
			where: { name: "Network Setup" },
			update: {},
			create: {
				name: "Network Setup",
				description: "WiFi and network configuration",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Phone Repair" },
			update: {},
			create: {
				name: "Phone Repair",
				description: "Smartphone troubleshooting",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Smart Home" },
			update: {},
			create: { name: "Smart Home", description: "Smart device installation" },
		}),
		prisma.skill.upsert({
			where: { name: "Data Recovery" },
			update: {},
			create: { name: "Data Recovery", description: "File and data recovery" },
		}),

		// Personal Assistant
		prisma.skill.upsert({
			where: { name: "Grocery Shopping" },
			update: {},
			create: { name: "Grocery Shopping", description: "Shopping and errands" },
		}),
		prisma.skill.upsert({
			where: { name: "Organization" },
			update: {},
			create: {
				name: "Organization",
				description: "Home and office organization",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Data Entry" },
			update: {},
			create: { name: "Data Entry", description: "Administrative data entry" },
		}),
		prisma.skill.upsert({
			where: { name: "Research" },
			update: {},
			create: { name: "Research", description: "Online research tasks" },
		}),

		// Events & Photography
		prisma.skill.upsert({
			where: { name: "Photography" },
			update: {},
			create: {
				name: "Photography",
				description: "Event and portrait photography",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Videography" },
			update: {},
			create: {
				name: "Videography",
				description: "Video recording and editing",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Event Setup" },
			update: {},
			create: {
				name: "Event Setup",
				description: "Event decoration and setup",
			},
		}),
		prisma.skill.upsert({
			where: { name: "DJ/Music" },
			update: {},
			create: { name: "DJ/Music", description: "Music and DJ services" },
		}),

		// Tutoring & Lessons
		prisma.skill.upsert({
			where: { name: "Math Tutoring" },
			update: {},
			create: { name: "Math Tutoring", description: "Math help all levels" },
		}),
		prisma.skill.upsert({
			where: { name: "Language Tutoring" },
			update: {},
			create: {
				name: "Language Tutoring",
				description: "Language instruction",
			},
		}),
		prisma.skill.upsert({
			where: { name: "Music Lessons" },
			update: {},
			create: { name: "Music Lessons", description: "Instrument instruction" },
		}),
		prisma.skill.upsert({
			where: { name: "Test Prep" },
			update: {},
			create: { name: "Test Prep", description: "SAT, GRE, etc. preparation" },
		}),

		// Pet Care
		prisma.skill.upsert({
			where: { name: "Dog Walking" },
			update: {},
			create: { name: "Dog Walking", description: "Dog walking services" },
		}),
		prisma.skill.upsert({
			where: { name: "Pet Sitting" },
			update: {},
			create: { name: "Pet Sitting", description: "Pet care and sitting" },
		}),
		prisma.skill.upsert({
			where: { name: "Pet Grooming" },
			update: {},
			create: { name: "Pet Grooming", description: "Basic pet grooming" },
		}),

		// Health & Wellness
		prisma.skill.upsert({
			where: { name: "Personal Training" },
			update: {},
			create: { name: "Personal Training", description: "Fitness coaching" },
		}),
		prisma.skill.upsert({
			where: { name: "Yoga Instruction" },
			update: {},
			create: { name: "Yoga Instruction", description: "Yoga classes" },
		}),
		prisma.skill.upsert({
			where: { name: "Massage" },
			update: {},
			create: { name: "Massage", description: "Licensed massage therapy" },
		}),

		// Creative & Design
		prisma.skill.upsert({
			where: { name: "Graphic Design" },
			update: {},
			create: { name: "Graphic Design", description: "Visual design work" },
		}),
		prisma.skill.upsert({
			where: { name: "Writing" },
			update: {},
			create: { name: "Writing", description: "Content and copywriting" },
		}),
		prisma.skill.upsert({
			where: { name: "Video Editing" },
			update: {},
			create: { name: "Video Editing", description: "Video post-production" },
		}),
		prisma.skill.upsert({
			where: { name: "Web Design" },
			update: {},
			create: { name: "Web Design", description: "Website design" },
		}),
	]);
	console.log(`✅ Created ${skills.length} skills\n`);

	// ============================================
	// DEMO USERS
	// ============================================
	console.log("👥 Creating demo users...");
	const users = await Promise.all([
		prisma.user.upsert({
			where: { email: "alice@example.com" },
			update: {},
			create: {
				id: "demo-user-alice",
				name: "Alice Johnson",
				email: "alice@example.com",
				emailVerified: true,
				image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
				bio: "Experienced handywoman and tech enthusiast. I love helping people with home repairs and computer issues!",
				phone: "+1-555-0101",
				city: "San Francisco",
				address: "123 Market St",
				latitude: 37.7749,
				longitude: -122.4194,
				avgRatingAsWorker: 4.8,
				avgRatingAsClient: 4.9,
				completedTasksAsWorker: 47,
				completedTasksAsClient: 12,
			},
		}),
		prisma.user.upsert({
			where: { email: "bob@example.com" },
			update: {},
			create: {
				id: "demo-user-bob",
				name: "Bob Smith",
				email: "bob@example.com",
				emailVerified: true,
				image: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
				bio: "Professional mover and fitness trainer. Strong, reliable, and always on time.",
				phone: "+1-555-0102",
				city: "San Francisco",
				address: "456 Mission St",
				latitude: 37.7872,
				longitude: -122.4001,
				avgRatingAsWorker: 4.6,
				avgRatingAsClient: 4.7,
				completedTasksAsWorker: 89,
				completedTasksAsClient: 5,
			},
		}),
		prisma.user.upsert({
			where: { email: "carol@example.com" },
			update: {},
			create: {
				id: "demo-user-carol",
				name: "Carol Williams",
				email: "carol@example.com",
				emailVerified: true,
				image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
				bio: "Creative professional specializing in photography and graphic design. Let me help bring your vision to life!",
				phone: "+1-555-0103",
				city: "Oakland",
				address: "789 Broadway",
				latitude: 37.8044,
				longitude: -122.2712,
				avgRatingAsWorker: 4.9,
				avgRatingAsClient: 4.8,
				completedTasksAsWorker: 34,
				completedTasksAsClient: 23,
			},
		}),
		prisma.user.upsert({
			where: { email: "david@example.com" },
			update: {},
			create: {
				id: "demo-user-david",
				name: "David Lee",
				email: "david@example.com",
				emailVerified: true,
				image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
				bio: "Math tutor and music teacher. Patient, encouraging, and experienced with all ages.",
				phone: "+1-555-0104",
				city: "Berkeley",
				address: "321 University Ave",
				latitude: 37.8716,
				longitude: -122.2727,
				avgRatingAsWorker: 5.0,
				avgRatingAsClient: 4.5,
				completedTasksAsWorker: 156,
				completedTasksAsClient: 8,
			},
		}),
		prisma.user.upsert({
			where: { email: "emma@example.com" },
			update: {},
			create: {
				id: "demo-user-emma",
				name: "Emma Davis",
				email: "emma@example.com",
				emailVerified: true,
				image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
				bio: "Dog lover and pet care specialist. Your furry friends are in good hands with me!",
				phone: "+1-555-0105",
				city: "San Jose",
				address: "555 Santa Clara St",
				latitude: 37.3382,
				longitude: -121.8863,
				avgRatingAsWorker: 4.7,
				avgRatingAsClient: 4.9,
				completedTasksAsWorker: 72,
				completedTasksAsClient: 15,
			},
		}),
	]);
	console.log(`✅ Created ${users.length} demo users\n`);

	// ============================================
	// USER SKILLS
	// ============================================
	console.log("🎯 Assigning skills to users...");

	// Get skill IDs
	const skillMap = new Map(skills.map((s) => [s.name, s.id]));

	// Create a custom skill for demo
	const customSkill = await prisma.customSkill.upsert({
		where: { id: "custom-skill-drone" },
		update: {},
		create: {
			id: "custom-skill-drone",
			name: "Drone Photography",
		},
	});

	const userSkills = await Promise.all([
		// Alice: Handyman, Tech
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-alice",
					skillId: getOrThrow(skillMap, "Handyman"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-alice",
				skillId: getOrThrow(skillMap, "Handyman"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-alice",
					skillId: getOrThrow(skillMap, "Computer Setup"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-alice",
				skillId: getOrThrow(skillMap, "Computer Setup"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-alice",
					skillId: getOrThrow(skillMap, "Network Setup"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-alice",
				skillId: getOrThrow(skillMap, "Network Setup"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-alice",
					skillId: getOrThrow(skillMap, "Painting"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-alice",
				skillId: getOrThrow(skillMap, "Painting"),
			},
		}),

		// Bob: Moving, Fitness
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-bob",
					skillId: getOrThrow(skillMap, "Heavy Lifting"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-bob",
				skillId: getOrThrow(skillMap, "Heavy Lifting"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-bob",
					skillId: getOrThrow(skillMap, "Furniture Assembly"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-bob",
				skillId: getOrThrow(skillMap, "Furniture Assembly"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-bob",
					skillId: getOrThrow(skillMap, "Personal Training"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-bob",
				skillId: getOrThrow(skillMap, "Personal Training"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-bob",
					skillId: getOrThrow(skillMap, "Driving"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-bob",
				skillId: getOrThrow(skillMap, "Driving"),
			},
		}),

		// Carol: Creative
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-carol",
					skillId: getOrThrow(skillMap, "Photography"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-carol",
				skillId: getOrThrow(skillMap, "Photography"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-carol",
					skillId: getOrThrow(skillMap, "Graphic Design"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-carol",
				skillId: getOrThrow(skillMap, "Graphic Design"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-carol",
					skillId: getOrThrow(skillMap, "Video Editing"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-carol",
				skillId: getOrThrow(skillMap, "Video Editing"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_customSkillId: {
					userId: "demo-user-carol",
					customSkillId: customSkill.id,
				},
			},
			update: {},
			create: { userId: "demo-user-carol", customSkillId: customSkill.id },
		}),

		// David: Tutoring
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-david",
					skillId: getOrThrow(skillMap, "Math Tutoring"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-david",
				skillId: getOrThrow(skillMap, "Math Tutoring"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-david",
					skillId: getOrThrow(skillMap, "Music Lessons"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-david",
				skillId: getOrThrow(skillMap, "Music Lessons"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-david",
					skillId: getOrThrow(skillMap, "Test Prep"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-david",
				skillId: getOrThrow(skillMap, "Test Prep"),
			},
		}),

		// Emma: Pet Care
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-emma",
					skillId: getOrThrow(skillMap, "Dog Walking"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-emma",
				skillId: getOrThrow(skillMap, "Dog Walking"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-emma",
					skillId: getOrThrow(skillMap, "Pet Sitting"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-emma",
				skillId: getOrThrow(skillMap, "Pet Sitting"),
			},
		}),
		prisma.userSkill.upsert({
			where: {
				userId_skillId: {
					userId: "demo-user-emma",
					skillId: getOrThrow(skillMap, "Pet Grooming"),
				},
			},
			update: {},
			create: {
				userId: "demo-user-emma",
				skillId: getOrThrow(skillMap, "Pet Grooming"),
			},
		}),
	]);
	console.log(`✅ Assigned ${userSkills.length} skills to users\n`);

	// ============================================
	// TASKS
	// ============================================
	console.log("📋 Creating demo tasks...");

	const categoryMap = new Map(categories.map((c) => [c.name, c.id]));

	const tasks = await Promise.all([
		// Task 1: OPEN - needs furniture assembly
		prisma.task.upsert({
			where: { id: "demo-task-1" },
			update: {},
			create: {
				id: "demo-task-1",
				title: "Help assemble IKEA bedroom furniture",
				description:
					"I just bought a KALLAX shelf, MALM bed frame, and HEMNES dresser from IKEA. Need someone experienced to help assemble them. Tools provided. Should take about 3-4 hours.",
				budgetMin: 80,
				budgetMax: 120,
				isRemote: false,
				city: "San Francisco",
				address: "100 Van Ness Ave",
				latitude: 37.7749,
				longitude: -122.4194,
				deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
				estimatedHours: 4,
				status: "OPEN",
				posterId: "demo-user-carol",
				categoryId: getOrThrow(categoryMap, "Moving & Delivery"),
			},
		}),

		// Task 2: OPEN - needs photography
		prisma.task.upsert({
			where: { id: "demo-task-2" },
			update: {},
			create: {
				id: "demo-task-2",
				title: "Product photography for Etsy shop",
				description:
					"I sell handmade jewelry on Etsy and need professional photos of 20 items. Looking for someone with a good camera and lighting setup. Can provide the items or come to your studio.",
				budgetMin: 100,
				budgetMax: 200,
				isRemote: false,
				city: "Oakland",
				address: "500 Grand Ave",
				latitude: 37.8115,
				longitude: -122.2517,
				deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
				estimatedHours: 3,
				status: "OPEN",
				posterId: "demo-user-alice",
				categoryId: getOrThrow(categoryMap, "Events & Photography"),
			},
		}),

		// Task 3: ASSIGNED - dog walking
		prisma.task.upsert({
			where: { id: "demo-task-3" },
			update: {},
			create: {
				id: "demo-task-3",
				title: "Daily dog walking for 2 weeks",
				description:
					"Going on vacation and need someone to walk my golden retriever Max once a day for 2 weeks. He's friendly and well-trained. Morning walks preferred, about 30-45 minutes each.",
				budgetMin: 200,
				budgetMax: 300,
				isRemote: false,
				city: "San Francisco",
				address: "200 Dolores St",
				latitude: 37.7583,
				longitude: -122.4256,
				deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				estimatedHours: 14,
				status: "ASSIGNED",
				posterId: "demo-user-bob",
				categoryId: getOrThrow(categoryMap, "Pet Care"),
			},
		}),

		// Task 4: IN_PROGRESS - math tutoring
		prisma.task.upsert({
			where: { id: "demo-task-4" },
			update: {},
			create: {
				id: "demo-task-4",
				title: "SAT Math prep tutoring - 5 sessions",
				description:
					"My daughter is taking the SAT next month and needs help with the math section. Looking for 5 one-hour sessions focusing on algebra and geometry. Can meet at library or online.",
				budgetMin: 150,
				budgetMax: 250,
				isRemote: true,
				city: "Berkeley",
				latitude: 37.8716,
				longitude: -122.2727,
				deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				estimatedHours: 5,
				status: "IN_PROGRESS",
				posterId: "demo-user-carol",
				categoryId: getOrThrow(categoryMap, "Tutoring & Lessons"),
			},
		}),

		// Task 5: COMPLETED - computer setup
		prisma.task.upsert({
			where: { id: "demo-task-5" },
			update: {},
			create: {
				id: "demo-task-5",
				title: "Set up new home office computer",
				description:
					"Just got a new iMac and need help setting it up - transferring files from old computer, setting up email, installing software, and configuring printer. Also need help with WiFi extender.",
				budgetMin: 60,
				budgetMax: 100,
				finalPrice: 85,
				isRemote: false,
				city: "San Francisco",
				address: "350 Bush St",
				latitude: 37.7909,
				longitude: -122.4017,
				deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
				estimatedHours: 2,
				status: "COMPLETED",
				posterId: "demo-user-emma",
				categoryId: getOrThrow(categoryMap, "Tech Support"),
			},
		}),

		// Task 6: REVIEWED - cleaning
		prisma.task.upsert({
			where: { id: "demo-task-6" },
			update: {},
			create: {
				id: "demo-task-6",
				title: "Deep clean apartment before move-out",
				description:
					"Moving out of my 2BR apartment and need a deep clean to get my deposit back. Kitchen, bathrooms, floors, windows. Cleaning supplies provided.",
				budgetMin: 120,
				budgetMax: 180,
				finalPrice: 150,
				isRemote: false,
				city: "San Jose",
				address: "888 N 1st St",
				latitude: 37.3541,
				longitude: -121.9056,
				deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
				estimatedHours: 4,
				status: "REVIEWED",
				posterId: "demo-user-david",
				categoryId: getOrThrow(categoryMap, "Home Services"),
			},
		}),

		// Task 7: OPEN - graphic design
		prisma.task.upsert({
			where: { id: "demo-task-7" },
			update: {},
			create: {
				id: "demo-task-7",
				title: "Design logo and business cards for startup",
				description:
					"Launching a new coffee subscription service and need a modern, minimalist logo plus business card design. Looking for someone creative who can deliver multiple concepts.",
				budgetMin: 150,
				budgetMax: 300,
				isRemote: true,
				city: "San Francisco",
				latitude: 37.7749,
				longitude: -122.4194,
				deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
				estimatedHours: 8,
				status: "OPEN",
				posterId: "demo-user-bob",
				categoryId: getOrThrow(categoryMap, "Creative & Design"),
			},
		}),

		// Task 8: OPEN - personal training
		prisma.task.upsert({
			where: { id: "demo-task-8" },
			update: {},
			create: {
				id: "demo-task-8",
				title: "Personal trainer for 4 sessions",
				description:
					"New to weightlifting and want to learn proper form and create a workout plan. Looking for 4 one-hour sessions at a local gym. Beginner friendly please!",
				budgetMin: 160,
				budgetMax: 240,
				isRemote: false,
				city: "Oakland",
				address: "1500 Broadway",
				latitude: 37.8044,
				longitude: -122.2712,
				deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
				estimatedHours: 4,
				status: "OPEN",
				posterId: "demo-user-emma",
				categoryId: getOrThrow(categoryMap, "Health & Wellness"),
			},
		}),
	]);
	console.log(`✅ Created ${tasks.length} demo tasks\n`);

	// ============================================
	// TASK SKILLS
	// ============================================
	console.log("🔗 Linking skills to tasks...");
	const taskSkills = await Promise.all([
		// Task 1: Furniture assembly
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-1",
					skillId: getOrThrow(skillMap, "Furniture Assembly"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-1",
				skillId: getOrThrow(skillMap, "Furniture Assembly"),
			},
		}),
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-1",
					skillId: getOrThrow(skillMap, "Heavy Lifting"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-1",
				skillId: getOrThrow(skillMap, "Heavy Lifting"),
			},
		}),

		// Task 2: Photography
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-2",
					skillId: getOrThrow(skillMap, "Photography"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-2",
				skillId: getOrThrow(skillMap, "Photography"),
			},
		}),

		// Task 3: Dog walking
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-3",
					skillId: getOrThrow(skillMap, "Dog Walking"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-3",
				skillId: getOrThrow(skillMap, "Dog Walking"),
			},
		}),

		// Task 4: Math tutoring
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-4",
					skillId: getOrThrow(skillMap, "Math Tutoring"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-4",
				skillId: getOrThrow(skillMap, "Math Tutoring"),
			},
		}),
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-4",
					skillId: getOrThrow(skillMap, "Test Prep"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-4",
				skillId: getOrThrow(skillMap, "Test Prep"),
			},
		}),

		// Task 5: Computer setup
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-5",
					skillId: getOrThrow(skillMap, "Computer Setup"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-5",
				skillId: getOrThrow(skillMap, "Computer Setup"),
			},
		}),
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-5",
					skillId: getOrThrow(skillMap, "Network Setup"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-5",
				skillId: getOrThrow(skillMap, "Network Setup"),
			},
		}),

		// Task 6: Cleaning
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-6",
					skillId: getOrThrow(skillMap, "Cleaning"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-6",
				skillId: getOrThrow(skillMap, "Cleaning"),
			},
		}),

		// Task 7: Graphic design
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-7",
					skillId: getOrThrow(skillMap, "Graphic Design"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-7",
				skillId: getOrThrow(skillMap, "Graphic Design"),
			},
		}),

		// Task 8: Personal training
		prisma.taskSkill.upsert({
			where: {
				taskId_skillId: {
					taskId: "demo-task-8",
					skillId: getOrThrow(skillMap, "Personal Training"),
				},
			},
			update: {},
			create: {
				taskId: "demo-task-8",
				skillId: getOrThrow(skillMap, "Personal Training"),
			},
		}),
	]);
	console.log(`✅ Linked ${taskSkills.length} skills to tasks\n`);

	// ============================================
	// BIDS
	// ============================================
	console.log("💰 Creating demo bids...");
	const bids = await Promise.all([
		// Bids on Task 1 (furniture assembly)
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-1", bidderId: "demo-user-bob" },
			},
			update: {},
			create: {
				id: "demo-bid-1",
				taskId: "demo-task-1",
				bidderId: "demo-user-bob",
				amount: 100,
				message:
					"Hi! I've assembled dozens of IKEA furniture pieces. I have all the necessary tools and can complete this in about 3 hours. Available this weekend!",
				estimatedHours: 3,
				status: "PENDING",
			},
		}),
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-1", bidderId: "demo-user-alice" },
			},
			update: {},
			create: {
				id: "demo-bid-2",
				taskId: "demo-task-1",
				bidderId: "demo-user-alice",
				amount: 90,
				message:
					"IKEA assembly is my specialty! I've built everything from PAX wardrobes to BESTA units. Quick, efficient, and I clean up after myself.",
				estimatedHours: 3.5,
				status: "PENDING",
			},
		}),

		// Bids on Task 2 (photography)
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-2", bidderId: "demo-user-carol" },
			},
			update: {},
			create: {
				id: "demo-bid-3",
				taskId: "demo-task-2",
				bidderId: "demo-user-carol",
				amount: 150,
				message:
					"I specialize in product photography for e-commerce! I have a home studio with professional lighting. Check out my portfolio - I guarantee crisp, bright images that sell.",
				estimatedHours: 2.5,
				status: "PENDING",
			},
		}),

		// Bid on Task 3 (dog walking) - ACCEPTED
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-3", bidderId: "demo-user-emma" },
			},
			update: {},
			create: {
				id: "demo-bid-4",
				taskId: "demo-task-3",
				bidderId: "demo-user-emma",
				amount: 250,
				message:
					"I'd love to walk Max! I have 3 years of professional dog walking experience and am fully insured. I can send you daily photos and updates. Golden retrievers are my favorite!",
				estimatedHours: 14,
				status: "ACCEPTED",
			},
		}),

		// Bid on Task 4 (tutoring) - ACCEPTED
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-4", bidderId: "demo-user-david" },
			},
			update: {},
			create: {
				id: "demo-bid-5",
				taskId: "demo-task-4",
				bidderId: "demo-user-david",
				amount: 200,
				message:
					"I'm a certified math tutor with 5+ years helping students improve their SAT scores. Average improvement of 80+ points! I provide practice materials and homework between sessions.",
				estimatedHours: 5,
				status: "ACCEPTED",
			},
		}),

		// Bid on Task 5 (computer setup) - ACCEPTED
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-5", bidderId: "demo-user-alice" },
			},
			update: {},
			create: {
				id: "demo-bid-6",
				taskId: "demo-task-5",
				bidderId: "demo-user-alice",
				amount: 85,
				message:
					"Mac expert here! I can set up your new iMac, migrate all your data, and get everything configured. I'll also show you some tips and tricks to get the most out of your new computer.",
				estimatedHours: 2,
				status: "ACCEPTED",
			},
		}),

		// Bids on Task 7 (graphic design)
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-7", bidderId: "demo-user-carol" },
			},
			update: {},
			create: {
				id: "demo-bid-7",
				taskId: "demo-task-7",
				bidderId: "demo-user-carol",
				amount: 200,
				message:
					"I love coffee AND design! I'll create 3 unique logo concepts for you to choose from, with unlimited revisions on your favorite. Business cards included. Let's make your brand stand out!",
				estimatedHours: 6,
				status: "PENDING",
			},
		}),

		// Bids on Task 8 (personal training)
		prisma.taskBid.upsert({
			where: {
				taskId_bidderId: { taskId: "demo-task-8", bidderId: "demo-user-bob" },
			},
			update: {},
			create: {
				id: "demo-bid-8",
				taskId: "demo-task-8",
				bidderId: "demo-user-bob",
				amount: 180,
				message:
					"Certified personal trainer with 6 years experience. I specialize in teaching beginners proper form to prevent injuries. I'll create a customized workout plan based on your goals!",
				estimatedHours: 4,
				status: "PENDING",
			},
		}),
	]);
	console.log(`✅ Created ${bids.length} demo bids\n`);

	// Update tasks with assigned bids
	await prisma.task.update({
		where: { id: "demo-task-3" },
		data: { assignedBidId: "demo-bid-4", finalPrice: 250 },
	});
	await prisma.task.update({
		where: { id: "demo-task-4" },
		data: { assignedBidId: "demo-bid-5", finalPrice: 200 },
	});
	await prisma.task.update({
		where: { id: "demo-task-5" },
		data: { assignedBidId: "demo-bid-6" },
	});

	// ============================================
	// REVIEWS
	// ============================================
	console.log("⭐ Creating demo reviews...");
	const reviews = await Promise.all([
		// Reviews for Task 5 (computer setup) - both directions
		prisma.review.upsert({
			where: {
				taskId_authorId: { taskId: "demo-task-5", authorId: "demo-user-emma" },
			},
			update: {},
			create: {
				taskId: "demo-task-5",
				authorId: "demo-user-emma",
				targetId: "demo-user-alice",
				rating: 5,
				comment:
					"Alice was amazing! She set up my computer quickly, explained everything clearly, and even taught me some shortcuts I didn't know about. Highly recommend!",
				type: "CLIENT_TO_WORKER",
			},
		}),
		prisma.review.upsert({
			where: {
				taskId_authorId: { taskId: "demo-task-5", authorId: "demo-user-alice" },
			},
			update: {},
			create: {
				taskId: "demo-task-5",
				authorId: "demo-user-alice",
				targetId: "demo-user-emma",
				rating: 5,
				comment:
					"Great client! Had everything ready when I arrived and was very appreciative. Would work with again!",
				type: "WORKER_TO_CLIENT",
			},
		}),

		// Reviews for Task 6 (cleaning) - both directions
		prisma.review.upsert({
			where: {
				taskId_authorId: { taskId: "demo-task-6", authorId: "demo-user-david" },
			},
			update: {},
			create: {
				taskId: "demo-task-6",
				authorId: "demo-user-david",
				targetId: "demo-user-bob",
				rating: 4,
				comment:
					"Bob did a good job with the deep clean. The apartment looks great and I got my full deposit back. Only minor issue was he arrived 15 minutes late.",
				type: "CLIENT_TO_WORKER",
			},
		}),
		prisma.review.upsert({
			where: {
				taskId_authorId: { taskId: "demo-task-6", authorId: "demo-user-bob" },
			},
			update: {},
			create: {
				taskId: "demo-task-6",
				authorId: "demo-user-bob",
				targetId: "demo-user-david",
				rating: 5,
				comment:
					"David was a great client. Clear instructions, fair payment, and even left me a snack. Thanks!",
				type: "WORKER_TO_CLIENT",
			},
		}),
	]);
	console.log(`✅ Created ${reviews.length} demo reviews\n`);

	// ============================================
	// MESSAGES
	// ============================================
	console.log("💬 Creating demo messages...");
	const messages = await Promise.all([
		// Messages for Task 1 (furniture assembly)
		prisma.message.create({
			data: {
				taskId: "demo-task-1",
				senderId: "demo-user-bob",
				content:
					"Hi! I noticed you mentioned tools are provided. Do you have a power drill? It makes assembly much faster.",
				isRead: true,
				createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
			},
		}),
		prisma.message.create({
			data: {
				taskId: "demo-task-1",
				senderId: "demo-user-carol",
				content:
					"Yes, I have a basic power drill and screwdriver set. Let me know if you need anything else!",
				isRead: true,
				createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3600000),
			},
		}),

		// Messages for Task 3 (dog walking)
		prisma.message.create({
			data: {
				taskId: "demo-task-3",
				senderId: "demo-user-emma",
				content:
					"I'm so excited to meet Max! Does he have any dietary restrictions or favorite treats I should know about?",
				isRead: true,
				createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
			},
		}),
		prisma.message.create({
			data: {
				taskId: "demo-task-3",
				senderId: "demo-user-bob",
				content:
					"He loves peanut butter treats but no chocolate obviously! I'll leave his leash and poop bags by the door. Thanks!",
				isRead: true,
				createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 1800000),
			},
		}),

		// Messages for Task 4 (tutoring)
		prisma.message.create({
			data: {
				taskId: "demo-task-4",
				senderId: "demo-user-david",
				content:
					"Hi! We finished our second session today. Your daughter is making great progress! She's really getting the hang of quadratic equations.",
				isRead: true,
				createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
			},
		}),
		prisma.message.create({
			data: {
				taskId: "demo-task-4",
				senderId: "demo-user-carol",
				content:
					"That's wonderful to hear! She mentioned she feels much more confident. Same time next week?",
				isRead: false,
				createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 7200000),
			},
		}),
	]);
	console.log(`✅ Created ${messages.length} demo messages\n`);

	// ============================================
	// PAYMENTS
	// ============================================
	console.log("💳 Creating demo payments...");
	const payments = await Promise.all([
		// Payment for completed task 5
		prisma.payment.upsert({
			where: { taskId: "demo-task-5" },
			update: {},
			create: {
				taskId: "demo-task-5",
				amount: 85,
				status: "RELEASED",
				payerId: "demo-user-emma",
				payeeId: "demo-user-alice",
				completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
			},
		}),

		// Payment for reviewed task 6
		prisma.payment.upsert({
			where: { taskId: "demo-task-6" },
			update: {},
			create: {
				taskId: "demo-task-6",
				amount: 150,
				status: "RELEASED",
				payerId: "demo-user-david",
				payeeId: "demo-user-bob",
				completedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
			},
		}),

		// Payment for assigned task 3 (held in escrow)
		prisma.payment.upsert({
			where: { taskId: "demo-task-3" },
			update: {},
			create: {
				taskId: "demo-task-3",
				amount: 250,
				status: "HELD",
				payerId: "demo-user-bob",
				payeeId: "demo-user-emma",
			},
		}),

		// Payment for in-progress task 4 (held in escrow)
		prisma.payment.upsert({
			where: { taskId: "demo-task-4" },
			update: {},
			create: {
				taskId: "demo-task-4",
				amount: 200,
				status: "HELD",
				payerId: "demo-user-carol",
				payeeId: "demo-user-david",
			},
		}),
	]);
	console.log(`✅ Created ${payments.length} demo payments\n`);

	// ============================================
	// TASK ATTACHMENTS
	// ============================================
	console.log("📎 Creating demo attachments...");
	const attachments = await Promise.all([
		prisma.taskAttachment.create({
			data: {
				taskId: "demo-task-1",
				fileName: "kallax-instructions.pdf",
				fileUrl:
					"https://storage.example.com/attachments/kallax-instructions.pdf",
				fileType: "application/pdf",
				fileSize: 2048576,
			},
		}),
		prisma.taskAttachment.create({
			data: {
				taskId: "demo-task-2",
				fileName: "jewelry-samples.jpg",
				fileUrl: "https://storage.example.com/attachments/jewelry-samples.jpg",
				fileType: "image/jpeg",
				fileSize: 1536000,
			},
		}),
		prisma.taskAttachment.create({
			data: {
				taskId: "demo-task-7",
				fileName: "brand-inspiration.png",
				fileUrl:
					"https://storage.example.com/attachments/brand-inspiration.png",
				fileType: "image/png",
				fileSize: 892416,
			},
		}),
	]);
	console.log(`✅ Created ${attachments.length} demo attachments\n`);

	console.log("🎉 Seed completed successfully!\n");
	console.log("Summary:");
	console.log(`  - ${categories.length} categories`);
	console.log(`  - ${skills.length} predefined skills`);
	console.log("  - 1 custom skill");
	console.log(`  - ${users.length} demo users`);
	console.log(`  - ${userSkills.length} user-skill assignments`);
	console.log(`  - ${tasks.length} demo tasks`);
	console.log(`  - ${taskSkills.length} task-skill requirements`);
	console.log(`  - ${bids.length} demo bids`);
	console.log(`  - ${reviews.length} demo reviews`);
	console.log(`  - ${messages.length} demo messages`);
	console.log(`  - ${payments.length} demo payments`);
	console.log(`  - ${attachments.length} demo attachments`);
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		process.exit(0);
	});
