import { useEnvStore } from "@global-stores/useEnvStore";

export default function useSettings() {
    const env = useEnvStore((s) => s.env);

    return env;
}
