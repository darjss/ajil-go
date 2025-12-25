import {
	ArrowRight,
	CheckCircle2,
	Clock,
	GraduationCap,
	Hammer,
	MoveRight,
	Paintbrush,
	ShoppingBag,
	Sparkles,
	Star,
	Truck,
	Wrench,
	Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	return (
		<main className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
			<section className="relative flex min-h-[92vh] flex-col border-border border-b bg-[linear-gradient(to_bottom,transparent_0%,var(--primary)_100%)]/5 pt-20">
				<div className="flex flex-1 flex-col justify-center px-4 md:px-8">
					<div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 items-end gap-12 pb-20 lg:grid-cols-12 lg:gap-8">
						<div className="relative z-10 lg:col-span-8">
							<Badge
								variant="outline"
								className="mb-6 rounded-none border-primary bg-primary/5 px-4 py-1 font-mono text-primary text-xs uppercase tracking-widest"
							>
								Монголын №1 Ажлын Маркетплейс
							</Badge>
							<h1 className="font-display font-medium text-[14vw] text-foreground uppercase leading-[0.8] tracking-tighter lg:text-[11rem]">
								<span className="block animate-reveal [animation-delay:100ms]">
									Ажлаа
								</span>
								<span className="ml-[10vw] block animate-reveal text-primary italic [animation-delay:300ms] lg:ml-24">
									Амжуул.
								</span>
							</h1>
						</div>

						<div className="animate-fade-up [animation-delay:600ms] lg:col-span-4 lg:mb-8">
							<div className="rounded-lg bg-background/50 p-6 backdrop-blur-sm lg:bg-transparent lg:p-0">
								<p className="mb-8 font-body text-muted-foreground text-xl leading-relaxed md:text-2xl">
									Таны цагийг хэмнэх мэргэжлийн туслахууд нэг дор. Гэр
									цэвэрлэхээс эхлээд засвар үйлчилгээ хүртэл.
								</p>

								<div className="flex flex-col gap-4 sm:flex-row">
									<Button
										size="lg"
										className="group h-16 rounded-none bg-primary px-8 text-lg text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:scale-105 hover:bg-primary/90 hover:shadow-none"
										asChild
									>
										<Link href="/tasks">
											Ажил хайх{" "}
											<MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
									<Button
										variant="outline"
										size="lg"
										className="h-16 rounded-none border-2 border-primary bg-transparent px-8 text-foreground text-lg transition-all duration-300 hover:bg-primary/5 hover:text-primary"
										asChild
									>
										<Link href="/signup">Ажил олгох</Link>
									</Button>
								</div>

								<div className="mt-8 flex items-center gap-4 font-mono text-muted-foreground text-sm">
									<div className="-space-x-3 flex">
										{[1, 2, 3, 4].map((seed) => (
											<div
												key={`avatar-${seed}`}
												className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-none border-2 border-background bg-muted"
											>
												<Image
													src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed * 13}`}
													alt="User"
													width={40}
													height={40}
													className="h-full w-full"
													unoptimized
												/>
											</div>
										))}
									</div>
									<p>1000+ хэрэглэгч нэгдсэн</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute right-0 bottom-0 left-0 overflow-hidden border-border border-t bg-secondary/20 py-3 backdrop-blur-md">
					<div className="flex animate-marquee whitespace-nowrap">
						{[
							"item1",
							"item2",
							"item3",
							"item4",
							"item5",
							"item6",
							"item7",
							"item8",
							"item9",
							"item10",
							"item11",
							"item12",
						].map((key) => (
							<span
								key={key}
								className="mx-4 font-bold font-mono text-lg text-secondary-foreground/70 tracking-[0.2em]"
							>
								• НАЙДВАРТАЙ • ХУРДАН • ХЯЛБАР
							</span>
						))}
					</div>
				</div>
			</section>

			<section className="border-border border-b bg-background">
				<div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
					{[
						{ label: "Нийт Даалгавар", value: "5k+", icon: CheckCircle2 },
						{ label: "Гүйцэтгэгч", value: "1.2k", icon: Zap },
						{ label: "Дундаж Үнэлгээ", value: "4.9", icon: Star },
						{ label: "Хэмнэсэн Цаг", value: "10k+", icon: Clock },
					].map((stat) => (
						<div
							key={stat.label}
							className="group p-8 transition-colors duration-300 hover:bg-secondary/10 md:p-12"
						>
							<stat.icon className="mb-4 h-8 w-8 text-primary opacity-80 transition-transform duration-300 group-hover:scale-110" />
							<div className="mb-2 font-display font-medium text-4xl text-foreground md:text-6xl">
								{stat.value}
							</div>
							<div className="font-mono text-muted-foreground text-sm uppercase tracking-widest">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="bg-background">
				<div className="flex flex-col items-end justify-between gap-8 border-border border-b p-8 md:flex-row md:p-16">
					<div>
						<h2 className="mb-4 font-display text-5xl md:text-7xl">
							Та юу <span className="text-primary italic">хийлгэмээр</span>{" "}
							байна?
						</h2>
						<p className="max-w-xl font-body text-muted-foreground text-xl">
							Мэргэжлийн хүмүүс таны өмнөөс бүхнийг хийхэд бэлэн.
						</p>
					</div>
					<Button
						variant="link"
						className="font-mono text-lg underline decoration-primary underline-offset-4 transition-colors hover:text-primary"
						asChild
					>
						<Link href="/tasks">Бүх ангиллыг үзэх</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 border-border border-b sm:grid-cols-2 lg:grid-cols-4">
					{[
						{
							title: "Цэвэрлэгээ",
							icon: Sparkles,
							desc: "Гэр, оффис цэвэрлэгээ",
							color: "bg-blue-50 hover:bg-blue-100",
						},
						{
							title: "Нүүлгэлт",
							icon: Truck,
							desc: "Ачаа тээвэр, нүүлгэлт",
							color: "bg-orange-50 hover:bg-orange-100",
						},
						{
							title: "Засвар",
							icon: Hammer,
							desc: "Сантехник, цахилгаан",
							color: "bg-muted hover:bg-muted/80",
						},
						{
							title: "Угсралт",
							icon: Wrench,
							desc: "Тавилга угсрах, янзлах",
							color: "bg-yellow-50 hover:bg-yellow-100",
						},
						{
							title: "Засал чимэглэл",
							icon: Paintbrush,
							desc: "Будаг, обой наах",
							color: "bg-purple-50 hover:bg-purple-100",
						},
						{
							title: "Хүргэлт",
							icon: ShoppingBag,
							desc: "Хүнс, бичиг баримт",
							color: "bg-green-50 hover:bg-green-100",
						},
						{
							title: "Сургалт",
							icon: GraduationCap,
							desc: "Гадаад хэл, давтлага",
							color: "bg-pink-50 hover:bg-pink-100",
						},
						{
							title: "Бусад",
							icon: ArrowRight,
							desc: "Бүх төрлийн ажил",
							color: "bg-gray-50 hover:bg-gray-100",
						},
					].map((cat, i) => (
						<Link
							href={`/tasks?category=${cat.title}`}
							key={cat.title}
							className="group relative flex min-h-[320px] flex-col justify-between border-border border-r border-b p-8 transition-all duration-300 hover:bg-primary/5"
						>
							<div className="flex w-full items-start justify-between">
								<span className="rounded-none border border-border bg-background px-2 py-1 font-mono text-muted-foreground text-xs">
									0{i + 1}
								</span>
								<div className="rounded-none border border-border bg-background p-4 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
									<cat.icon className="h-6 w-6 text-foreground" />
								</div>
							</div>

							<div className="relative z-10">
								<h3 className="mb-3 flex items-center gap-2 font-display text-3xl text-foreground transition-transform duration-300 group-hover:translate-x-2">
									{cat.title}
									<ArrowRight className="-ml-4 h-5 w-5 text-primary opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
								</h3>
								<p className="font-body text-muted-foreground leading-tight transition-colors group-hover:text-foreground">
									{cat.desc}
								</p>
							</div>
						</Link>
					))}
				</div>
			</section>

			<section className="relative overflow-hidden bg-secondary/10 px-6 py-24">
				<div className="-translate-y-1/2 absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/2 rounded-none bg-primary/5 blur-3xl" />
				<div className="-translate-x-1/2 absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/2 rounded-none bg-secondary/10 blur-3xl" />

				<div className="relative z-10 mx-auto max-w-[1800px]">
					<div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
						<div className="sticky top-24">
							<Badge className="mb-6 bg-secondary text-secondary-foreground hover:bg-secondary/80">
								Хэрхэн ажилладаг вэ?
							</Badge>
							<h2 className="mb-8 font-display text-6xl text-foreground leading-[0.9] md:text-8xl">
								Хялбар <br />
								<span className="text-primary italic">3 алхам.</span>
							</h2>
							<p className="mb-12 max-w-md font-body text-muted-foreground text-xl leading-relaxed">
								Таны ажлыг бүтээх үйл явц маш энгийн бөгөөд ойлгомжтой. Илүүдэл
								зүйлгүй.
							</p>
							<Button
								size="lg"
								className="h-14 rounded-none bg-foreground px-8 text-background text-lg hover:bg-foreground/90"
								asChild
							>
								<Link href="/signup">Эхлэх</Link>
							</Button>
						</div>

						<div className="space-y-8">
							{[
								{
									step: "01",
									title: "Ажлаа нийтэл",
									desc: "Юу хийлгэх хэрэгтэй байгаагаа бидэнд хэл. Зураг, тайлбар, үнэ болон хугацаагаа оруул.",
									icon: Paintbrush,
								},
								{
									step: "02",
									title: "Санал авах",
									desc: "Таны ажлыг хийх сонирхолтой хүмүүсээс санал ирнэ. Тэдний үнэлгээ, туршлагыг хараад сонго.",
									icon: CheckCircle2,
								},
								{
									step: "03",
									title: "Ажлаа амжуул",
									desc: "Ажилтан ирж ажлаа хийнэ. Ажил дууссаны дараа төлбөрөө төлж, сэтгэгдэл үлдээ.",
									icon: Star,
								},
							].map((item) => (
								<Card
									key={item.step}
									className="group relative overflow-hidden border-0 bg-background/60 shadow-none backdrop-blur-sm transition-all duration-500 hover:bg-background"
								>
									<div className="absolute top-0 bottom-0 left-0 w-1 origin-top scale-y-0 bg-primary transition-transform duration-500 group-hover:scale-y-100" />
									<CardContent className="flex items-start gap-6 p-8 md:gap-10 md:p-10">
										<div className="hidden flex-col items-center gap-2 pt-2 md:flex">
											<span className="font-display text-5xl text-primary/20 transition-colors duration-500 group-hover:text-primary">
												{item.step}
											</span>
										</div>
										<div>
											<div className="mb-4 flex items-center gap-4">
												<div className="font-display text-2xl text-primary md:hidden">
													{item.step}
												</div>
												<h3 className="font-display text-3xl text-foreground">
													{item.title}
												</h3>
											</div>
											<p className="font-light text-lg text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground/80">
												{item.desc}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="border-border border-y bg-background py-24">
				<div className="mx-auto max-w-[1800px] px-6">
					<div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
						<h2 className="max-w-2xl font-display text-4xl md:text-6xl">
							Хэрэглэгчдийн{" "}
							<span className="text-secondary italic">сэтгэгдэл</span>
						</h2>
						<div className="flex gap-2">
							<Button
								size="icon"
								variant="outline"
								className="h-12 w-12 rounded-none border-2"
							>
								<ArrowRight className="h-5 w-5 rotate-180" />
							</Button>
							<Button
								size="icon"
								variant="outline"
								className="h-12 w-12 rounded-none border-2"
							>
								<ArrowRight className="h-5 w-5" />
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{[
							{
								name: "Б. Болд",
								role: "Гэрийн эзэн",
								text: "Гэр цэвэрлэх хүн хайгаад олдохгүй байсан. Ajil Go ашиглаад 30 минутын дотор найдвартай хүн оллоо. Үнэхээр амар!",
								rating: 5,
							},
							{
								name: "Г. Сараа",
								role: "Бизнес эрхлэгч",
								text: "Оффисын нүүлгэлт хийхэд маш тус болсон. Залуучууд цагтаа ирж, маш нямбай ажилласан. Баярлалаа.",
								rating: 5,
							},
							{
								name: "О. Тэмүүлэн",
								role: "Оюутан",
								text: "Чөлөөт цагаараа мөнгө олох боломж олгосонд баярлалаа. Хичээлийнхээ хажуугаар ажиллахад маш тохиромжтой.",
								rating: 4,
							},
						].map((review) => (
							<div
								key={review.name}
								className="hover:-translate-y-2 flex flex-col gap-6 border border-transparent bg-muted/30 p-8 transition-transform duration-300 hover:border-primary/20 md:p-10"
							>
								<div className="flex gap-1 text-primary">
									{[1, 2, 3, 4, 5].map((starNum) => (
										<Star
											key={`star-${starNum}`}
											className={`h-5 w-5 ${starNum <= review.rating ? "fill-current" : "text-muted-foreground/30"}`}
										/>
									))}
								</div>
								<p className="flex-1 font-body text-xl leading-relaxed">
									"{review.text}"
								</p>
								<div className="mt-auto flex items-center gap-4 border-border/50 border-t pt-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-none bg-secondary/20 font-display text-secondary-foreground text-xl">
										{review.name[0]}
									</div>
									<div>
										<div className="font-bold font-display text-lg">
											{review.name}
										</div>
										<div className="font-mono text-muted-foreground text-sm">
											{review.role}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="relative overflow-hidden bg-secondary px-6 py-40 text-center text-secondary-foreground">
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
				<div className="relative z-10 mx-auto max-w-4xl">
					<Badge className="mb-8 border-none bg-background/20 px-4 py-2 text-background text-sm backdrop-blur-sm hover:bg-background/30">
						Яг одоо эхэл
					</Badge>
					<h2 className="mb-8 font-display text-6xl tracking-tight md:text-8xl">
						Ажлаа амжуулахад <br className="hidden md:block" />
						<span className="italic opacity-80">бэлэн үү?</span>
					</h2>
					<p className="mx-auto mb-12 max-w-2xl font-body text-xl opacity-90 md:text-2xl">
						Мянга мянган хэрэглэгчидтэй нэгдэж, амьдралаа хялбарчил. Эсвэл
						өөрийн ур чадвараараа орлого ол.
					</p>
					<div className="flex flex-col justify-center gap-6 sm:flex-row">
						<Button
							size="lg"
							className="h-20 rounded-none bg-background px-12 text-2xl text-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:bg-background/90"
							asChild
						>
							<Link href="/signup">Бүртгүүлэх</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-20 rounded-none border-2 border-background/30 px-12 text-2xl text-background transition-all duration-300 hover:border-background hover:bg-background/10"
							asChild
						>
							<Link href="/tasks">Даалгавар харах</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
