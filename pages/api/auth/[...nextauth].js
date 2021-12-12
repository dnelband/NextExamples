import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

let userAccount = {};

export default NextAuth({    
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied  
        if (credentials.username === "david" && credentials.password === "test") {
          const user = {
            id:2,
            username:'david',
            password:'test'
          }
          // Any object returned will be saved in `user` property of the JWT
          userAccount = user
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      }
    })
  ],
  session:{
    jwt:true
  },
  callbacks: {
    jwt: ({token,user}) => {
            // first time jwt callback is run, user object will be available
      if (user) {
        token.id = user.id
      }

      return token;
    },
    session: ({session,token}) => {
      if (token){
        session.id = token.id;
        session.user = userAccount
      }
      return session;
    },
  },
  secret:"test",
  jwt:{
    secret:"test",
    encryption:true
  }
})