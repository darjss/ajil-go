import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { type SignUpFormData, signUpSchema } from "@/lib/schemas";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignUpForm({
	onSwitchToSignIn,
}: {
	onSwitchToSignIn: () => void;
}) {
	const router = useRouter();
	const { isPending } = authClient.useSession();

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	const onSubmit = async (data: SignUpFormData) => {
		await authClient.signUp.email(
			{
				email: data.email,
				password: data.password,
				name: data.name,
			},
			{
				onSuccess: () => {
					router.push("/dashboard");
					toast.success("Sign up successful");
				},
				onError: (error) => {
					toast.error(error.error.message || error.error.statusText);
				},
			},
		);
	};

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="mx-auto mt-10 w-full max-w-md p-6">
			<h1 className="mb-6 text-center font-bold text-3xl">Create Account</h1>

			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Label htmlFor="name">Name</Label>
					<Input id="name" {...form.register("name")} />
					{form.formState.errors.name && (
						<p className="text-red-500">{form.formState.errors.name.message}</p>
					)}
				</div>

				<div>
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" {...form.register("email")} />
					{form.formState.errors.email && (
						<p className="text-red-500">
							{form.formState.errors.email.message}
						</p>
					)}
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" {...form.register("password")} />
					{form.formState.errors.password && (
						<p className="text-red-500">
							{form.formState.errors.password.message}
						</p>
					)}
				</div>

				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? "Submitting..." : "Sign Up"}
				</Button>
			</form>

			<div className="mt-6">
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				<div className="mt-4">
					<Button
						type="button"
						variant="outline"
						className="w-full"
						onClick={() => {
							authClient.signIn.social({
								provider: "google",
								callbackURL: `${window.location.origin}/dashboard`,
							});
						}}
					>
						Sign up with Google
					</Button>
				</div>
			</div>

			<div className="mt-4 text-center">
				<Button
					variant="link"
					onClick={onSwitchToSignIn}
					className="text-indigo-600 hover:text-indigo-800"
				>
					Already have an account? Sign In
				</Button>
			</div>
		</div>
	);
}
