import { useUserStore } from "@global-stores/useUserStore";

export default function useSettings() {
    const user = useUserStore((s) => s.user);

    return user;
}
