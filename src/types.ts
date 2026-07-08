/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

export interface ServiceRequest {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt?: string;
}
