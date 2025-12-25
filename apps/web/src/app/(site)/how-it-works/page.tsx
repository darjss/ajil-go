import {
	ArrowDown,
	ArrowRight,
	CheckCircle,
	CircleDollarSign,
	Clock,
	Shield,
	Zap,
} from "lucide-react";
import Link from "next/link";

import { HowItWorksTabSelector } from "@/components/how-it-works/tab-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
	{
		icon: Shield,
		title: "Найдвартай баталгаат",
		description:
			"Бүх хэрэглэгчид баталгаажсан. Аюулгүй төлбөрийн систем ашигладаг.",
		color: "text-blue-600",
	},
	{
		icon: Clock,
		title: "Хурдан шуурхай",
		description: "Минутын дотор тохиромжтой хүн ол. Цаг хугацаагаа хэмнээрэй.",
		color: "text-purple-600",
	},
	{
		icon: CircleDollarSign,
		title: "Шударга үнэ",
		description:
			"Олон санал харьцуулж, өөрт тохирсон үнээ сонго. Нуугдсан төлбөргүй.",
		color: "text-green-600",
	},
	{
		icon: CheckCircle,
		title: "Чанарын баталгаа",
		description:
			"Үнэлгээний систем нь чанарыг баталгаажуулна. Сэтгэл ханамжгүй бол буцаалт.",
		color: "text-orange-600",
	},
];

export default function HowItWorksPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			{/* Hero Section */}
			<section className="relative overflow-hidden border-border border-b bg-gradient-to-br from-background via-secondary/5 to-primary/5 px-6 pt-32 pb-20">
				<div className="absolute top-10 right-10 h-72 w-72 rounded-none bg-primary/10 opacity-50 blur-3xl" />
				<div className="absolute bottom-10 left-10 h-96 w-96 rounded-none bg-secondary/10 opacity-50 blur-3xl" />

				<div className="relative z-10 mx-auto max-w-[1400px] text-center">
					<Badge
						variant="outline"
						className="mb-8 rounded-none border-primary bg-primary/5 px-6 py-2 font-mono text-primary text-sm uppercase tracking-widest"
					>
						Хэрхэн ажилладаг вэ
					</Badge>

					<h1 className="mx-auto mb-8 max-w-4xl font-display text-6xl uppercase leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl">
						<span className="block">Амар</span>
						<span className="block text-primary italic">Энгийн</span>
						<span className="block">Үр дүнтэй</span>
					</h1>

					<p className="mx-auto mb-12 max-w-2xl font-body text-muted-foreground text-xl leading-relaxed md:text-2xl">
						Таны хэрэгцээнд тохирсон мэргэжилтнүүдийг хурдан бөгөөд
						найдвартайгаар олоход туслах платформ. Эхлээд дараах үйл явцыг
						танилцаарай.
					</p>

					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							size="lg"
							className="group h-16 rounded-none bg-primary px-10 text-lg text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary/90 hover:shadow-none"
							asChild
						>
							<Link href="/signup">
								Эхлэх{" "}
								<ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-16 rounded-none border-2 border-border px-10 text-lg hover:bg-secondary/10"
							asChild
						>
							<Link href="/tasks">Ажлууд үзэх</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<section className="border-border border-b bg-background">
				<div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="group flex flex-col items-center p-10 text-center transition-colors hover:bg-secondary/5 md:p-12"
						>
							<div className="mb-6 rounded-none border-2 border-border bg-background p-6 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/50">
								<feature.icon
									className={`h-10 w-10 ${feature.color} transition-transform group-hover:rotate-12`}
								/>
							</div>
							<h3 className="mb-3 font-display text-2xl">{feature.title}</h3>
							<p className="font-body text-muted-foreground leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Tab Selector and Steps - Client Component */}
			<HowItWorksTabSelector />

			{/* Video/Visual Section (Placeholder) */}
			<section className="border-border border-y bg-gradient-to-br from-secondary/20 via-background to-primary/10 px-6 py-24">
				<div className="mx-auto max-w-[1200px]">
					<div className="grid items-center gap-16 lg:grid-cols-2">
						<div>
							<Badge className="mb-6 rounded-none bg-primary/10 px-4 py-2 text-primary">
								Платформын давуу тал
							</Badge>
							<h2 className="mb-6 font-display text-5xl leading-tight md:text-6xl">
								Яагаад <span className="text-primary italic">Ajil-Go</span> гэж?
							</h2>
							<div className="space-y-6">
								{[
									{
										title: "Баталгаажсан мэргэжилтнүүд",
										desc: "Бүх гүйцэтгэгчид баталгаажсан, туршлагатай.",
									},
									{
										title: "Аюулгүй төлбөр",
										desc: "Төлбөр хамгаалагдсан, ажил дууссаны дараа төлнө.",
									},
									{
										title: "24/7 Дэмжлэг",
										desc: "Асуудал гарвал бид танд ямар ч үед туслахад бэлэн.",
									},
									{
										title: "Үнэлгээний систем",
										desc: "Чанарыг хянах, шударга үнэлгээний систем.",
									},
								].map((item) => (
									<div
										key={item.title}
										className="group flex items-start gap-4 rounded-none border border-transparent bg-background/50 p-6 transition-all hover:border-primary/30 hover:bg-background"
									>
										<div className="flex-shrink-0">
											<div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary/10 text-primary">
												<CheckCircle className="h-6 w-6" />
											</div>
										</div>
										<div>
											<h4 className="mb-2 font-display text-xl">
												{item.title}
											</h4>
											<p className="font-body text-muted-foreground">
												{item.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							<div className="aspect-square overflow-hidden rounded-none border-4 border-border bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl">
								<div className="flex h-full items-center justify-center">
									<div className="text-center">
										<Zap className="mx-auto mb-4 h-20 w-20 animate-pulse text-primary" />
										<p className="font-display text-2xl text-muted-foreground">
											Платформын танилцуулга
										</p>
										<p className="mt-2 font-mono text-muted-foreground/60 text-sm">
											Удахгүй
										</p>
									</div>
								</div>
							</div>
							<div className="-top-6 -right-6 -z-10 absolute h-full w-full rounded-none border-2 border-primary/30 border-dashed" />
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative overflow-hidden bg-primary px-6 py-32 text-center text-primary-foreground">
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
				<div className="relative z-10 mx-auto max-w-4xl">
					<h2 className="mb-8 font-display text-6xl uppercase tracking-tight md:text-8xl">
						Бэлэн үү?
					</h2>
					<p className="mx-auto mb-12 max-w-2xl font-body text-xl opacity-90 md:text-2xl">
						Мянга мянган хэрэглэгчидтэй нэгдэж, өөрийн амьдралаа хялбарчил.
						Эсвэл ур чадвараараа орлого олж эхэл.
					</p>
					<div className="flex flex-col justify-center gap-6 sm:flex-row">
						<Button
							size="lg"
							className="h-20 rounded-none bg-background px-12 text-2xl text-foreground shadow-xl transition-all hover:scale-105 hover:bg-background/90"
							asChild
						>
							<Link href="/signup">Бүртгүүлэх</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-20 rounded-none border-2 border-background/30 bg-transparent px-12 text-2xl text-background transition-all hover:border-background hover:bg-background/10"
							asChild
						>
							<Link href="/login">Нэвтрэх</Link>
						</Button>
					</div>
				</div>

				{/* Decorative Arrow */}
				<div className="-translate-x-1/2 absolute bottom-8 left-1/2 animate-bounce">
					<ArrowDown className="h-8 w-8 opacity-50" />
				</div>
			</section>
		</main>
	);
}
