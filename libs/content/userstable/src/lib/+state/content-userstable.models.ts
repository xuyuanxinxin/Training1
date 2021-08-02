import { Gender } from '@training-app/backend';

/**
 * Interface for the 'ContentUserstable' data
 */
export interface ContentUserstableEntity {
  Number: number;
  Name: string;
  Gender: Gender;
  Address: string;
}
