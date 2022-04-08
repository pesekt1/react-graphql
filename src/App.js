import React from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = process.env.REACT_APP_API_URL;
const AUTHORS_QUERY = gql`
  {
    findAllAuthors {
      name
      age
      id
    }
  }
`;

export default function App() {
  const { data, isLoading, error } = useQuery("authors", () => {
    return request(endpoint, AUTHORS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  console.log(data);
  return (
    <div>
      <h1>React graphql demo</h1>
      <ul>
        {data.findAllAuthors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
}
