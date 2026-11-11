import path from "node:path";
import { env } from "./env";

export const IMG_DIR = path.resolve('imgs')
export const BASE_URL = `http://localhost:${env.PORT}`