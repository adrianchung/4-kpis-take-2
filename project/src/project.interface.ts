import { Release } from './release.interface';
export interface Project {
  key: string;
  releases: Release[];
}
