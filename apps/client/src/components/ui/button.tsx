import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	icon?: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
	primary:
		"bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200 disabled:bg-indigo-300",
	outline:
		"border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-100 disabled:text-gray-400",
	danger:
		"border border-red-200 bg-white text-red-600 hover:bg-red-50 focus:ring-red-100 disabled:text-red-300",
	ghost:
		"bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-100 disabled:text-gray-300",
};

export const Button = ({
	children,
	className = "",
	variant = "primary",
	icon,
	type = "button",
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			type={type}
			className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-4 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
		>
			{icon}
			{children}
		</button>
	);
};
