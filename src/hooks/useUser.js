import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

export const ME_QUERY = gql`
  query seeMe {
    seeMe {
      id
      username
      avatar
      viewCount
      followingCount
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.seeMe === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}
export default useUser;
