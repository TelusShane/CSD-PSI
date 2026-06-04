/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Topic {
  id: string;
  topic: string;
  submitter: string;
  description?: string;
  category: "Weather" | "Equipment" | "Procedures" | "Environmental" | "Other";
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Upcoming" | "In Progress" | "Reviewed";
  date: string;
  reviewDate?: string;
}

export interface AgendaItem {
  id: string;
  item: string;
  submitter: string;
  notes: string;
  duration?: string;
}

export interface MeetingMinutes {
  id: string;
  date: string;
  title: string;
  attendees: number;
  summary: string;
  link?: string;
  topicsReviewed: string[];
}
