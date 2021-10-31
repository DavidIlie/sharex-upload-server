import { useEnvStore } from "@global-stores/useEnvStore";

export default function useEnv() {
    const env = useEnvStore((s) => s.env);

    return env;
}
