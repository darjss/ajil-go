"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ApplicationModalProps {
	isOpen: boolean;
	jobTitle: string;
	companyName: string;
	onClose: () => void;
}

export function ApplicationModal({
	isOpen,
	jobTitle,
	companyName,
	onClose,
}: ApplicationModalProps) {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		jobTitle: "",
		linkedInUrl: "",
		portfolioUrl: "",
		additionalInfo: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Application submitted:", formData);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card">
				{/* Header */}
				<div className="sticky top-0 flex items-start justify-between border-border border-b bg-card p-6">
					<div>
						<h2 className="font-bold text-2xl text-foreground">{jobTitle}</h2>
						<p className="text-muted-foreground text-sm">{companyName}</p>
					</div>
					<button
						onClick={onClose}
						className="text-2xl text-muted-foreground hover:text-foreground"
					>
						×
					</button>
				</div>

				{/* Content */}
				<form onSubmit={handleSubmit} className="space-y-6 p-6">
					<div>
						<h3 className="mb-4 font-semibold text-foreground">
							Өргөдлөө илгээх
						</h3>
						<p className="mb-6 text-muted-foreground text-sm">
							Дараах мэдээллийг заавал бөглөж, зөвхөн {companyName}-д илгээнэ.
						</p>
					</div>

					{/* Form Fields */}
					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<label className="mb-2 block font-medium text-foreground text-sm">
								Бүтэн нэр
							</label>
							<input
								type="text"
								name="fullName"
								placeholder="Нэрээ оруулна уу"
								value={formData.fullName}
								onChange={handleChange}
								className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>

						<div>
							<label className="mb-2 block font-medium text-foreground text-sm">
								Имэйл хаяг
							</label>
							<input
								type="email"
								name="email"
								placeholder="Имэйлээ оруулна уу"
								value={formData.email}
								onChange={handleChange}
								className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
					</div>

					<div>
						<label className="mb-2 block font-medium text-foreground text-sm">
							Утасны дугаар
						</label>
						<input
							type="tel"
							name="phone"
							placeholder="Утасны дугаараа оруулна уу"
							value={formData.phone}
							onChange={handleChange}
							className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					<div>
						<label className="mb-2 block font-medium text-foreground text-sm">
							Одоогийн эсвэл өмнөх албан тушаал
						</label>
						<input
							type="text"
							name="jobTitle"
							placeholder="Одоогийн/өмнөх албан тушаал"
							value={formData.jobTitle}
							onChange={handleChange}
							className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					<div className="border-border border-t pt-6">
						<h4 className="mb-4 font-semibold text-foreground">ХОЛБООСУУД</h4>

						<div>
							<label className="mb-2 block font-medium text-foreground text-sm">
								LinkedIn холбоос
							</label>
							<input
								type="url"
								name="linkedInUrl"
								placeholder="LinkedIn профайлын холбоос"
								value={formData.linkedInUrl}
								onChange={handleChange}
								className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>

						<div className="mt-4">
							<label className="mb-2 block font-medium text-foreground text-sm">
								Портфолио холбоос
							</label>
							<input
								type="url"
								name="portfolioUrl"
								placeholder="Портфолио, вебсайт, Behance гэх мэт"
								value={formData.portfolioUrl}
								onChange={handleChange}
								className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
					</div>

					<div>
						<label className="mb-2 block font-medium text-foreground text-sm">
							Нэмэлт мэдээлэл
						</label>
						<textarea
							name="additionalInfo"
							placeholder="Хуулга, уриалга эсвэл нэмэлт мэдээллээ бичээрэй"
							value={formData.additionalInfo}
							onChange={handleChange}
							rows={4}
							className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						<p className="mt-2 text-muted-foreground text-xs">
							Дээд тал нь 500 тэмдэгт
						</p>
					</div>

					<div className="flex items-center gap-2">
						<input type="file" id="resume" hidden />
						<label
							htmlFor="resume"
							className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed px-4 py-3 text-foreground text-sm hover:bg-muted"
						>
							📎 CV/Resume хавсаргах
						</label>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90"
					>
						Өргөдөл илгээх
					</Button>

					<p className="text-center text-muted-foreground text-xs">
						Өргөдлөө илгээснээр{" "}
						<a href="#" className="text-primary hover:underline">
							үйлчилгээний нөхцөл
						</a>{" "}
						болон{" "}
						<a href="#" className="text-primary hover:underline">
							нууцлалын бодлого
						</a>
						-г зөвшөөрсөнд тооцно.
					</p>
				</form>
			</div>
		</div>
	);
}
