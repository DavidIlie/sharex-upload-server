import { useTheme } from "next-themes";
import { useSound } from "use-sound";

export default function ToggleColorMode() {
    const { resolvedTheme, setTheme } = useTheme();

    const [play] = useSound("/lightswitch.mp3", {
        volume: 0.05,
        sprite: {
            on: [0, 300],
            off: [500, 300],
        },
    });

    const updateTheme = () => {
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
        resolvedTheme === "dark" ? play({ id: "on" }) : play({ id: "off" });
    };

    return updateTheme;
}
