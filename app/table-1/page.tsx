import UsersTable from "@/components/table/UserTable";

export default async function TableOneHome() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
  });

  const users = await response.json();

  users.forEach((user: any) => {
    delete user.company;
    delete user.address;
  });
  console.log("users from API: ", users);
  return (
    <>
      <h1>Drag and Drop Table-1</h1>
      <UsersTable users={users} />
    </>
  );
}
