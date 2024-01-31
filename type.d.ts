import { SubresourceIntegrityPlugin } from "next/dist/build/webpack/plugins/subresource-integrity-plugin";

type StudyTopic = { topicName: string; link: string };
type StudyTopics = StudyTopic[];

type Users = User[];

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

type HeaderColumns = string[];
