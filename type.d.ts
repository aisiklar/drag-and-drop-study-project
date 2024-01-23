import { SubresourceIntegrityPlugin } from "next/dist/build/webpack/plugins/subresource-integrity-plugin";

type Topic = { topicName: string; link: string };
type Topics = Topic[];

type Users = User[];

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

type HeaderColumns = string[] 


