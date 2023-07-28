import { fetchAPI } from "../api"

export async function LOGIN(password: string, username: string, clientMutationId: string){
  const data = await fetchAPI(`
  mutation myMutation($password: String = "${password}", $username: String = "${username}", $clientMutationId: String = "${clientMutationId}"){
  login(input: {password: $password, username: $username, clientMutationId: $clientMutationId}) {
    authToken
    user {
      email
      lastName
      firstName
    }
  }
}
  `,
  )
  return data
}