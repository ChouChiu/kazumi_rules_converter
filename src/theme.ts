"use client";

import {
	argbFromHex,
	hexFromArgb,
	type TonalPalette,
	themeFromSourceColor,
} from "@material/material-color-utilities";
import { createTheme } from "@mui/material/styles";

const seed = argbFromHex("#4CAF50");
const md3 = themeFromSourceColor(seed);

function tone(palette: TonalPalette, n: number): string {
	return hexFromArgb(palette.tone(n));
}

const p = md3.palettes.primary;
const s = md3.palettes.secondary;
const t = md3.palettes.tertiary;
const e = md3.palettes.error;
const n = md3.palettes.neutral;
const nv = md3.palettes.neutralVariant;

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: tone(p, 80),
			light: tone(p, 90),
			dark: tone(p, 40),
			contrastText: tone(p, 20),
		},
		secondary: {
			main: tone(s, 80),
			light: tone(s, 90),
			dark: tone(s, 40),
			contrastText: tone(s, 20),
		},
		error: {
			main: tone(e, 80),
			light: tone(e, 90),
			dark: tone(e, 40),
			contrastText: tone(e, 20),
		},
		background: {
			default: tone(n, 6),
			paper: tone(n, 12),
		},
		text: {
			primary: tone(n, 90),
			secondary: tone(nv, 80),
			disabled: tone(nv, 60),
		},
		divider: tone(nv, 40),
	},
	shape: {
		borderRadius: 12,
	},
	typography: {
		fontFamily: "var(--font-roboto), Roboto, sans-serif",
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: tone(n, 6),
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					fontWeight: 500,
					borderRadius: 12,
				},
			},
		},
		MuiToggleButtonGroup: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 6,
					fontSize: "0.8125rem",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: 12,
					},
				},
			},
		},
	},
});

declare module "@mui/material/styles" {
	interface Palette {
		tertiary: Palette["primary"];
		surfaceContainer: string;
		surfaceContainerHigh: string;
		surfaceContainerHighest: string;
		surfaceContainerLow: string;
		surfaceContainerLowest: string;
		onSurface: string;
		outline: string;
		outlineVariant: string;
	}

	interface PaletteOptions {
		tertiary?: PaletteOptions["primary"];
		surfaceContainer?: string;
		surfaceContainerHigh?: string;
		surfaceContainerHighest?: string;
		surfaceContainerLow?: string;
		surfaceContainerLowest?: string;
		onSurface?: string;
		outline?: string;
		outlineVariant?: string;
	}
}

export const md3Colors = {
	primary: tone(p, 80),
	onPrimary: tone(p, 20),
	primaryContainer: tone(p, 30),
	onPrimaryContainer: tone(p, 90),
	secondary: tone(s, 80),
	onSecondary: tone(s, 20),
	secondaryContainer: tone(s, 30),
	onSecondaryContainer: tone(s, 90),
	tertiary: tone(t, 80),
	onTertiary: tone(t, 20),
	tertiaryContainer: tone(t, 30),
	onTertiaryContainer: tone(t, 90),
	error: tone(e, 80),
	onError: tone(e, 20),
	errorContainer: tone(e, 30),
	onErrorContainer: tone(e, 90),
	background: tone(n, 6),
	onBackground: tone(n, 90),
	surface: tone(n, 6),
	onSurface: tone(n, 90),
	surfaceVariant: tone(nv, 30),
	onSurfaceVariant: tone(nv, 80),
	outline: tone(nv, 60),
	outlineVariant: tone(nv, 30),
	surfaceContainerLowest: tone(n, 4),
	surfaceContainerLow: tone(n, 10),
	surfaceContainer: tone(n, 12),
	surfaceContainerHigh: tone(n, 17),
	surfaceContainerHighest: tone(n, 22),
};

export default theme;
