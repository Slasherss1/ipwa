import { News } from "src/app/types/news.model";

export interface NewsFormatted extends News {
  formatted: string
}
