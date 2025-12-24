"use client";

import {
	CheckCircle2,
	CircleDollarSign,
	FileCheck,
	FileText,
	HandCoins,
	MessageSquare,
	Search,
	Star,
	Target,
	UserCheck,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type TabType = "client" | "worker";

const clientSteps = [
	{
		step: "01",
		title: "Ажлаа тодорхойл",
		description:
			"Юу хийлгэх хэрэгтэй байгаагаа нарийвчлан тайлбарла. Зураг, хаяг, цаг хугацаа болон төсөвөө оруул. Бид танд тохирох мэргэжилтнүүдийг олоход туслах болно.",
		icon: FileText,
		color: "bg-blue-50 border-blue-200",
		iconColor: "text-blue-600",
	},
	{
		step: "02",
		title: "Саналууд авах",
		description:
			"Мэргэжилтнүүд таны ажлыг харж, өөрсдийн үнийн санал (үнэ + хугацаа + тайлбар) илгээнэ. Та санал бүрийн дэлгэрэнгүйг харж, чатлаад тодруулга авч сонголтоо хялбар болгоно.",
		icon: Users,
		color: "bg-purple-50 border-purple-200",
		iconColor: "text-purple-600",
	},
	{
		step: "03",
		title: "Гүйцэтгэгчээ сонго",
		description:
			"Саналуудыг харьцуулж, шилдэгүүдээ шилд. Чатлаж нөхцөлөө тодруулаад, тохиромжтой гүйцэтгэгчээ сонгон баталгаажуул. Бүх үйл явц найдвартай, хамгаалагдсан.",
		icon: UserCheck,
		color: "bg-green-50 border-green-200",
		iconColor: "text-green-600",
	},
	{
		step: "04",
		title: "Ажил хийгдэнэ",
		description:
			"Сонгосон гүйцэтгэгчтэй чатлаж цаг товлож, шаардлагатай мэдээллээ солилцоод ажлаа эхлүүлнэ. Та үйл явцыг хянаж, ахицын талаар тогтмол мэдээлэл авна.",
		icon: Zap,
		color: "bg-yellow-50 border-yellow-200",
		iconColor: "text-yellow-600",
	},
	{
		step: "05",
		title: "Төлбөр төлж, үнэлгээ өгөх",
		description:
			"Ажил амжилттай дууссаны дараа аюулгүй төлбөрийн системээр төлбөрөө төл. Сэтгэгдэл үлдээж, бусад хэрэглэгчдэд туслаарай. Таны баталгаа бидний хамгаалалт юм.",
		icon: Star,
		color: "bg-orange-50 border-orange-200",
		iconColor: "text-orange-600",
	},
];

const workerSteps = [
	{
		step: "01",
		title: "Бүртгүүлж профайл үүсгэх",
		description:
			"Өөрийн ур чадвар, туршлага, төгссөн төслүүдээ нэмэх. Та өөрөө үнэлгээ, цагаа тодорхойлох боломжтой. Бүртгэл үнэгүй бөгөөд хялбар.",
		icon: FileCheck,
		color: "bg-indigo-50 border-indigo-200",
		iconColor: "text-indigo-600",
	},
	{
		step: "02",
		title: "Тохиромжтой ажлууд олох",
		description:
			"Таны ур чадварт тохирсон ажлуудыг хайж, шүүлтүүр ашиглан олох. Хаяг, төлбөр, хугацаа зэргээр нь ангилах боломжтой. Мэдэгдэл авч шинэ ажлуудыг ямар ч газраас харах.",
		icon: Search,
		color: "bg-cyan-50 border-cyan-200",
		iconColor: "text-cyan-600",
	},
	{
		step: "03",
		title: "Санал илгээх",
		description:
			"Сонирхсон ажилдаа үнийн санал (үнэ + хугацаа + тайлбар) илгээ. Илгээсэн мөчөөс таны санал сонгон шалгаруулалтад орж, ажил олгогч тантай чатлаж тодруулга авах боломжтой.",
		icon: MessageSquare,
		color: "bg-pink-50 border-pink-200",
		iconColor: "text-pink-600",
	},
	{
		step: "04",
		title: "Ажил гүйцэтгэх",
		description:
			"Шилдсэн эсвэл сонгогдсон даруйд чат дээр нөхцөл, цаг, материал зэргээ тохироод ажлаа эхлүүл. Цаг баримтлаж, чанартай ажиллаж, асуудал үүсвэл шуурхай шийдвэрлэ.",
		icon: Target,
		color: "bg-emerald-50 border-emerald-200",
		iconColor: "text-emerald-600",
	},
	{
		step: "05",
		title: "Төлбөр авч, үнэлгээ цуглуулах",
		description:
			"Ажил амжилттай дууссаны дараа төлбөрөө тогтоосон хугацаанд авна. Сайн үнэлгээ, сэтгэгдэл авснаар таны нэр хүнд өсч, дараагийн ажлуудыг амархан олох болно.",
		icon: HandCoins,
		color: "bg-teal-50 border-teal-200",
		iconColor: "text-teal-600",
	},
];

export function HowItWorksTabSelector() {
	const [activeTab, setActiveTab] = useState<TabType>("client");

	return (
		<>
			{/* Tab Selector */}
			<section className="border-border border-b bg-secondary/10 px-6 py-16">
				<div className="mx-auto max-w-[1400px]">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-display text-5xl md:text-6xl">
							Та <span className="text-primary italic">хэн</span> бэ?
						</h2>
						<p className="mx-auto max-w-2xl font-body text-muted-foreground text-xl">
							Ажил хайж байна уу эсвэл ажил олгох уу? Та өөрт тохирсон үйл явцыг
							сонго.
						</p>
					</div>

					<div className="mx-auto flex w-full max-w-2xl overflow-hidden rounded-none border-2 border-border bg-background">
						<button
							type="button"
							onClick={() => setActiveTab("client")}
							className={`flex-1 border-border border-r px-8 py-6 font-display text-2xl uppercase tracking-tight transition-all ${
								activeTab === "client"
									? "bg-primary text-primary-foreground"
									: "bg-background text-muted-foreground hover:bg-secondary/20"
							}`}
						>
							Үйлчлүүлэгч
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("worker")}
							className={`flex-1 px-8 py-6 font-display text-2xl uppercase tracking-tight transition-all ${
								activeTab === "worker"
									? "bg-primary text-primary-foreground"
									: "bg-background text-muted-foreground hover:bg-secondary/20"
							}`}
						>
							Гүйцэтгэгч
						</button>
					</div>
				</div>
			</section>

			{/* Steps Section */}
			<section className="bg-background px-6 py-24">
				<div className="mx-auto max-w-[1200px]">
					<div className="mb-16 text-center">
						<Badge className="mb-6 rounded-none bg-secondary px-4 py-2 text-secondary-foreground">
							{activeTab === "client" ? "Үйлчлүүлэгчийн" : "Гүйцэтгэгчийн"}{" "}
							гарын авлага
						</Badge>
						<h2 className="mb-6 font-display text-5xl leading-tight md:text-7xl">
							{activeTab === "client" ? (
								<>
									Ажлаа <span className="text-primary italic">хийлгэх</span> нь
								</>
							) : (
								<>
									Ажил <span className="text-primary italic">олох</span> нь
								</>
							)}
						</h2>
						<p className="mx-auto max-w-2xl font-body text-muted-foreground text-xl">
							{activeTab === "client"
								? "Таван энгийн алхмаар ажлаа амжилттай дуусгая."
								: "Таван алхмаар орлого олж эхэл."}
						</p>
					</div>

					<div className="relative space-y-8">
						{/* Connecting Line */}
						<div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 md:left-1/2" />

						{(activeTab === "client" ? clientSteps : workerSteps).map(
							(step, idx) => (
								<Fragment key={step.step}>
									<div
										className={`group relative flex items-start gap-6 ${
											idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
										}`}
									>
										{/* Step Number Circle */}
										<div className="md:-translate-x-1/2 relative z-10 flex-shrink-0 md:absolute md:left-1/2">
											<div className="flex h-16 w-16 items-center justify-center rounded-none border-4 border-background bg-primary font-display text-2xl text-primary-foreground shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
												{step.step}
											</div>
										</div>

										{/* Content Card */}
										<Card
											className={`flex-1 overflow-hidden border-2 border-border bg-background shadow-none transition-all duration-300 hover:border-primary/50 hover:shadow-lg ${
												idx % 2 === 0
													? "md:mr-auto md:w-[calc(50%-4rem)]"
													: "md:ml-auto md:w-[calc(50%-4rem)]"
											}`}
										>
											<CardContent className="p-8">
												<div
													className={`mb-6 inline-flex rounded-none border-2 ${step.color} p-4 transition-transform duration-300 group-hover:scale-110`}
												>
													<step.icon className={`h-8 w-8 ${step.iconColor}`} />
												</div>
												<h3 className="mb-4 font-display text-3xl">
													{step.title}
												</h3>
												<p className="font-body text-lg text-muted-foreground leading-relaxed">
													{step.description}
												</p>
											</CardContent>
										</Card>
									</div>

									{idx === 2 ? (
										<div className="group relative flex items-start gap-6">
											{/* Center Node */}
											<div className="md:-translate-x-1/2 md:-translate-y-1/2 relative z-10 flex-shrink-0 md:absolute md:top-0 md:left-1/2">
												<div className="flex h-16 w-16 items-center justify-center rounded-none border-4 border-background bg-primary font-display text-2xl text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
													<MessageSquare className="h-8 w-8" />
												</div>
											</div>

											<Card className="overflow-hidden border-2 border-border bg-background shadow-none transition-all duration-300 hover:border-primary/50 hover:shadow-lg md:mx-auto md:w-[calc(100%-4rem)]">
												<CardContent className="p-8">
													<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
														<Badge className="rounded-none bg-primary px-4 py-2 text-primary-foreground">
															Үнийн санал + Сонгон шалгаруулалт
														</Badge>
														<Badge
															variant="outline"
															className="rounded-none border-primary/30 bg-primary/5 px-4 py-2 text-primary"
														>
															Шууд чат
														</Badge>
													</div>

													<h3 className="mb-3 font-display text-3xl">
														Энэ мөчөөс{" "}
														<span className="text-primary italic">
															харилцаа
														</span>{" "}
														эхэлнэ
													</h3>
													<p className="mb-8 max-w-3xl font-body text-lg text-muted-foreground leading-relaxed">
														{activeTab === "worker"
															? "Та үнийн саналаа илгээснээр сонгон шалгаруулалтад орж, ажил олгогчтой чат нээж нөхцөлөө баталгаажуулна."
															: "Та орж ирсэн саналуудыг шилдэж аваад чатлаж тодруулга авч, хамгийн тохиромжтой гүйцэтгэгчээ сонгон баталгаажуулна."}
													</p>

													<div className="grid gap-6 lg:grid-cols-3">
														<div
															className={`rounded-none border-2 p-6 ${
																activeTab === "worker"
																	? "border-primary/40 bg-primary/5"
																	: "border-border bg-secondary/5"
															}`}
														>
															<div className="mb-4 flex items-center gap-3">
																<div className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-border bg-background">
																	<CircleDollarSign className="h-6 w-6 text-primary" />
																</div>
																<div>
																	<p className="font-display text-xl">
																		Гүйцэтгэгч
																	</p>
																	<p className="font-body text-muted-foreground text-sm">
																		Үнийн санал илгээнэ
																	</p>
																</div>
															</div>

															<div className="space-y-3">
																<div className="rounded-none border border-border bg-background p-4">
																	<p className="font-display text-muted-foreground text-sm uppercase tracking-tight">
																		Үнийн санал
																	</p>
																	<div className="mt-2 flex flex-wrap items-center gap-2">
																		<Badge className="rounded-none bg-primary text-primary-foreground">
																			180,000₮
																		</Badge>
																		<Badge
																			variant="secondary"
																			className="rounded-none"
																		>
																			2 өдөр
																		</Badge>
																		<Badge
																			variant="outline"
																			className="rounded-none"
																		>
																			Тайлбартай
																		</Badge>
																	</div>
																</div>
																<p className="font-body text-muted-foreground leading-relaxed">
																	Санал илгээснээр{" "}
																	<span className="text-foreground">
																		сонгон шалгаруулалтад
																	</span>{" "}
																	орж, чат дээр асуултад хариулж өөрийгөө
																	ялгаруулна.
																</p>
															</div>
														</div>

														<div className="rounded-none border-2 border-border bg-background p-6">
															<div className="mb-4 flex items-center justify-between gap-3">
																<div className="flex items-center gap-3">
																	<div className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-border bg-secondary/10">
																		<MessageSquare className="h-6 w-6 text-primary" />
																	</div>
																	<div>
																		<p className="font-display text-xl">Чат</p>
																		<p className="font-body text-muted-foreground text-sm">
																			Тодруулга + тохиролцоо
																		</p>
																	</div>
																</div>
																<div className="flex flex-wrap items-center gap-2">
																	<Badge
																		variant="outline"
																		className="rounded-none border-primary/30 bg-primary/5 text-primary"
																	>
																		Хуваариласан
																	</Badge>
																	<Badge
																		variant="secondary"
																		className="rounded-none"
																	>
																		Сонгосон
																	</Badge>
																</div>
															</div>

															<div className="space-y-3">
																<div className="max-w-[85%] rounded-none border border-border bg-secondary/10 p-4">
																	<p className="font-body text-muted-foreground text-sm">
																		Ажил олгогч
																	</p>
																	<p className="font-body leading-relaxed">
																		2 өдөрт амжуулах уу? Материал ороод ирсэн.
																	</p>
																</div>
																<div className="ml-auto max-w-[85%] rounded-none border border-primary/20 bg-primary/10 p-4">
																	<p className="font-body text-muted-foreground text-sm">
																		Гүйцэтгэгч
																	</p>
																	<p className="font-body leading-relaxed">
																		Тийм. Маргааш эхлээд 2 өдөрт дуусгана. Үнэ
																		180,000₮.
																	</p>
																</div>
																<div className="max-w-[85%] rounded-none border border-border bg-secondary/10 p-4">
																	<p className="font-body text-muted-foreground text-sm">
																		Ажил олгогч
																	</p>
																	<p className="font-body leading-relaxed">
																		Тохирлоо. Таныг шилдье.
																	</p>
																</div>
															</div>
														</div>

														<div
															className={`rounded-none border-2 p-6 ${
																activeTab === "client"
																	? "border-primary/40 bg-primary/5"
																	: "border-border bg-secondary/5"
															}`}
														>
															<div className="mb-4 flex items-center gap-3">
																<div className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-border bg-background">
																	<UserCheck className="h-6 w-6 text-primary" />
																</div>
																<div>
																	<p className="font-display text-xl">
																		Ажил олгогч
																	</p>
																	<p className="font-body text-muted-foreground text-sm">
																		Шилдэж сонгоно
																	</p>
																</div>
															</div>

															<div className="space-y-3">
																<div className="rounded-none border border-border bg-background p-4">
																	<p className="font-display text-muted-foreground text-sm uppercase tracking-tight">
																		Шалгаруулалт
																	</p>
																	<div className="mt-2 flex flex-wrap items-center gap-2">
																		<Badge
																			variant="outline"
																			className="rounded-none border-border"
																		>
																			Харьцуулна
																		</Badge>
																		<Badge
																			variant="outline"
																			className="rounded-none border-primary/30 bg-primary/5 text-primary"
																		>
																			Хуваарьлана
																		</Badge>
																		<Badge
																			variant="secondary"
																			className="rounded-none"
																		>
																			Сонгоно
																		</Badge>
																	</div>
																</div>
																<p className="font-body text-muted-foreground leading-relaxed">
																	Саналуудыг шалгаад{" "}
																	<span className="text-foreground">
																		чатлаж
																	</span>{" "}
																	тодруулга авч, хамгийн тохиромжтойг сонгон
																	авна.
																</p>
															</div>
														</div>
													</div>
												</CardContent>
											</Card>
										</div>
									) : null}
								</Fragment>
							),
						)}
					</div>

					{/* Flow Complete */}
					<div className="mt-16 flex flex-col items-center gap-6 rounded-none border-2 border-primary/30 border-dashed bg-primary/5 p-12 text-center">
						<CheckCircle2 className="h-16 w-16 animate-pulse text-primary" />
						<div>
							<h3 className="mb-3 font-display text-3xl">
								{activeTab === "client"
									? "Ажил амжилттай дууслаа!"
									: "Та амжилттай ажиллаж байна!"}
							</h3>
							<p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
								{activeTab === "client"
									? "Одоо та өөрийн дараагийн ажлаа нийтлэхэд бэлэн боллоо. Ажил бүр бүр хялбар болно."
									: "Одоо та илүү олон ажил хийж, сайн үнэлгээгээ өсгөж, орлогоо нэмэгдүүлэх боломжтой."}
							</p>
						</div>
						<Button
							size="lg"
							className="h-14 rounded-none bg-primary px-10 text-lg text-primary-foreground hover:bg-primary/90"
							asChild
						>
							<Link href="/signup">
								{activeTab === "client" ? "Ажил нийтлэх" : "Ажил хайх эхлэх"}
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
