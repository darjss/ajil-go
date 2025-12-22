import { Facebook, Instagram, Mail, Send, Twitter } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
	tasks: {
		title: "Даалгавар",
		links: [
			{ label: "Бүх даалгавар", href: "/tasks" },
			{ label: "Ангилалууд", href: "/categories" },
			{ label: "Шинээр нэмэгдсэн", href: "/tasks?sort=newest" },
		],
	},
	workers: {
		title: "Гүйцэтгэгчид",
		links: [
			{ label: "Хэрхэн эхлэх", href: "/how-it-works" },
			{ label: "Орлого олох", href: "/earn" },
			{ label: "Гүйцэтгэгч болох", href: "/become-worker" },
		],
	},
	clients: {
		title: "Захиалагчид",
		links: [
			{ label: "Даалгавар нийтлэх", href: "/post-task" },
			{ label: "Үнэ тариф", href: "/pricing" },
			{ label: "Баталгаа", href: "/guarantee" },
		],
	},
	about: {
		title: "Тухай",
		links: [
			{ label: "Бидний тухай", href: "/about" },
			{ label: "Холбоо барих", href: "/contact" },
			{ label: "Түгээмэл асуулт", href: "/faq" },
		],
	},
};

const socialLinks = [
	{ icon: Facebook, href: "https://facebook.com", label: "Facebook" },
	{ icon: Instagram, href: "https://instagram.com", label: "Instagram" },
	{ icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

function Footer() {
	return (
		<footer className="relative mt-20 border-t border-border bg-muted">
			<div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
					<div className="lg:col-span-4">
						<Link href="/" className="inline-flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
								<span className="font-bold text-lg text-primary-foreground">
									J
								</span>
							</div>
							<div className="flex flex-col leading-tight">
								<span className="font-bold text-foreground text-xl tracking-tight">
									Ажил-GO
								</span>
							</div>
						</Link>
						<p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
							Таны даалгаврыг гүйцэтгэх хүн энд байна
						</p>

						<div className="mt-6 flex items-center gap-3">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
									aria-label={social.label}
								>
									<social.icon className="h-4 w-4" />
								</a>
							))}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5">
						{Object.values(footerLinks).map((section) => (
							<div key={section.title}>
								<h3 className="font-semibold text-foreground text-sm tracking-wide">
									{section.title}
								</h3>
								<ul className="mt-4 space-y-3">
									{section.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="text-muted-foreground text-sm transition-colors duration-200 hover:text-primary"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="lg:col-span-3">
						<div className="rounded-2xl border border-border bg-card p-6">
							<div className="flex items-center gap-2 text-primary">
								<Mail className="h-5 w-5" />
								<h3 className="font-semibold text-foreground">Мэдээлэл авах</h3>
							</div>
							<p className="mt-2 text-muted-foreground text-sm">
								Шинэ даалгавар, мэдээ мэдээллийг хамгийн түрүүнд хүлээн аваарай.
							</p>
							<form className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col">
								<Input
									type="email"
									placeholder="Имэйл хаяг"
									className="h-11 border-border bg-background text-sm placeholder:text-muted-foreground"
								/>
								<Button
									type="submit"
									className="h-11 gap-2 bg-primary transition-colors duration-200 hover:bg-primary/90"
								>
									<Send className="h-4 w-4" />
									<span>Бүртгүүлэх</span>
								</Button>
							</form>
						</div>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
					<p className="text-muted-foreground text-sm">
						2024 © Ажил-GO. Бүх эрх хуулиар хамгаалагдсан.
					</p>
					<div className="flex flex-wrap items-center justify-center gap-6">
						<Link
							href="/privacy"
							className="text-muted-foreground text-sm transition-colors duration-200 hover:text-primary"
						>
							Нууцлалын бодлого
						</Link>
						<Link
							href="/terms"
							className="text-muted-foreground text-sm transition-colors duration-200 hover:text-primary"
						>
							Үйлчилгээний нөхцөл
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
