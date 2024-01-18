type Topic = { topicName: string; link: string };
type Topics = Topic[];

type Users = User[];

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

type headerColumns = headerColumn[];

type headerColumn = {
  header: string;
  rowSpan: number;
  colSpan: number;
  subHeader?: string[];
};
