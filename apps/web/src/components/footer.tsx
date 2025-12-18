function Footer() {
	return (
		<footer className="mt-20 bg-slate-900 py-12 text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2 font-bold">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
								<span className="font-bold text-slate-900 text-xs">J</span>
							</div>
							<span>Ажил-GO</span>
						</div>
						<p className="text-gray-400 text-sm">
							Стартап сонирхдог ажил хайгчдад зориулсан гайхалтай платформ.
							Мөрөөдлийн ажлаа илүү амархан ол.
						</p>
					</div>

					{/* About */}
					<div className="flex flex-col gap-3">
						<h3 className="font-semibold text-sm">Тухай</h3>
						<ul className="space-y-2 text-gray-400 text-sm">
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Компаниуд
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Үнийн санал
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Үйлчилгээний нөхцөл
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Зөвлөгөө
								</a>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div className="flex flex-col gap-3">
						<h3 className="font-semibold text-sm">Нөөц</h3>
						<ul className="space-y-2 text-gray-400 text-sm">
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Тусламжийн баримт
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Хөтөч
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Шинэчлэлүүд
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Холбоо барих
								</a>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div className="flex flex-col gap-3">
						<h3 className="font-semibold text-sm">Ажлын мэдэгдэл авах</h3>
						<p className="text-gray-400 text-xs">
							Хамгийн сүүлийн ажлын мэдээ, нийтлэлүүдийг долоо хоног тутам
							хүлээн авна.
						</p>
						<div className="flex gap-2">
							<input
								type="email"
								placeholder="Имэйл хаяг"
								className="flex-1 rounded bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500"
							/>
							<button className="rounded bg-primary px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-primary/90">
								Захиалах
							</button>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className="flex flex-col items-center justify-between gap-4 border-slate-800 border-t pt-8 text-gray-400 text-xs sm:flex-row">
					<p>2021 © Ажил-GO. Бүх эрх хуулиар хамгаалагдсан.</p>
					<div className="flex gap-4">
						<a href="#" className="transition-colors hover:text-white">
							Нууцлалын бодлого
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
