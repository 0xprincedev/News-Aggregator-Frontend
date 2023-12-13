export {};

declare global {
	export interface LayoutProps {
		children: React.ReactNode;
	}

	export interface TemplateProps {
		children: React.ReactNode;
	}

	export interface IconProps {
		className?: string;
		onClick?: () => void;
	}
}
