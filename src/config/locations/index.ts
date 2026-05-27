import { LocationConfig } from "../types";
import defaultConfig from "./default";

const locationConfigs: Record<string, LocationConfig> = {
  default: defaultConfig,
};

export function getLocationConfig(slug: string): LocationConfig | undefined {
  return locationConfigs[slug];
}

export const defaultLocation = defaultConfig;
