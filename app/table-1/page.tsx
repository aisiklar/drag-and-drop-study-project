import UsersTable from "@/components/table/UsersTable";

// fetch users from API and send to child comp as props
export default async function TableOneHome() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
  });

  const users = await response.json();

  // delete properties company and address to simplify the table
  // TODO might add these deleted properties in the future.
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
