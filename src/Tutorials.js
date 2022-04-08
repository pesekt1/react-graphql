import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "http://localhost:5551/apis/graphql/";
const TUTORIALS_QUERY = gql`
  {
    findAllTutorials {
      title
      description
      id
    }
  }
`;

export default function Tutorials() {
  const { data, isLoading, error } = useQuery("tutorials", () => {
    return request(endpoint, TUTORIALS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  console.log(data);
  return (
    <div>
      <h2>Tutorials</h2>
      <ul>
        {data.findAllTutorials.map((tutorial) => (
          <li key={tutorial.id}>
            {tutorial.title} {tutorial.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
