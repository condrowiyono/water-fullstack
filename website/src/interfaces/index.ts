export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  is_verified: null | boolean;
  user_type: "admin" | "user" | "operator";
  river_id?: null | number;
  river?: River;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export type River = {
  id: number;
  name: string;
  type: string;
  river_region: string;
  watershed: string;
  tributary: string;
  main_river: string;
  registry_number: string;
  latitude: number;
  longitude: number;
  village: string;
  district: string;
  city: string;
  observation: string;
  file: string;
  green_light: number;
  yellow_light: number;
  red_light: number;
  elevation: number;
  construction_year: number;
  operator: string;
  maker: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export type RainfallData = {
  id: number;
  river_id: number;
  river: null | string;
  date: string | Date;
  data: number;
  observation: string;
  duration: number;
  description: string;
  event: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export type WaterLevelData = {
  id: number;
  river_id: number;
  river: null | string;
  date: string | Date;
  data: number;
  observation: string;
  description: string;
  event: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export type ClimateData = {
  id: number;
  river_id: number;
  river: null | string;
  rainfall: number;
  date: string | Date;
  min_temperature: number;
  max_temperature: number;
  humidity: number;
  wet_humidity: number;
  dry_humidity: number;
  wind_speed: number;
  illumination_duration: number;
  evaporation: number;
  min_float_level: number;
  max_float_level: number;
  upper_hook: number;
  lower_hook: number;
  observation: string;
  illumination_process: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export type CountType = {
  total?: number;
  manual?: number;
  telemetry?: number;
};

export type RiverCountType = {
  pch?: CountType;
  tma?: CountType;
  iklim?: CountType;
};

export type Pagination = {
  limit: number;
  page: number;
};

export type TimeChartDate = {
  // { "2021-01-01T00:00:00.000Z": 1 }
  [key: string]: number;
};
